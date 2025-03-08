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
            
            // EXERCISE - Implement a custom assignment operator here
            
            
            
            
            
            
            
            ~UnsortedIntSet() {
              delete[] elts;
            }
          
            
            // EFFECTS: adds v to the set
            void insert(int v) {
              if (contains(v)) {
                return;
              }
              
              // Increase capacity if needed
              if (elts_size == capacity) {
                grow();
              }
              
              elts[elts_size] = v;
              ++elts_size;
          
            }
             
            // EFFECTS: removes v from the set
            void remove(int v) {
              if (!contains(v)) {
                return;
              }
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
              os << "{ ";
              if (elts_size > 0){
                os << elts[0];
              }
              for(int i = 1; i < elts_size; ++i){
                os << ", " << elts[i];
              }
              os << " }";
            }
              
          private:
            // Points to a dynamically allocated array on the heap
            int *elts;
            
            // Represents the current number of valid elements in the set
            int elts_size;
            
            // Represents the current capacity of the underlying array
            int capacity;
            
            // Allocates a new dynamic array with twice the capacity.
            // Then, copies over the elements from the old array.
            // Finally, frees the memory for the old array and
            // points the elts pointer to the new array.
            void grow() {
              int *newArr = new int[2 * capacity];
              for (int i = 0; i < elts_size; ++i) {
                newArr[i] = elts[i];
              }
              capacity *= 2;
              delete[] elts;
              elts = newArr;
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
            UnsortedIntSet s1;
            
            s1.insert(2);
            s1.insert(3);
            
            UnsortedIntSet s2;
            s2.insert(42);
            s2 = s1;
            
            s2.remove(3);
            s2.insert(5);
          
            cout << s1 << endl; // prints { 2, 3 }
            cout << s2 << endl; // prints { 2, 5 }
          }`,
          checkpoints: [
            new StaticAnalysisCheckpoint("Assignment Operator Signature", (program: Program) => {
              let set_class = findConstructs(
                program.translationUnits["code"], Predicates.byKind("class_definition")
              ).find(c => c.name === "UnsortedIntSet");
              if (!set_class) { return false; }
              
              let function_group = set_class.lookupAssignmentOperator(true, false);
              if (function_group?.declarationKind !== "function") {
                return false;
              }
              
              let assnOp = function_group.overloads[0];
              if (!assnOp) { return false; }
              if (!assnOp.isUserDefined) { return false; }
              if (!assnOp.type.returnType.isReferenceToCompleteType()) { return false; }
              if (!assnOp.type.returnType.refTo.sameType(set_class?.type)) { return false };

              return true;
            }),
            new OutputCheckpoint("Correct Output", (output: string) => {
              return output.indexOf("{ 2, 3 }") !== -1
                && output.indexOf("{ 2, 5 }") !== -1;
            },"", 10000),
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

          let delete_exps = findConstructs(program.translationUnits["code"], Predicates.byKind("delete_expression"));
          if (!delete_exps) {
              return false;
          }

          delete_exps.forEach(e => e.addNote(
            new CompilerNote(
              e, NoteKind.STYLE, "lec14.delete.1",
              "Double check that you're using `delete` in the correct place and using the correct form of `delete`. If you're planning to delete an array, use \`delete[]\` instead."
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