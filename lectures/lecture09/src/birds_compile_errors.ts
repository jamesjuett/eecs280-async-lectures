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
            #include <string>
            using namespace std;
            
            class Bird {
            private:
              int age;
              string name;
            
            public:
              Bird(string name_in) : age(0), name(name_in) {
                cout << "Bird ctor " << name << endl;
              }
              
              const string &getName() const { return name; }
              int getAge() const { return age; }
            
              void talk() const { cout << "tweet" << endl; }
            };
            
            class Chicken : public Bird {
            private:
              int roadsCrossed;
            
            public:
              Chicken(string name_in) : roadsCrossed(0) {
                cout << "Chicken ctor " << getName() << endl;
              }
              
            
              void crossRoad() { ++roadsCrossed; }
            
              void talk() const { cout << "bawwk" << endl; }
            };
            
            class Duck {
            private:
              int numDucklings;
            
            public:
              Duck(string name_in) : Bird(name_in) {
                cout << "Duck ctor " << getName() << endl;
              }
              
            
              void babyDucklings() { numDucklings += 7; }
              void talk() { cout << "quack" << endl; }
            };
            
            int main() {
              string bName = "Big Bird";
              Bird b(bName);
              b.talk();
              b.crossRoad();
            
              string cName = "Myrtle";
              Chicken c(cName);
              c.talk();
            
              string dName = "Scrooge";
              const Duck d(dName);
              d.talk();
              pause();
            }
          `,
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