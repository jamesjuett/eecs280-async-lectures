import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_09 : ExamSpecification = {
  exam_id: "lec_09_inheritance",
  title: "Operator Overloading and Inheritance",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-success">
      To earn participation credit, you'll need to complete the lecture within 2 days of the lecture date.
      For lecture 9 (released Monday 2/12), that means completing it by <b>Wednesday 2/14 at 11:59pm</b>.
    </div>
    <div markdown=1 class="alert alert-info">
      We'll start by covering **function overloading** and **operator overloading**, two mechanisms in C++ (and many other langugages) that allow the use of single names (or operators) to correspond to potentially many different function implementations depending on the types they are used with.

      Next, we'll introduce **inheritance**, which allows us to derive one \`class\` from another, such that the **derived class** automatically "inherits" member variables and functions from its **base class**. This is helpful both to save us work (i.e. we avoid duplicating common implementation details by putting them in a base class) and to set up the foundation for meaningful hierarchies of ADTs (more on this in the next lecture).
    </div>
    <style>
      .lec-video {
        width: 80%;
        aspect-ratio: 16/9;
      }

      iframe.lobster-iframe {
        border: none;
        width: 80%;
        height: 450px;
        margin-left: auto;
        margin-right: auto;
      }

    </style>
  `,
  mk_questions_message: MK_QUESTIONS_MESSAGE,
  mk_bottom_message: MK_BOTTOM_MESSAGE,
  mk_download_message: MK_DOWNLOAD_MESSAGE,
  mk_saver_message: MK_SAVER_MESSAGE,
  assets_dir: __dirname + `/assets`,
  allow_clientside_content: true,
  completion: {
    threshold: 1,
    tooltip: "",
    endpoints: {
      check: "https://examma-ray.eecs.umich.edu/public_api/participation/me/",
      submit: "https://examma-ray.eecs.umich.edu/public_api/participation/me/",
    }
  },
  credentials_strategy: {
    strategy: "google_local",
    client_id: "444801118749-m2g9gl3gvvkh5ru959dmka0lsk94d9uq.apps.googleusercontent.com",
    message: "Sign in with your @umich.edu Google account to earn participation credit for completing embedded exercises.",
  },
  sections: [
    {
      section_id: "section_9_1",
      title: "Function Overloading",
      mk_description: dedent`
        In C++, multiple functions are allowed to have the same name, even within the same scope, as long as they have different parameter types and can be distinguished by the compiler (and presumably by human programmers, too!). This is called **function overloading**.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/HoQWM3GfFcA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ],
    },
    {
      section_id: "section_9_2",
      title: "Operator Overloading",
      mk_description: dedent`
        We can also apply the concept of overloading to *operators* as well. For example, the \`+\` operator means one thing when it's used on \`int\`, something else when it's used on \`string\`, and yet another thing when it's used for pointer arithmetic!

        In C++, we can also define what an operator should do if used on our own custom classes. Take a look:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/4ETw1p8brbc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec9_pixel_operator_overloads",
          title: "Exercise: \`Pixel\` Operator Overloads",
          points: 1,
          mk_description: dedent`
            Let's upgrade \`Pixel\` from project 2 to a \`class\` and add some overloaded operators:

            - An overloaded \`<<\` operator that prints a pixel in the format \`rgb(R,G,B)\`
            - An overloaded \`-\` operator that computes the squared difference of two pixels
            
            Implement each operator (as a non-member function) so that the code in main works correctly.
          `,
          response: {
            kind: "iframe",
            src: "assets/pixel_operator_overloads.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
            default_grader: {
              grader_kind: "standard_iframe",
              rubric: [
                {
                  points: 1,
                  description: "Exercise must be complete.",
                  property: "complete",
                  value: true,
                }
              ]
            }
          },
          verifier: {
            verifier_kind: "full_credit"
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              
              \`\`\`cpp
              #include <iostream>
              using namespace std;
              
              class Pixel {
              public:
                const int r;
                const int g;
                const int b;
                
                Pixel(int r, int g, int b)
                  : r(r), g(g), b(b) { }
                
              };
              
              int squared_difference(const Pixel &p1, const Pixel &p2);
              
              // TASK 1: Add an overloaded operator- that
              // returns the squared difference between two
              // pixels (you can just call squared_difference
              // in your implementation)
              
              int operator-(const Pixel &p1, const Pixel &p2) {
                return squared_difference(p1, p2);
              }
              
              // TASK 2: Add an overloaded operator<< that
              // prints out the pixel in this format:
              //   rgb({R},{G},{B})
              ostream &operator<<(ostream &os, const Pixel &p) {
                cout << "rgb(" << p.r << ", " << p.g
                      << ", " << p.b << ")";
                return os;
              }
                
              int main() {
                Pixel p1(174, 129, 255);
                Pixel p2(166, 226, 46);
                
                cout << "p1: " << p1 << endl; // p1: rgb(174,129,255)
                cout << "p2: " << p2 << endl; // p2: rgb(166,226,46)
                
                cout << "sq diff: " << p2 - p1 << endl; // sq diff: 531
              }
              
              // From processing.cpp in P2 starter code
              int squared_difference(const Pixel &p1, const Pixel &p2) {
                int dr = p2.r - p1.r;
                int dg = p2.g - p1.g;
                int db = p2.b - p1.b;
                // Divide by 100 is to avoid possible overflows
                // later on in the algorithm.
                return (dr*dr + dg*dg + db*db) / 100;
              }
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_9_3",
      title: "Delegating Constructors",
      mk_description: dedent`
        Before moving on to inheritance, here's a quick miscellaneous topic that we didn't get to last time. **Delegating constructors** allow one constructor to call another to promote code reuse and overall elegant design.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/3ZjP0D6J4K4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec09_rectangle",
          title: "Exercise: \`Rectangle\` Constructors",
          points: 1,
          mk_description: dedent`
            Add two additional constructors to the \`Rectangle\` class. They should use delegation to call the constructor already provided in the starter code.
            - A default constructor that takes no arguments and initializes a \`1\`x\`1\` rectangle.
            - A constructor that takes in one side length \`s\` and then creates an \`s\`x\`s\` rectangle.
          `,
          response: {
            kind: "iframe",
            src: "assets/rectangle.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
            default_grader: {
              grader_kind: "standard_iframe",
              rubric: [
                {
                  points: 1,
                  description: "Exercise must be complete.",
                  property: "complete",
                  value: true,
                }
              ]
            }
          },
          verifier: {
            verifier_kind: "full_credit"
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              
              \`\`\`cpp
              #include <iostream>
              using namespace std;

              class Rectangle {
              private:
                double width;
                double height;
                
              public:
                Rectangle(double w, double h)
                : width(w), height(h) { }
                
                Rectangle(double s) : Rectangle(s,s) { }
                
                Rectangle() : Rectangle(1,1) { }

                double area() const { return width * height; }
                double perimeter() const { return 2 * (width + height); }
                void scale(double s) { width *= s; height *= s; }
              };
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_9_4",
      title: "Introduction to Inheritance",
      mk_description: dedent`
        Let's start with a bit of motivation for inheritance and a brief introduction to the way it's available as a fundamental language feature in C++.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/fMMKT-LlREA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap:
        - A derived class contains the **member variables** from the base class and may define additional ones.
        - You can call **member functions** of the base class on any derived class instances.
        - A derived class may **"hide"** a member function from the base class by defining its own version with the same signature.
        - A **derived class constructor** must call some version of the base class constructor in its constructor-initializer-list. (Unless there's a default constructor for the base class.)

        Let's return to apply inheritance to our \`Bird\`, \`Chicken\`, and \`Duck\` classes as well...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/J75zMbO3eV0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_9_5",
      title: "Inheritance Details",
      mk_description: dedent`

        Finally, let's investigate some "behind-the-scenes" details on how inheritance works.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/8jULLGraPN0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec09_inheritance_details_multiple_choice",
          points: 4,
          mk_description: dedent`
            Which of the following are true?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Both constructors and destructors generally run in a \"top-down\" ordering.",
              "If member name lookup finds a function in the derived class with a matching name but invalid parameter types, the base class will be checked as well.",
              "The `::` operator may be used to call the base class version of a function, even in a context where the derived class version would normally be found first.",
              "Generally, it is good practice to make member variables in a base class protected to ensure derived classes have full access to implementation details.",
            ],
            multiple: true,
            sample_solution: [2],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
                {points: 1, selected: false},
                {points: 1, selected: false},
                {points: 1, selected: true},
                {points: 1, selected: false},
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
        }
      ],
    },
    // {
    //   section_id: "section_9_6",
    //   title: "Birds Comiple Exercises",
    //   mk_description: dedent`

    //     <div style="text-align: center;">
    //       <iframe class="lobster-iframe" style="height: 650px;" src="assets/birds_compile_errors.html"></iframe>
    //     </div>
    //     <br />

    //   `,
    //   questions: [],
    // },
  ],
};