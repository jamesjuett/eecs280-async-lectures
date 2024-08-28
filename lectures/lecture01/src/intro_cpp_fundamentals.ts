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
import { isPointerType, isType, Int, isBoundedArrayOfType, isIntegralType, Bool, Double, isCompleteClassType } from "lobster-vis/dist/js/core/compilation/types";
import { FunctionDefinition } from "lobster-vis/dist/js/core/constructs/declarations/function/FunctionDefinition";
import { DirectInitializer } from "lobster-vis/dist/js/core/constructs/initializers/DirectInitializer";
import { Simulation } from "lobster-vis/dist/js/core/runtime/Simulation";
import { LocalVariableDefinition } from "lobster-vis/dist/js/core/constructs/declarations/variable/LocalVariableDefinition";
import { AnalyticExpression } from "lobster-vis/dist/js/core/constructs/expressions/expressions";





$(() => {

    const ex_elem = $(".lobster-ex");

    ex_elem.append(createEmbeddedExerciseOutlet("single"));

    let filename = "exercise.cpp";
    let exerciseSpec = <ExerciseSpecification>{
      starterCode: dedent`
        #include <iostream>
        using namespace std;
        
        int main() {
        
          // Task 1: Define a variable called price with inital value 7.99.


          // Task 2: Define a variable called quantity with initial value 4.
          //         The variable's type should only allow whole numbers.


          // Task 3: Print the result of multiplying the variables to cout.
          //         (Use the unqualified name cout, not std::cout.)


        }
      `,
      checkpoints: [
        new StaticAnalysisCheckpoint("Task 1", (program: Program, project: Project) => {
          let priceDef = findFirstConstruct(program, Predicates.byVariableName("price"));
          if (!priceDef?.type.similarType(Double.DOUBLE)) { return false; }
          return Predicates.byVariableInitialValue(7.99)(priceDef);
        }),
        new StaticAnalysisCheckpoint("Task 2", (program: Program, project: Project) => {
          let priceDef = findFirstConstruct(program, Predicates.byVariableName("quantity"));
          if (!priceDef?.type.similarType(Int.INT)) { return false; }
          return Predicates.byVariableInitialValue(4)(priceDef);
        }),
        new OutputCheckpoint("Task 3", (output: string) => {
            return output.indexOf("31.96") !== -1;
        })
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

    let extras = [
      (program: Program) => {

        const classes = findConstructs(program, Predicates.byKind("class_definition"));
        const sandwich_struct = classes.find(c => c.name === "Sandwich");
        const mem_price = sandwich_struct?.memberDeclarationsByName["price"];

        if (mem_price?.type?.similarType(Int.INT)) {
          mem_price.addNote(new CompilerNote(mem_price, NoteKind.STYLE, "analysis.1", "Make sure the type here can accommodate decimal values like 7.99"))
        }
      }
    ];

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
