import { decode } from "he";

import { createEmbeddedExerciseOutlet } from "lobster-vis/dist/js/view/embeddedExerciseOutlet"
import { COMPLETION_ALL_CHECKPOINTS, Exercise, Project } from "lobster-vis/dist/js/core/Project";
import { DEFAULT_EXERCISE, ExerciseSpecification, getExerciseSpecification } from "lobster-vis/dist/js/exercises";

import "lobster-vis/dist/js/lib/standard";
import "lobster-vis/dist/css/buttons.css"
import "lobster-vis/dist/css/main.css"
import "lobster-vis/dist/css/code.css"
import "lobster-vis/dist/css/exercises.css"
import "lobster-vis/dist/css/frontend.css"


import { SimpleExerciseLobsterOutlet } from "lobster-vis/dist/js/view/SimpleExerciseLobsterOutlet"
import { EndOfMainStateCheckpoint, OutputCheckpoint, StaticAnalysisCheckpoint } from "lobster-vis/dist/js/analysis/checkpoints";
import { Program, SourceFile } from "lobster-vis/dist/js/core/compilation/Program";
import { Predicates } from "lobster-vis/dist/js/analysis/predicates";
import { constructTest, containsConstruct, findConstructs, findFirstConstruct } from "lobster-vis/dist/js/analysis/analysis";
import { findLoopControlVars } from "lobster-vis/dist/js/analysis/loops";
import dedent from "ts-dedent";
import { ExpressionOutlet } from "lobster-vis/dist/js/view/constructs/ExpressionOutlets";
import { CompilerNote, NoteKind } from "lobster-vis/dist/js/core/compilation/errors";
import { isPointerType, isType, Int, isBoundedArrayOfType, isIntegralType } from "lobster-vis/dist/js/core/compilation/types";
import { FunctionDefinition } from "lobster-vis/dist/js/core/constructs/declarations/function/FunctionDefinition";
import { DirectInitializer } from "lobster-vis/dist/js/core/constructs/initializers/DirectInitializer";
import { Simulation } from "lobster-vis/dist/js/core/runtime/Simulation";
import { LocalVariableDefinition } from "lobster-vis/dist/js/core/constructs/declarations/variable/LocalVariableDefinition";
import { AnalyticExpression } from "lobster-vis/dist/js/core/constructs/expressions/expressions";





