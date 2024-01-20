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

            // NOTE: This isn't UnsortedSet<T> because Lobster
            //       doesn't yet support templates.

            const int DEFAULT_CAPACITY = 2;

            class UnsortedIntSet {
            public:
              
              UnsortedIntSet()
                : elts(new int[DEFAULT_CAPACITY]),
                  capacity(DEFAULT_CAPACITY),
                  elts_size(0) {}
              
              ~UnsortedIntSet() {
                delete[] elts;
              }
              
              // EFFECTS: adds v to the set
              void insert(int v) {
                if (contains(v)) { return; }
                
                // Increase capacity if needed
                if (elts_size == capacity) { grow(); }
                
                elts[elts_size] = v;
                ++elts_size;
              }
              
              // EFFECTS: removes v from the set
              void remove(int v) {
                if (!contains(v)) { return; }
                elts[indexOf(v)] = elts[elts_size - 1];
                --elts_size;
              };
              
              // EFFECTS: returns whether v is in the set
              bool contains(int v) const{
                return indexOf(v) != -1;
              }
              
              // EFFECTS: returns the number of elements
              int size() const{
                return elts_size;
              }
              
              // Implemented for you. You're welcome :)
              void print(ostream &os) const {
                os << "{" << " ";
                if (elts_size > 0){
                  os << elts[0];
                }
                for(int i = 1; i < elts_size; ++i){
                  os << ", " << elts[i];
                }
                os << " }" << endl;
              }
              
            private:
              // NOTE: In the old version, the array was held directly
              //       as an actual member of the class, meaning its
              //       lifetime was bound to the object as a whole. Thus,
              //       we were stuck with a single array (and a single size).
              //       
              //       This is now a pointer that will point to the
              //       beginning of a dynamic array, which can have an
              //       independent lifetime. That means we can swap in a
              //       bigger array at runtime (see grow function) if needed.
              int *elts;
              
              // Represents the current number of valid elements in the set
              int elts_size;
              
              // Represents the current capacity of the underlying array
              int capacity;
              
              // 1. Make a new array with twice as much capacity
              // 2. Copy elements over
              // 3. Update capacity
              // 4. Destroy old array
              // 5. Point elts to the new array
              void grow() {
                
                //TODO: Implement this function!

              }
              
              // EFFECTS: Returns the index of the v in the elts
              //          array. If not present, returns -1.
              int indexOf(int v) const{
                for(int i = 0; i < elts_size; ++i){
                  if(elts[i] == v){
                    return i;
                  }
                }
                return -1;
              }
            };

              
            ostream &operator<<(ostream &os, const UnsortedIntSet &s) {
              s.print(os);
              return os;
            }

            int main() {
              UnsortedIntSet set;
              set.insert(2);
              set.insert(3);
              set.insert(4);
              set.insert(5);
              set.insert(1);
              
              // Set should print as { 2, 3, 4, 5, 1 }
              cout << set << endl;

              // Should have grown twice. 2 -> 4 and 4 -> 8.
              // Underlying array has final size of 8.
            }
          `,
          checkpoints: [
            new OutputCheckpoint("Correct Set Output", (output: string) => {
              return output.indexOf("{ 2, 3, 4, 5, 1 }") !== -1;
            }),
            new EndOfMainStateCheckpoint("Final Array Size 8", (sim: Simulation) => {
              let set = <AutoObject<CompleteClassType>>sim.topFunction()?.stackFrame?.localObjectsByName["set"];
              if (!set) { return false; }
              let elts = <CPPObject<ArrayPointerType<Int>>>(set.getMemberObject("elts"));
              if (!elts) { return false; }
              return elts.type.arrayObject.type.numElems == 8;

            }, "", 5000),
            new EndOfMainStateCheckpoint("No Undefined Behavior", (sim: Simulation) => {
              return !sim.hasAnyEventOccurred;
            }, "", 5000),
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