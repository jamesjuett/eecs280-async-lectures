import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const MACHINE_MODEL_PART_1 : Omit<ExamSpecification, "exam_id"> = {
  title: "Machine Model, Part 1",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">
      Today's lecture starts a two-part sequence where we'll consider a conceptual model of the underlying machine, with particular attention to objects in memory, their addresses, and the values they hold. We'll also introduce **references** and **pointers**, two fundamental tools for working with objects *indirectly*.

      Why do we need to work with objects indirectly in programming? It turns out we often work/think indirectly in real life, but may not realize it. For example, an address book refers indirectly to the places that people live, but it doesn't literally contain those places! (That wouldn't even make sense.)
      
      Likewise, in a program we might want several different parts of our code to refer to the same data structure, but we don't want them all to literally have a local copy of that data. It would be better to use a pointer to store the address of the data and just go look it up when we need to.

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
      section_id: "section_03_1",
      title: "Default Initialization",
      mk_description: dedent`
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/s4x5ZwI7WLA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_03_2",
      title: "Arithmetic Operations",
      mk_description: dedent`
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/bNxrwSV2LEE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <br />
      `,
      questions: [
        {
          question_id: "lec_modular_arithmetic",
          title: "Exercise: Modular Arithmetic",
          points: 3,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Say you have a Matrix of width W and height H, and that each cell in the matrix is labeled with an index. For example, a matrix with width 5 and height 3 would look like this:

              <div style="text-align: center;">
                <img src="assets/modular_arithmetic_ex_matrix.png" style="width: 300px; border: solid 1px gray;">
              </div>

              You can use \`/\` and \`%\` to compute the row and column based on the index. Fill in the appropriate operator and variable in each box below.

              \`\`\`cpp
              int width = 5;
              int height = 3;
              int index = 13;
              int row = _BLANK________________________; // compute row, e.g. index 13 has row 2
              int col = _BLANK________________________; // compute col, e.g. index 13 has col 3
              \`\`\`

              Consider also tracking the current player in a turn-taking game. For example, if you're playing the card game Uno, you might have a circle of 6 players numbered 0-5:

              <div style="text-align: center;">
                <img src="assets/modular_arithmetic_ex_uno_circle.png" style="width: 200px; border: solid 1px gray;">
              </div>

              Complete the line of code below to update the \`current\` index to the next player. For example, if \`current\` was \`3\`, it should be updated to \`4\`. But, if \`current\` was \`5\`, it should be updated and wrap back around to 0. You can use \`%\` to help implement this.

              \`\`\`cpp
              int num_players = 6;
              int current = ??;
              
              // update current player
              current = (current + 1) _BLANK____________________;
              \`\`\`
            `,
            default_grader: {
              grader_kind: "manual_regex_fill_in_the_blank",
              rubric: [
                {
                  blankIndex: 1,
                  title: "Box 1",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /^\s*index\s*\/\s*width\s*\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "index / width",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 2,
                  title: "Box 2",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /^\s*index\s*%\s*width\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "index % width",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 3,
                  title: "Box 3",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /^\s*%\s*num_players\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "% num_players",
                      points: 0
                    },
                  ]
                },
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/_MaKsAQ47nM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_03_3",
      title: "Relational Operations and Floating-Point Precision",
      mk_description: dedent`
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/UYJ9ipegmNA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_03_4",
      title: "Value Semantics, Addresses, and References",
      mk_description: dedent`
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/BsSHTi6uJF8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <br />
      `,
      questions: [
        {
          question_id: "lec03_value_semantics_addresses_references",
          points: 5,
          mk_description: dedent`
            Consider the following code:
            
            \`\`\`cpp
            int main() {
              int x = 3;
              int y = x;
              int &z = x;
              x = 10;
              // consider the state of the program at this point
            }
            \`\`\`

            Which of the following are true?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "The value of `x` is 10.",
              "The value of `y` is 10.",
              "The value of `z` is 10.",
              "The expression &x == &z will always yield true.",
              "If the line `z = y` is run, z will now refer to `y` instead of `x`.",
            ],
            multiple: true,
            sample_solution: [0, 2, 3],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
                {points: 1, selected: true},
                {points: 1, selected: false},
                {points: 1, selected: true},
                {points: 1, selected: true},
                {points: 1, selected: false},
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>

              <input type="text" size="8" value="true" readonly</input> The value of \`x\` is 10.
              
              <input type="text" size="8" value="false" readonly</input> The value of \`y\` is 10.
              
              <input type="text" size="8" value="true" readonly</input> The value of \`z\` is 10.
              
              <input type="text" size="8" value="true" readonly</input> The expression &x == &z will always yield true.
              
              <input type="text" size="8" value="false" readonly</input> If the line \`z = y\` is run, z will now refer to \`y\` instead of \`x\`.
            </details>
          `,
        }
      ],
    },
    {
      section_id: "section_03_5",
      title: "Intro to Pointers",
      mk_description: dedent`
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/BWikvpCnH7Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <br />
      `,
      questions: [
        {
          question_id: "lec03_addresses_and_pointers",
          title: "Exercise: Pointer Fundamentals",
          points: 4,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="border: none;">
  <tr>
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
      Consider the program below and answer a few questions.
      
\`\`\`cpp
int main() {
  int x = 4;
  int y = 7;
  double z = 1.5;
  
  int *ptr1 = &x;
  int *ptr2 = &y;
}
\`\`\`
    </div>
    </td>
    <td>
    <div>
      If you added the line <code>cout << ptr2 << endl;</code> to the end of <code>main()</code>, what would be printed?
      
      [[BOX
      
      
      ]]

      Suppose you added the line <code>ptr1 = &ptr2;</code> to the end of <code>main()</code>. Would the compiler allow this? If so, what would the effect of that line be?
      
      [[BOX
      
      
      ]]

      Suppose you added the line <code>ptr1 = ptr2;</code> to the end of <code>main()</code>. Would the compiler allow this? If so, what would the effect of that line be?
      
      [[BOX
      
      
      ]]
      
      Would it be possible to change the value of <code>z</code> using either of the two pointers declared in <code>main()</code>? If so, how? If not, why not?
      
      [[BOX
      
      
      ]]
    
    </div>
    </td>
  </tr>
</table>
            `,
            default_grader: {
              grader_kind: "manual_regex_fill_in_the_blank",
              rubric: [
                {
                  blankIndex: 1,
                  title: "Box 1",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /addr.*y/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /\&\s*y/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "The address of y is printed (i.e. &y).",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 2,
                  title: "Box 2",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /no|error|not|bad|wrong/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{10,}/i,
                      explanation: "The compiler will not allow it. (Your answer should contain the word \"no\", \"error\", \"not allowed\", or something like that.)",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 3,
                  title: "Box 3",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /not allowed|wont allow|won't allow/i,
                      explanation: "The compiler will allow it - it repoints the pointer. (Your answer should contain the word \"yes\", \"allowed\".)",
                      points: 0
                    },
                    {
                      pattern: /yes|allow|ok|fine|point.*at|points/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{10,}/i,
                      explanation: "The compiler will allow it - it repoints the pointer. (Your answer should contain the word \"yes\" or \"allowed\".)",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 4,
                  title: "Box 4",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /yes/i,
                      explanation: "It is not possible. (Your answer should contain words such as \"not possible\" or \"impossible\".)",
                      points: 0
                    },
                    {
                      pattern: /no|not|impossible|can't|cant|mismatch|double|error|type/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{10,}/i,
                      explanation: "It is not possible. (Your answer should contain words such as \"not possible\" or \"impossible\".)",
                      points: 0
                    },
                  ]
                },
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/1isxB18kdlY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
        {
          question_id: "lec03_using_pointers",
          title: "Exercise: Using Pointers",
          points: 8,
          mk_description: dedent`
          
            <div class="alert alert-info">
            <strong>Tip</strong>: Drawing memory diagrams is a great way to reason about code. Let's get some practice in now! You'll thank yourself later on some of the more complex projects, and it's also a great way to prep for exams.
            </div>

            Mentally trace this code and draw a memory diagram as you go. Once you're finished, use your diagram to answer the question below. You could click "Simulate" to walk step-by-step through the program and verify your work matches the visual simulation.

            <div style="text-align: center;">
              <iframe class="lobster-iframe" style="height: 725px;" src="assets/using_pointers.html"></iframe>
            </div>
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              What values are printed for each of the expressions sent to \`cout\` at the end of the program?

              \`x\` _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;  \`ptr\` _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`&x\` _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`*&x\` _BLANK______ &nbsp;&nbsp;&nbsp;

              \`y\` _BLANK______ &nbsp;&nbsp;&nbsp;  \`*ptr\` _BLANK______ &nbsp;&nbsp;&nbsp;  \`&ptr\` _BLANK______ &nbsp;&nbsp;&nbsp;  \`&*ptr\` _BLANK______ &nbsp;&nbsp;&nbsp;
            `,
            sample_solution: [
              "3",
              "0x2714",
              "0x2710",
              "3",
              "4",
              "4",
              "0x2718",
              "0x2714",
            ],
            default_grader: {
              grader_kind: "manual_regex_fill_in_the_blank",
              rubric: [
                {
                  blankIndex: 1,
                  title: "Box 1",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /3|three|tree/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 2,
                  title: "Box 2",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /2714|&\s*y/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 3,
                  title: "Box 3",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /2710|&\s*x/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 4,
                  title: "Box 4",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /3|three|tree/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 5,
                  title: "Box 5",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /4|four|for|fore/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 6,
                  title: "Box 6",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /4|four|for|fore/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 7,
                  title: "Box 7",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /2718|&\s*ptr/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 8,
                  title: "Box 8",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /2714|&\s*y/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>
              \`x\` <input type="text" size="5" value="3" readonly</input> &nbsp;&nbsp;&nbsp;&nbsp;  \`ptr\` <input type="text" size="5" value="0x2714" readonly</input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`&x\` <input type="text" size="5" value="0x2710" readonly</input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`*&x\` <input type="text" size="5" value="3" readonly</input> &nbsp;&nbsp;&nbsp;

              \`y\` <input type="text" size="5" value="4" readonly</input> &nbsp;&nbsp;&nbsp;  \`*ptr\` <input type="text" size="5" value="4" readonly</input> &nbsp;&nbsp;&nbsp;  \`&ptr\` <input type="text" size="5" value="0x2718" readonly</input> &nbsp;&nbsp;&nbsp;  \`&*ptr\` <input type="text" size="5" value="0x2714" readonly</input> &nbsp;&nbsp;&nbsp;
            </details>
          `,
        }
      ],
    },
    {
      section_id: "section_03_6",
      title: "Pointer Debrief",
      mk_description: dedent`
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/tZvFm_4y674" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
      ],
    },
    {
      section_id: "section_03_9",
      title: "Expression Value Categories",
      mk_description: dedent`
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/csA_EDJ1sEo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec03_value_categories",
          points: 5,
          mk_description: dedent`
            Which of the following are true about **expression value categories** in C++?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "An lvalue is an expression that yields an object at some memory location.",
              "An lvalue may appear on the left hand side of an assignment.",
              "An lvalue may appear on the right hand side of an assignment.",
              "An rvalue may appear on the left hand side of an assignment.",
              "An rvalue may appear on the right hand side of an assignment.",
            ],
            multiple: true,
            sample_solution: [0, 1, 2, 4],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
                {points: 1, selected: true},
                {points: 1, selected: true},
                {points: 1, selected: true},
                {points: 1, selected: false},
                {points: 1, selected: true},
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>

              <input type="text" size="8" value="true" readonly</input> An lvalue is an expression that yields an object at some memory location.
              
              <input type="text" size="8" value="true" readonly</input> An lvalue may appear on the left hand side of an assignment.
              
              <input type="text" size="8" value="true" readonly</input> An lvalue may appear on the right hand side of an assignment.
              
              <input type="text" size="8" value="false" readonly</input> An rvalue may appear on the left hand side of an assignment.
              
              <input type="text" size="8" value="true" readonly</input> An rvalue may appear on the right hand side of an assignment.
            </details>
          `,
        }
      ],
    },
  ],
};