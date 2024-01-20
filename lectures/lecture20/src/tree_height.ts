import { decode } from "he";

import { createEmbeddedExerciseOutlet } from "lobster-vis/dist/js/view/embeddedExerciseOutlet"
import { COMPLETION_ALL_CHECKPOINTS, Exercise, Project } from "lobster-vis/dist/js/core/Project";
import { DEFAULT_EXERCISE, getExerciseSpecification } from "lobster-vis/dist/js/exercises";

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
import { findConstructs, findFirstConstruct } from "lobster-vis/dist/js/analysis/analysis";
import dedent from "ts-dedent";
import { ExpressionOutlet } from "lobster-vis/dist/js/view/constructs/ExpressionOutlets";
import { findLoopControlVars } from "lobster-vis/dist/js/analysis/loops";
import { isMemberFunctionContext, isMemberSpecificationContext } from "lobster-vis/dist/js/core/compilation/contexts";
import { CompilerNote, NoteKind } from "lobster-vis/dist/js/core/compilation/errors";
import { CtorInitializer } from "lobster-vis/dist/js/core/constructs/initializers/CtorInitializer";
import { ArrayPointerType, CompleteClassType, Double, Int } from "lobster-vis/dist/js/core/compilation/types";
import { Simulation } from "lobster-vis/dist/js/core/runtime/Simulation";
import { AutoObject, CPPObject } from "lobster-vis/dist/js/core/runtime/objects";





$(() => {

    $(".lobster-ex").each(function() {

        $(this).append(createEmbeddedExerciseOutlet("single"));

        $(this).find(".lobster-ex-checkpoints")
          .detach().prependTo($(this))
          .css("position", "sticky")
          .css("top", "0")
          .css("background-color", "white")
          .css("z-index", "100000");

        let filename = "code";
        let exerciseSpec = {
          starterCode: dedent`
            #include <iostream>
            using namespace std;

            int max(int x, int y) {
              if (x > y) { return x; }
              else { return y; }
            }

            struct Node {
              int datum;
              Node *left;
              Node *right;
            };
            
            // REQUIRES: 'node' must be a binary search tree
            // EFFECTS: Returns the height of the tree rooted at 'node'.
            int tree_height(Node *node) {
              return 0; // REPLACE WITH YOUR CODE
            }
            
            int main() {
              Node n2 = {2, nullptr, nullptr};
              Node n3 = {3, nullptr, nullptr};
              Node n4 = {4, nullptr, &n2};
              Node n5 = {5, &n4, &n3};
              
              // Creates this tree:
              //        5
              //      /   \\
              //    4       3
              //     \\
              //      2
              
              assert(tree_height(nullptr) == 0);
              assert(tree_height(&n2) == 1);
              assert(tree_height(&n4) == 2);
              assert(tree_height(&n5) == 3);
            }
          `,
          checkpoints: [
            new EndOfMainStateCheckpoint("Passes Test Cases", (sim: Simulation) => {
              return !sim.hasAnyEventOccurred;
            }, "", 15000),
          ],
          completionCriteria: COMPLETION_ALL_CHECKPOINTS,
          completionMessage: "Nice work! Exercise complete!"
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

          // let rect_class = findConstructs(program.translationUnits["code"], Predicates.byKind("class_definition")).find(c => c.name === "Rectangle");
          // if (!rect_class) {
          //     return false;
          // }
          
          // rect_class.constructors.forEach(ctor => {
          //   const decl = ctor.firstDeclaration;
          //   if (isMemberSpecificationContext(decl.context) && decl.context.accessLevel == "private") {
          //     decl.addNote(
          //       new CompilerNote(
          //         decl, NoteKind.STYLE, "lec9.rectangle.1",
          //         `Make sure to declare constructors in the public section, otherwise they won't be usable from outside the class.`
          //       )
          //     );
          //   }
          // });

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
              name: "code",
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