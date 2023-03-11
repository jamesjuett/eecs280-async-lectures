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





$(() => {

    $(".lobster-ex").each(function() {

        $(this).append(createEmbeddedExerciseOutlet("single"));

        let filename = "exercise.cpp";
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
            
            // Allocates a new dynamic array with twice the capacity.
            // Then, copies over the elements from the old array.
            // Finally, frees the memory for the old array and
            // points the elts pointer to the new array.
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
            UnsortedIntSet s1;
            s1.insert(2);
            s1.insert(3);
          
            UnsortedIntSet s2 = s1;
          
            // s2.remove(3);
            // s2.insert(30);
            // cout << "s1: " << s1 << endl;
            // cout << "s2: " << s2 << endl;
          }`,
          checkpoints: [],
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

        let project = new Project(
          "project",
          undefined,
          [{name: filename, code: exerciseSpec.starterCode, isTranslationUnit: true}],
          new Exercise(exerciseSpec));
        project.turnOnAutoCompile(500);

        if (exerciseSpec.checkpoints.length === 0) {
          $(this).find(".lobster-embedded-height-control").addClass("lobster-ex-no-checkpoints");
        }

        let exOutlet = new SimpleExerciseLobsterOutlet($(this), project);

    });

});