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
            #include <vector>
            using namespace std;
            
            int main() {
              vector<double> v = {1, 5, 3.5, 6.5};

              // Keep track of the "best" candidate we've seen.
              
              __________;

              for (size_t i = 0; i < v.size(); ++i) {
                // If v[i] is less than the current min, update min.
                __________

              }

              cout << "Min: " << min << endl;
            }
          `,
          checkpoints: [
            new OutputCheckpoint("Correct Min", (output: string) => {
                return output.indexOf("1") !== -1;
            }),
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

        let extras = [(program: Program) => {}];

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