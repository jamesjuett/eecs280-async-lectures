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
import { AnalyticConstruct, Predicates } from "lobster-vis/dist/js/analysis/predicates";
import { constructTest, containsConstruct, findConstructs, findFirstConstruct } from "lobster-vis/dist/js/analysis/analysis";
import { findLoopControlVars } from "lobster-vis/dist/js/analysis/loops";
import dedent from "ts-dedent";
import { ExpressionOutlet } from "lobster-vis/dist/js/view/constructs/ExpressionOutlets";
import { CompilerNote, NoteKind } from "lobster-vis/dist/js/core/compilation/errors";
import { isPointerType, isType, Int, isBoundedArrayOfType, isIntegralType, Bool, Double, isCompleteClassType } from "lobster-vis/dist/js/core/compilation/types";
import { FunctionDefinition } from "lobster-vis/dist/js/core/constructs/declarations/function/FunctionDefinition";
import { DirectInitializer } from "lobster-vis/dist/js/core/constructs/initializers/DirectInitializer";
import { Simulation } from "lobster-vis/dist/js/core/runtime/Simulation";
import { LocalVariableDefinition } from "lobster-vis/dist/js/core/constructs/declarations/variable/LocalVariableDefinition";
import { AnalyticExpression } from "lobster-vis/dist/js/core/constructs/expressions/expressions";
import { areSemanticallyEquivalent } from "lobster-vis/dist/js/core/compilation/contexts";



const SAMPLE_NULLPTR_CHECKS = (() => {
  let p = new Program([
    new SourceFile("temp", `
      #include <iostream>
      using namespace std;
      
      void strcpy(char *dst, const char *src){
        
        const char *ptr = src;

        while (src != nullptr) {
          @anything@
        }
        
        while (!(src == nullptr)) {
          @anything@
        }
        
        for (@anything@; src != nullptr; @anything@) {
          @anything@
        }
        
        for (@anything@; !(src == nullptr); @anything@) {
          @anything@
        }

        while (ptr != nullptr) {
          @anything@
        }
        
        while (!(ptr == nullptr)) {
          @anything@
        }
        
        for (@anything@; ptr != nullptr; @anything@) {
          @anything@
        }
        
        for (@anything@; !(ptr == nullptr); @anything@) {
          @anything@
        }
        
      }
    `)],
    new Set(["temp"])
  );
  let fn = findFirstConstruct(p, Predicates.byFunctionName("strcpy"));
  return findConstructs(fn!, Predicates.byKinds(["while_statement", "for_statement"]));
})();


