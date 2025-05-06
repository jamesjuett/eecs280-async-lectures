import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const TYPES_CONTROL_STRUCTURES_AND_PROCEDURAL_ABSTRACTION : Omit<ExamSpecification, "exam_id"> = {
  title: "Types, Control Structures, and Procedural Abstraction",
  mk_intructions: dedent`

    <div markdown=1 class="alert alert-info">
      We'll continue our tour of C++ in this lecture, with a particular focus on three areas:
      
      - Data types, both fundamental and those from the C++ standard library.
      - Control flow structures for branching and looping.
      - Defining and using functions (for procedural abstraction), including when they're split across several files.
      
      <!-- end list -->

      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Spring 2025</div>
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
  sections: [
    {
      section_id: "section_02_1",
      title: "Functions",
      mk_description: dedent`
        In more complex programs, it's essential to define functions to abstract away details.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/EibBjApuktw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_02_2",
      title: "Standard Library Types",
      mk_description: dedent`
        The C++ Standard Library provides a variety of container and utility types. We'll take a look at a few now, including \`std::vector\` which is used extensively in project 1.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Or3dP1jF5go" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_02_3",
      title: "Iteration",
      mk_description: dedent`
        In imperative programming, loops allow us to iterate through a set of instructions multiple times as long as some condition is true. C++ has two primary looping constructs, \`for\` and \`while\`.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/E2QAhXmsnmw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_vector_sum",
          title: "Exercise: Vector Sum",
          points: 1,
          mk_description: dedent`
            Fill in the blanks so that the code computes the sum of elements in the vector.
            
            If your code compiles, but you're not getting credit, try clicking the "Simulate" button to step through the code and see where it's going wrong.
          `,
          response: {
            kind: "iframe",
            src: "assets/vector_sum.html",
            element_class: "lobster-iframe",
            element_style: "height: 850px;",
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
              #include <vector>
              using namespace std;
              
              int main() {
                vector<double> v = {1, 5, 3.5, 6.5};

                // Declare accumulator variable to hold the sum
                double sum = 0;

                // Traverse by index from 0 ... v.size()-1
                for (int i = 0; i < v.size(); ++i) {

                  // Access each element by index and add to sum
                  sum += v[i];
                }
                
                cout << "Sum: " << sum << endl;
              }
              \`\`\`
            </details>
            
            <div markdown=1 class="alert alert-warning" style="text-align: center;">
              <div style="color: black;"><svg style="vertical-align: text-top;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M13 17.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.25-8.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z"></path><path d="M9.836 3.244c.963-1.665 3.365-1.665 4.328 0l8.967 15.504c.963 1.667-.24 3.752-2.165 3.752H3.034c-1.926 0-3.128-2.085-2.165-3.752Zm3.03.751a1.002 1.002 0 0 0-1.732 0L2.168 19.499A1.002 1.002 0 0 0 3.034 21h17.932a1.002 1.002 0 0 0 .866-1.5L12.866 3.994Z"></path></svg>
              Make sure to return to finish the video after completing the exercise!
              </div>
            </div>
          `
        }
      ],
    },
    {
      section_id: "section_02_4",
      title: "Branching",
      mk_description: dedent`
        The \`if\` and \`else\` constructs are used for branching in C++, often in conjunction with loops.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/U3smDED1ibA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_vector_min",
          title: "Exercise: Vector Minimum",
          points: 1,
          mk_description: dedent`
            Fill in the blanks so that the code finds the minimum value in the vector.
            
            If your code compiles, but you're not getting credit, try clicking the "Simulate" button to step through the code and see where it's going wrong.
          `,
          response: {
            kind: "iframe",
            src: "assets/vector_min.html",
            element_class: "lobster-iframe",
            element_style: "height: 850px;",
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
              #include <vector>
              using namespace std;
              
              int main() {
                vector<double> v = {1, 5, 3.5, 6.5};

                // Keep track of the "best" candidate we've seen.
                
                double min = v[0];

                for (size_t i = 0; i < v.size(); ++i) {
                  // If v[i] is less than the current min, update min.
                  if (v[i] < min) {
                    min = v[i];
                  }
                }

                cout << "Min: " << min << endl;
              }
              \`\`\`
            </details>

            <div markdown=1 class="alert alert-warning" style="text-align: center;">
              <div style="color: black;"><svg style="vertical-align: text-top;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M13 17.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.25-8.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z"></path><path d="M9.836 3.244c.963-1.665 3.365-1.665 4.328 0l8.967 15.504c.963 1.667-.24 3.752-2.165 3.752H3.034c-1.926 0-3.128-2.085-2.165-3.752Zm3.03.751a1.002 1.002 0 0 0-1.732 0L2.168 19.499A1.002 1.002 0 0 0 3.034 21h17.932a1.002 1.002 0 0 0 .866-1.5L12.866 3.994Z"></path></svg>
              Make sure to return to finish the video after completing the exercise!
              </div>
            </div>
          `
        }
      ],
    },
    {
      section_id: "section_02_5",
      title: "Logical Operations and Short-Circuit Evaluation",
      mk_description: dedent`
        Sometimes we need to create compound boolean expressions using the \`&&\`, \`||\`, and \`!\` operators. In C++ (and some other languages), \`&&\` and \`||\` have special behavior called *short-circuit evaluation*. Here's the details.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/gQITxorPtt4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_02_6",
      title: "`break;` and `continue;`",
      mk_description: dedent`
        Finally, a miscellaneous topic. C++ also has special \`break;\` and \`continue\` statements that affect the execution of loops.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/-7cN_32DOQw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_02_7",
      title: "Procedural Abstraction",
      mk_description: dedent`
        Switching gears a bit, let's take a look at the high-level organization of a program using procedural abstraction to make our code easier to write, understand, and maintain.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/WVqOirVNBqI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: []
    },
    {
      section_id: "section_02_8",
      title: "Header Files, Makefiles, and Project 1",
      mk_description: dedent`
        As projects grow more complex, we often need to split the code into several different modules. In C++, we often use use a \`.hpp\` header files to provide declarations of the interfaces for implementation code in a \`.cpp\` file. These headers facilitate compilation across many files. But, as a project grows and compilation becomes more complex, we'll also turn to using build tools like \`Makefiles\` to automate the process.
        
        We'll use project 1 as an example to illustrate each of these. First, we'll look at the role of function prototpyes and header files.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/-3Yj7YpVOmk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Now, some discussion of the overall structure of project 1 and the \`Makefile\` we provide with the project.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/4-y9jzZz2bM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec02_interface_vs_implementation",
          title: "Exercise: Interface vs. Implementation",
          points: 6,
          mk_description: dedent`
            Categorize each of the following according to whether they are part of the interface or implementation (write "interface" or "implementation" in each box).
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              _BLANK__________________ Function declaration in \`.h\` file

              _BLANK__________________ Function definition in \`.cpp\` file
              
              _BLANK__________________ Code inside the function's curly braces
              
              _BLANK__________________ Which input values are valid or invalid for the function
              
              _BLANK__________________ Comments inside the function to clarify tricky lines of code
              
              _BLANK__________________ RME comment before the function declaration in \`.h\` file
            `,
            sample_solution: [
              "interface",
              "implementation",
              "implementation",
              "interface",
              "implementation",
              "interface",
            ],
            default_grader: {
              grader_kind: "manual_regex_fill_in_the_blank",
              rubric: [
                {
                  blankIndex: 1,
                  title: "Blank 1",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /inter/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 2,
                  title: "Blank 2",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /impl/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 3,
                  title: "Blank 3",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /impl/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 4,
                  title: "Blank 4",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /inter/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 5,
                  title: "Blank 5",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /impl/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 6,
                  title: "Blank 6",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /inter/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
              ]
            }
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>
              <p><input type="text" value="interface" readonly</input> Function declaration in <code>.h</code> file</p>
              <p><input type="text" value="implementation" readonly</input> Function definition in <code>.cpp</code> file</p>
              <p><input type="text" value="implementation" readonly</input> Code inside the function's curly braces</p>
              <p><input type="text" value="interface" readonly</input> Which input values are valid or invalid for the function</p>
              <p><input type="text" value="implementation" readonly</input> Comments inside the function to clarify tricky lines of code</p>
              <p><input type="text" value="interface" readonly</input> RME comment before the function declaration in <code>.h</code> file</p>
            </details>
          `,
        }
      ],
    },
    {
      section_id: "section_02_9",
      title: "RMEs for Interface Specification",
      mk_description: dedent`
        It's useful to adopt a common patten for comments that specify function interfaces. In EECS 280, we'll use RMEs:
         - \`REQUIRES\` Are there restrictions on the allowed inputs to the function?
         - \`MODIFIES\` Does the function change our program state when it is run?
         - \`EFFECTS\` What does the function do? What (if any) result does it return?

        <br />
         
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/pQKP0SucFgY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_02_10",
      title: "Unit Testing",
      mk_description: dedent`
        Finally, let's take a bit of time to talk about unit testing. We need to make sure the code we write actually works.
        
        In particular, we'll look at **unit testing** as a strategy for making sure that the implementation we write for a function actually works according to the interface we've decided for it to have. We'll look at some examples and general strateiges for writing good tests.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/mpmqISAUacI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,

      questions: [
        {
          question_id: "lec02_unit_testing_true_false",
          points: 4,
          mk_description: dedent`
            Which of the following are true statements about unit tests?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Unit tests should check a mix of general and special cases.",
              "Each unit test should test as many different functions as possible.",
              "Inputs that break the function's \`REQUIRES\` clause generally make good special case tests.",
              "It's not necessary to write unit tests for bugs that would cause compiler errors.",
            ],
            multiple: true,
            sample_solution: [0, 2],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
                {points: 1, selected: true},
                {points: 1, selected: false},
                {points: 1, selected: false},
                {points: 1, selected: true},
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
    //   section_id: "section_02_11",
    //   title: "System and Regression Testing",
    //   mk_description: dedent`
    //     TODO
    //   `,

    //   questions: [
        
    //   ],
    // },
  ],
};