$(() => {

    $(".lobster-ex").each(function() {

        $(this).append(createEmbeddedExerciseOutlet("single"));

        let filename = "exercise.cpp";
        let exerciseSpec = <ExerciseSpecification>{
          starterCode: dedent`
            #include <iostream>
            using namespace std;
            
            // REQUIRES: len > 0
            // EFFECTS: Returns the maximum value in the array 'arr',
            //          whose length is given by 'len'.
            int maxValue(const int arr[], int len) { // compiler changes to int *arr
              
              // YOUR CODE HERE
              
            }
            
            int main() {
              int arr1[4] = {2, 3, 6, 1};
              int m1 = maxValue(arr1, 4);
              cout << "max value in arr1 = " << m1 << endl;
              assert(m1 == 6);

              int arr2[3] = {-4, -2, -8};
              int m2 = maxValue(arr2, 3);
              cout << "max value in arr2 = " << m2 << endl;
              assert(m2 == -2);
            }
          `,
          checkpoints: [
             new StaticAnalysisCheckpoint("Traversal by Pointer", (program: Program, project: Project) => {
                let maxValueFn = findFirstConstruct(program, Predicates.byFunctionName("maxValue"));
                if (!maxValueFn) {
                    return false;
                }

                let loop = findFirstConstruct(maxValueFn, Predicates.byKinds(["while_statement", "for_statement"]));
                if (!loop) {
                    return false;
                }

                let loopControlVars = findLoopControlVars(loop);
                return loopControlVars.some(v => v.isTyped(isPointerType));
            }),
            new EndOfMainStateCheckpoint("Passes Test Cases", (sim: Simulation) => {
              return !sim.hasAnyEventOccurred
            }, "", 5000)
          ],
          completionCriteria: COMPLETION_ALL_CHECKPOINTS,
          completionMessage: "Nice work! Exercise complete!",
        };

        let completionMessage = $(this).find(".lobster-ex-completion-message").html()?.trim() ?? $(this).find(".lobster-ex-complete-message").html()?.trim();
        if (completionMessage) {
          exerciseSpec.completionMessage = completionMessage;
        }
        let initCode = decode($(this).find(".lobster-ex-starter-code").html()?.trim() ?? $(this).find(".lobster-ex-init-code").html()?.trim() ?? "");
        if (initCode) {
          exerciseSpec.starterCode = initCode;
        }

        let extras = [(program: Program) => {

          let maxValueFn = findFirstConstruct(program, Predicates.byFunctionName("maxValue"));
          if (!maxValueFn) {
              return false;
          }

          let loop = findFirstConstruct(maxValueFn, Predicates.byKinds(["while_statement", "for_statement"]));
          let loopControlVars = loop && findLoopControlVars(loop);

          //  Identify traversal by index and give hint
          if (loopControlVars && loopControlVars.length > 0) {
            loopControlVars
              .map(v => v.firstDeclaration)
              .filter(Predicates.byTypedDeclaration(isIntegralType))
              .forEach(decl => decl
                .addNote(
                  new CompilerNote(
                    decl, NoteKind.STYLE, "lec4.maxValue.extra.1",
                    `It looks like you're using ${decl.type.englishString(false)} to control the loop, which is a case of traversal-by-index. Try using a pointer to control the loop instead.`
                  )
              ));

            // Identify cases like ptr < ptr + len
            let firstLoopControlVar = loopControlVars[0];
            let comps = findConstructs(maxValueFn, Predicates.byKind("pointer_comparison_expression"));
            let bad_comps = comps.filter(comp =>
              containsConstruct(comp.left, Predicates.byVariableIdentifier(firstLoopControlVar))
              && containsConstruct(comp.right, Predicates.byVariableIdentifier(firstLoopControlVar))
            );
            bad_comps.forEach(construct => construct
              .addNote(
                new CompilerNote(
                  construct, NoteKind.STYLE, "lec4.maxValue.extra.2",
                  `This comparison shouldn't use the pointer ${firstLoopControlVar.name} on both sides, otherwise it sort of ends up "chasing itself" through memory. Try comparing the pointer against an offset from the base of the array.`
                )
            ));

            // Identify errors like "int *ptr = 0;"" or "int *ptr = nullptr;"
            loopControlVars.forEach(loop_var => {
              let direct_init = loop_var.definition && findFirstConstruct(loop_var.definition, Predicates.byKind("AtomicDirectInitializer"));
              if (!direct_init) { return; }
              let arg = direct_init.arg?.analytic();
              if (!arg) { return; }

              let init_to_null = false;
              if (containsConstruct(direct_init, Predicates.byKind("nullptr_expression"))) {
                init_to_null = true;
              }
              else {
                let num_literal = findFirstConstruct(direct_init, Predicates.byKind("numeric_literal_expression"));
                if (num_literal?.value.rawEquals(0)) {
                  init_to_null = true;
                }
              }
              if (init_to_null) {
                direct_init.addNote(
                  new CompilerNote(
                    direct_init, NoteKind.STYLE, "lec4.maxValue.extra.3",
                    `This pointer is initialized to hold address 0, which makes it a null pointer. That means "not pointing at anything". Instead, you want it to start pointing at the beginning of the array.`
                  )
                );
              }
            })
          }

          // Identify uninitialized pointers directly in for loop
          if (loop?.construct_type === "for_statement") {
            let default_init = loop.initial && findFirstConstruct(loop.initial, Predicates.byKind("AtomicDefaultInitializer"));
            if (default_init) {
              default_init.addNote(
                new CompilerNote(
                  default_init, NoteKind.STYLE, "lec4.maxValue.extra.4",
                  `This pointer is uninitialized, which means it will start at some random memory address. Instead, you want it to start pointing at the beginning of the array.`
                )
              );
            }
          }
 
          // Identify something like "ptr + 1" where you really want "++ptr" or "ptr += 1"
          // To do that, find such an expression that is a full expression and thus not
          // e.g. a child of an assignment like ptr = ptr + 1;
          let offsets = findConstructs(maxValueFn, Predicates.byKind("pointer_offset_expression"));
          let bad_offsets = offsets.filter(off => off.isFullExpression());
          bad_offsets.forEach(construct => construct
            .addNote(
              new CompilerNote(
                construct, NoteKind.STYLE, "lec4.maxValue.extra.5",
                `This expression computes a new address, but it doesn't actually update the pointer variable.`
              )
          ));

        }];

        let project = new Project(
          "project",
          undefined,
          [{name: filename, code: exerciseSpec.starterCode, isTranslationUnit: true}],
          new Exercise(exerciseSpec),
          extras);
        project.turnOnAutoCompile(500);

        if (exerciseSpec.checkpoints.length === 0) {
          $(this).find(".lobster-embedded-height-control").addClass("lobster-ex-no-checkpoints");
        }

        let exOutlet = new SimpleExerciseLobsterOutlet($(this), project);

        window.addEventListener("message", (event) => {
          // ignore messages from anywhere other than parent
          if (event.source !== window.parent) {
            return;
          }
          
          // ignore spurious messages
          if (!event.data["examma_ray_message"]) {
            return;
          }
          let msg = event.data["examma_ray_message"];
          if (msg.message_kind === "set_submission") {
            exOutlet.project.setFileContents(<SourceFile> {
              name: "exercise.cpp",
              text: msg.submission,
            });
          }

        });

        setInterval(() => {
          try {
            window.parent?.postMessage({
              examma_ray_message: {
                message_kind: "update",
                submission: exOutlet.project.sourceFiles[0].text,
              }
            }, "*");
          }
          catch(e) {

          }
        }, 1000);
    });

    try {
      window.parent?.postMessage({
        examma_ray_message: {
          message_kind: "ready",
        }
      }, "*");
    }
    catch(e) {

    }

});