$(() => {

    const ex_elem = $(".lobster-ex");

    ex_elem.append(createEmbeddedExerciseOutlet("single"));

    let filename = "exercise.cpp";
    let exerciseSpec = <ExerciseSpecification>{
      starterCode: dedent`
        #include <iostream>
        using namespace std;

        // REQUIRES: src NULL-terminated C-string
        //           dest is big enough to hold a copy of src
        // MODIFIES: dest
        // EFFECTS:  place a copy of src in dest
        void strcpy(char *dst, const char *src){
          
          // WRITE YOUR CODE HERE
          
        }

        int main(){
          char word1[5] = "frog";
          char word2[7] = "lizard";
          strcpy(word2, word1); // copy "frog" from word1 to word2
          
          cout << word1 << endl;
          cout << word2 << endl;
          // Checkpoint verifies the correct output:
          //   frog
          //   frog
        }
      `,
      checkpoints: [
        new StaticAnalysisCheckpoint("Traversal By Pointer", (program: Program, project: Project) => {
          let strcpy_fn = findFirstConstruct(program, Predicates.byFunctionName("strcpy"));
          if (!strcpy_fn) {
              return false;
          }

          let loop = findFirstConstruct(strcpy_fn, Predicates.byKinds(["while_statement", "for_statement"]));
          if (!loop) {
              return false;
          }

          let loopControlVars = findLoopControlVars(loop);
          return loopControlVars.some(v => v.isTyped(isPointerType));
        }),
        new OutputCheckpoint("Correct Output", (output: string, project: Project) => {

          if (output.indexOf("frogrd") !== -1) {
              let strcpyFn = findFirstConstruct(project.program, Predicates.byFunctionName("strcpy"));
              if (strcpyFn) {
                  project.addNote(new CompilerNote(strcpyFn.declaration.declarator, NoteKind.STYLE, "hint_strcpy_null_char",
                      `Hint: It looks like you're quite close to the right answer! Check out the simulation output. What gets printed? How does that relate to the placement of the null characters in memory?`));
              }
              return false;
          }

          let first = output.indexOf("frog");
          if (first === -1) { return false; }
          let second = output.indexOf("frog", first + 1);
          return second !== -1;
        }),
        
      ],
      completionCriteria: COMPLETION_ALL_CHECKPOINTS,
      completionMessage: "Nice work! Exercise complete!",
    };

    let completionMessage = ex_elem.find(".lobster-ex-completion-message").html()?.trim() ?? ex_elem.find(".lobster-ex-complete-message").html()?.trim();
    if (completionMessage) {
      exerciseSpec.completionMessage = completionMessage;
    }
    let initCode = decode(ex_elem.find(".lobster-ex-starter-code").html()?.trim() ?? ex_elem.find(".lobster-ex-init-code").html()?.trim() ?? "");
    if (initCode) {
      exerciseSpec.starterCode = initCode;
    }

    let extras = [(program: Program) => {

      let strcpy_fn = findFirstConstruct(program, Predicates.byFunctionName("strcpy"));
      if (!strcpy_fn) {
          return false;
      }

      let loop = findFirstConstruct(strcpy_fn, Predicates.byKinds(["while_statement", "for_statement"]));
      let dst_param = strcpy_fn.parameters[0].declaredEntity;
      let src_param = strcpy_fn.parameters[1].declaredEntity;

      if (loop && src_param && dst_param
        && containsConstruct(loop.condition, Predicates.byVariableIdentifier(dst_param))
        && !containsConstruct(loop.condition, Predicates.byVariableIdentifier(src_param))) {
        loop.condition.addNote(
          new CompilerNote(
            loop.condition, NoteKind.STYLE, "lec6.strcpy.1",
            `The condition of your loop should depend on the source string.`
          )
        );
      }

      
      const nullptr_traversal_loop = findConstructs(program, Predicates.byKinds(["for_statement", "while_statement"]))
        .find((construct: AnalyticConstruct) => SAMPLE_NULLPTR_CHECKS.some(sample => areSemanticallyEquivalent(sample, construct, {})));
      nullptr_traversal_loop?.condition?.addNote(
        new CompilerNote(
          nullptr_traversal_loop?.condition, NoteKind.STYLE, "lec6.strcpy.2",
          `It looks like this condition is checking whether the pointer becomes null. That's checking whether it gets to address 0x0, which isn't quite right. Instead, try dereferencing the pointer to check whether the character it points to is the null character.`
        )
      );

      findConstructs(program, Predicates.byKind("assignment_expression")).forEach(assn => {
        const lhs = assn.lhs.analytic();
        const rhs = assn.rhs.analytic();
        if (lhs.construct_type === "identifier_expression" && lhs.entity === dst_param) {
          lhs.addNote(
            new CompilerNote(
              lhs, NoteKind.STYLE, "lec6.strcpy.3",
              `Make sure to dereference when assigning, since we want to work with the characters the pointers point to (and not just the addresses the pointers store).`
            )
          );
        }
      })

    }];

    let project = new Project(
      "project",
      undefined,
      [{name: filename, code: exerciseSpec.starterCode, isTranslationUnit: true}],
      new Exercise(exerciseSpec),
      extras);
    project.turnOnAutoCompile(500);

    if (exerciseSpec.checkpoints.length === 0) {
      ex_elem.find(".lobster-embedded-height-control").addClass("lobster-ex-no-checkpoints");
    }

    let exOutlet = new SimpleExerciseLobsterOutlet(ex_elem, project);

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

function findSandwichStruct(program: Program) {
  let classes = findConstructs(program, Predicates.byKind("class_definition"));
  let sandwich_struct = classes.find(c => c.name === "Sandwich");

  let mem_name = sandwich_struct?.memberDeclarationsByName["name"];
  let mem_is_veg = sandwich_struct?.memberDeclarationsByName["is_veg"];
  let mem_price = sandwich_struct?.memberDeclarationsByName["price"];

  if (!(mem_name?.type?.isCompleteClassType() && mem_name.type.className === "string")) {
    return;
  }

  if (!(mem_is_veg?.type?.similarType(Bool.BOOL))) {
    return;
  }

  if (!(mem_price?.type?.similarType(Double.DOUBLE))) {
    return;
  }
  
  return sandwich_struct;
}
