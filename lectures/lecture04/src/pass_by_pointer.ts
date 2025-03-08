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
import { OutputCheckpoint, StaticAnalysisCheckpoint } from "lobster-vis/dist/js/analysis/checkpoints";
import { Program, SourceFile } from "lobster-vis/dist/js/core/compilation/Program";
import { Predicates } from "lobster-vis/dist/js/analysis/predicates";
import { constructTest, findConstructs, findFirstConstruct } from "lobster-vis/dist/js/analysis/analysis";
import dedent from "ts-dedent";
import { ExpressionOutlet } from "lobster-vis/dist/js/view/constructs/ExpressionOutlets";
import { CompilerNote, NoteKind } from "lobster-vis/dist/js/core/compilation/errors";
import { isPointerType, isType, Int } from "lobster-vis/dist/js/core/compilation/types";
import { FunctionDefinition } from "lobster-vis/dist/js/core/constructs/declarations/function/FunctionDefinition";
import { DirectInitializer } from "lobster-vis/dist/js/core/constructs/initializers/DirectInitializer";





$(() => {

    $(".lobster-ex").each(function() {

        $(this).append(createEmbeddedExerciseOutlet("single"));

        $(this).find(".lobster-ex-checkpoints")
          .detach().prependTo($(this))
          .css("position", "sticky")
          .css("top", "0")
          .css("background-color", "white")
          .css("z-index", "100000");

        let filename = "exercise.cpp";
        let exerciseSpec = <ExerciseSpecification>{
          starterCode: dedent`
            #include <iostream>
            using namespace std;
            
            // YOUR TASK - Fix this by using pass-by-pointer instead.
            void swap(int x, int y) {
              int temp = x;
              x = y;
              y = temp;
            }
            
            int main() {
              int a = 3;
              int b = 5;
              
              // HINT: You also need to change something about the call
              // to swap here. Don't change anything else in main().
              swap(a, b);
              
              cout << "a = " << a << endl;
              cout << "b = " << b << endl;
            }
          `,
          checkpoints: [
            new StaticAnalysisCheckpoint("Pass-by-Pointer", (program: Program) => {
                let swap_fn = findFirstConstruct(program, Predicates.byFunctionName("swap"));
                if (!swap_fn) { return false; }
                return swap_fn.parameters.every(p => p.type?.isPointerType());
            }),
            new StaticAnalysisCheckpoint("Pass Addresses in main()", (program: Program) => {
                let swap_fn = findFirstConstruct(program, Predicates.byFunctionCallName("swap"));
                if (!swap_fn) { return false; }
                return swap_fn.originalArgs.every(p => Predicates.isTypedExpression(p, isPointerType));
            }),
            new OutputCheckpoint("Correct Output", (output: string) => {
                return output.indexOf("a = 5") !== -1
                    && output.indexOf("b = 3") !== -1;
            },"", 10000),
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
          let swapPtdInts = findConstructs(program, constructTest(FunctionDefinition))
              .find(def => def.declaration.name === "swap");
          let main = findConstructs(program, constructTest(FunctionDefinition))
              .find(def => def.declaration.name === "main");

          if (!swapPtdInts || !main) {
              return;
          }

          let assignments = findConstructs(swapPtdInts, Predicates.byKind("assignment_expression"));
          let pointerAssignments = assignments.filter(Predicates.byTypedExpression(isPointerType));

          let localDefs = findConstructs(swapPtdInts, Predicates.byKind("local_variable_definition"));
          let pointerDefs = localDefs.filter(Predicates.byTypedDeclaration(isPointerType));
          let intDefs = localDefs.filter(Predicates.byTypedDeclaration(isType(Int)));

          let intParams = swapPtdInts.parameters.filter(Predicates.byTypedDeclaration(isType(Int)));

          // Heuristic 1
          // At least two assignments, but no variable declarations. Forgot a temporary?
          if (assignments.length >= 2 && localDefs.length == 0) {
              assignments.forEach(assn => assn.addNote(new CompilerNote(assn, NoteKind.STYLE, "analysis.1", "It's just a guess, but one of these assignments might end up accidentally overwriting some important data when you run your code. Check out the simulation to see ;).")));
          }

          // Heuristic 2
          // Only one variable declaration and it's a pointer. Also at least one assignment in terms of pointers.
          if (program.isRunnable() && localDefs.length === 1
              && localDefs[0].type && localDefs[0].type.isPointerType()
              && pointerAssignments.length >= 1) {

              swapPtdInts.declaration.addNote(new CompilerNote(swapPtdInts.declaration, NoteKind.STYLE, "analysis.2", "Check out the visualization of your code. What kinds of things are being swapped? Is it the arrows (i.e. pointers) or the values? Which do you want? What does that mean about where you should have the * operator in your code?"));
          }

          // Heuristic 3
          // Declare a non-pointer but assign a pointer to it.
          intDefs.filter(def => {
              return def.initializer && def.initializer instanceof DirectInitializer && def.initializer.args[0].type?.isPointerType();
          }).forEach(def => {
              def.addNote(new CompilerNote(def, NoteKind.STYLE, "analysis.3",
                  `This line is trying to put an address into a variable that declared to hold ${def.type!.englishString(false)} value. Pointers (which have addresses for values) can't be stored into variables that hold plain values.`));
          });

          // Heuristic 4
          // Parameters that are pass-by-value (and not pass-by-pointer)
          if (program.isRunnable() && assignments.length >= 2) {
              if (intParams.length >= 2) {

                  swapPtdInts.declaration.addNote(new CompilerNote(swapPtdInts.declaration, NoteKind.STYLE, "analysis.4",
                      `Initially, this function doesn't have any effect. Why not? How can you fix it?`));
              }
          }

          // Heuristic 5
          // Pass by value paramParam in swap with same name as param in main
          intParams.filter(
              param => findConstructs(main!, Predicates.byKind("local_variable_definition")).find(def => def.name === param.name)
          ).forEach(
              param => param.addNote(new CompilerNote(param, NoteKind.STYLE, "analysis.4",
                  `Note that the parameter ${param.name} is not the same variable as the ${param.name} declared in main(). The two variables have different scopes and correspond to separate objects at runtime.`))
          );

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
              text: msg.submission.code
            });
          }

        });

        setInterval(() => {
          try {
            window.parent?.postMessage({
              examma_ray_message: {
                message_kind: "update",
                submission: {
                  code: exOutlet.project.sourceFiles[0].text,
                  complete: project.exercise.isComplete
                }
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