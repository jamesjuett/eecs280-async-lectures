import { decode } from "he";

import { createEmbeddedExerciseOutlet } from "lobster-vis/dist/js/view/embeddedExerciseOutlet"
import { COMPLETION_LAST_CHECKPOINT, Exercise, Project } from "lobster-vis/dist/js/core/Project";
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
        #include <string>
        using namespace std;
        
        // Task 1: Define a struct called "Sandwich" with the members listed below.
        //         Use the names given and choose an appropriate type for each.
        //  "name"    A name, e.g. "Reuben", "Tofu Bánh mì", "Chicken Shawarma"
        //  "is_veg"  A true/false value indicating whether the sandwich is vegetarian
        //  "price"   The cost to buy the sandiwch, e.g. 7.99
        
        int main() {
          // Task 2.1: Define and initialize a Sandwich variable as described below:
          // - You may name the variable whatever you like.
          // - The variable should be declared as const.
          // - Use the "= {}" notation to give each member a value.

          // Task 3: Create a pointer variable pointing to that Sandwich.

          // Task 4: Use the -> operator to print the name of the sandwich.

        }
      `,
      checkpoints: [
        new StaticAnalysisCheckpoint("Task 1", (program: Program, project: Project) => {
          const sandwich_struct = findSandwichStruct(program);
          return !!sandwich_struct;
        }),
        new StaticAnalysisCheckpoint("Task 2", (program: Program, project: Project) => {
          const sandwich_struct = findSandwichStruct(program);
          if (!sandwich_struct) { return false; }
          let main_fn = findFirstConstruct(program, Predicates.byFunctionName("main"));
          if (!main_fn) { return false; }
          let localDefs = findConstructs(main_fn, Predicates.byKind("local_variable_definition"));
          const sandwichDecl = localDefs.find(
            local_def => local_def.type.similarType(sandwich_struct.type) && local_def.type.isConst
          );
          if (!sandwichDecl) { return false; }
          const sandwichInit = findFirstConstruct(sandwichDecl, Predicates.byKind("ClassAggregateInitializer"));
          if (!sandwichInit || sandwichInit.implicitMemberInitializers.length > 0) { return false; }
          return sandwichInit.isSuccessfullyCompiled();
        }),
        new StaticAnalysisCheckpoint("Task 3", (program: Program, project: Project) => {
          const sandwich_struct = findSandwichStruct(program);
          if (!sandwich_struct) { return false; }
          let main_fn = findFirstConstruct(program, Predicates.byFunctionName("main"));
          if (!main_fn) { return false; }
          let localDefs = findConstructs(main_fn, Predicates.byKind("local_variable_definition"));
          const sandwichDecl = localDefs.find(
            local_def => local_def.type.similarType(sandwich_struct.type) && local_def.type.isConst
          );
          if (!sandwichDecl) { return false; }
          const pointerDef = localDefs.find(
            local_def => local_def.type.isPointerToCompleteObjectType() && local_def.type.ptrTo.similarType(sandwich_struct.type)
          );
          if (!pointerDef?.isSuccessfullyCompiled()) { return false; }

          // A direct initialization e.g. Sandwich *ptr = &s;
          const pointerInit = findFirstConstruct(pointerDef, Predicates.byKind("AtomicDirectInitializer"));
          const pointerInitArg = pointerInit && findFirstConstruct(pointerInit, Predicates.byKind("address_of_expression"));
          if (pointerInitArg && findFirstConstruct(pointerInitArg, Predicates.byIdentifierName(sandwichDecl.name))) {
            return true;
          }

          // A later assignment e.g. ptr = &s;
          const assn = findFirstConstruct(main_fn, Predicates.byVariableAssignedTo(pointerDef.declaredEntity));
          const pointerAssnArg = assn && findFirstConstruct(assn, Predicates.byKind("address_of_expression"));
          if (pointerAssnArg && findFirstConstruct(pointerAssnArg, Predicates.byIdentifierName(sandwichDecl.name))) {
            return true;
          }

          return false;
        }),
        
        new StaticAnalysisCheckpoint("Task 4", (program: Program, project: Project) => {
          const sandwich_struct = findSandwichStruct(program);
          if (!sandwich_struct) { return false; }
          let main_fn = findFirstConstruct(program, Predicates.byFunctionName("main"));
          if (!main_fn) { return false; }
          let localDefs = findConstructs(main_fn, Predicates.byKind("local_variable_definition"));
          const sandwichDecl = localDefs.find(
            local_def => local_def.type.similarType(sandwich_struct.type) && local_def.type.isConst
          );
          if (!sandwichDecl) { return false; }
          const pointerDef = localDefs.find(
            local_def => local_def.type.isPointerToCompleteObjectType() && local_def.type.ptrTo.similarType(sandwich_struct.type)
          );
          if (!pointerDef?.isSuccessfullyCompiled()) { return false; }

          return !!(findFirstConstruct(main_fn, Predicates.byKind("arrow_expression"))?.isSuccessfullyCompiled());
        }),
      ],
      completionCriteria: COMPLETION_LAST_CHECKPOINT,
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
