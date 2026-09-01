import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const TYPES_AND_CONTROL_STRUCTURES : Omit<ExamSpecification, "exam_id"> = {
  title: "Types and Control Structures",
  mk_intructions: dedent`

    <div markdown=1 class="alert alert-info">
      We'll continue our tour of C++ in this lecture, with a particular focus on three areas:
      
      - Data types, both fundamental and those from the C++ standard library.
      - Control flow structures for branching and looping.
      - Defining and calling functions.
      
      <!-- end list -->

      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Fall 2025</div>
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
  ],
};
