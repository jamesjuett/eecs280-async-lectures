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
import { StaticAnalysisCheckpoint } from "lobster-vis/dist/js/analysis/checkpoints";
import { Program, SourceFile } from "lobster-vis/dist/js/core/compilation/Program";
import { Predicates } from "lobster-vis/dist/js/analysis/predicates";
import { findConstructs, findFirstConstruct } from "lobster-vis/dist/js/analysis/analysis";
import dedent from "ts-dedent";
import { ExpressionOutlet } from "lobster-vis/dist/js/view/constructs/ExpressionOutlets";
import { findLoopControlVars } from "lobster-vis/dist/js/analysis/loops";
import { isMemberFunctionContext, isMemberSpecificationContext } from "lobster-vis/dist/js/core/compilation/contexts";
import { CompilerNote, NoteKind } from "lobster-vis/dist/js/core/compilation/errors";
import { CtorInitializer } from "lobster-vis/dist/js/core/constructs/initializers/CtorInitializer";
import { Double, Int } from "lobster-vis/dist/js/core/compilation/types";





$(() => {

    $(".lobster-ex").each(function() {

        $(this).append(createEmbeddedExerciseOutlet("single"));

        let filename = "code";
        let exerciseSpec = {
          starterCode: dedent`
            #include <iostream>
            using namespace std;

            class Rectangle {
            private:
              double width;
              double height;
            
            public:
              Rectangle(double w, double h)
               : width(w), height(h) { }

              double area() const { return width * height; }
              double perimeter() const { return 2 * (width + height); }
              void scale(double s) { width *= s; height *= s; }
            };
          `,
          checkpoints: [
            new StaticAnalysisCheckpoint("Default Ctor", (program: Program, project: Project) => {
              let rect_class = findConstructs(program.translationUnits["code"], Predicates.byKind("class_definition")).find(c => c.name === "Rectangle");
              if (!rect_class) {
                  return false;
              }
              
              let default_ctor_def = rect_class.defaultConstructor?.definition;
              let delegated_ctor_call = default_ctor_def && findFirstConstruct(default_ctor_def, Predicates.byKind("ClassDirectInitializer"))
              if (delegated_ctor_call && (delegated_ctor_call.args.length === 2 || delegated_ctor_call.args.length === 1 )) {
                return true;
              }
              return false;

            }),
            new StaticAnalysisCheckpoint("One Argument Ctor", (program: Program, project: Project) => {
              let rect_class = findConstructs(program.translationUnits["code"], Predicates.byKind("class_definition")).find(c => c.name === "Rectangle");
              if (!rect_class) {
                  return false;
              }
              
              let one_arg_ctor_def = rect_class.constructors.find(ctor => ctor.type.paramTypes.length === 1 && ctor.type.paramTypes[0].sameType(Double.DOUBLE))?.definition;
              let delegated_ctor_call = one_arg_ctor_def && findFirstConstruct(one_arg_ctor_def, Predicates.byKind("ClassDirectInitializer"))
              if (delegated_ctor_call && delegated_ctor_call.args.length === 2 ) {
                return true;
              }
              return false;

            }),
            // new OutputCheckpoint("Correct Output", (output: string, project: Project) => {
    
            //   if (output.indexOf("frogrd") !== -1) {
            //       let strcpyFn = findFirstConstruct(project.program, Predicates.byFunctionName("strcpy"));
            //       if (strcpyFn) {
            //           project.addNote(new CompilerNote(strcpyFn.declaration.declarator, NoteKind.STYLE, "hint_strcpy_null_char",
            //               `Hint: It looks like you're quite close to the right answer! Check out the simulation output. What gets printed? How does that relate to the placement of the null characters in memory?`));
            //       }
            //       return false;
            //   }
    
            //   let first = output.indexOf("frog");
            //   if (first === -1) { return false; }
            //   let second = output.indexOf("frog", first + 1);
            //   return second !== -1;
            // }),
            
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

          let rect_class = findConstructs(program.translationUnits["code"], Predicates.byKind("class_definition")).find(c => c.name === "Rectangle");
          if (!rect_class) {
              return false;
          }
          
          rect_class.constructors.forEach(ctor => {
            const decl = ctor.firstDeclaration;
            if (isMemberSpecificationContext(decl.context) && decl.context.accessLevel == "private") {
              decl.addNote(
                new CompilerNote(
                  decl, NoteKind.STYLE, "lec9.rectangle.1",
                  `Make sure to declare constructors in the public section, otherwise they won't be usable from outside the class.`
                )
              );
            }
          });

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