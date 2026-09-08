import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const PROCEDURAL_ABSTRACTION : Omit<ExamSpecification, "exam_id"> = {
  title: "Procedural Abstraction",
  mk_intructions: dedent`

    <div markdown=1 class="alert alert-info">
      In the last lecture, we saw how to define functions in C++ and how they provide an abstract interface (with typed parameters and return value) over a concrete implementation. With this as our fundamental unit, we'll now turn to the effective use of **procedural abstraction**, including organization of larger codebases into modules, precise interface specification, and unit testing to ensure correctness.
      
      Because this is a shorter lecture, we'll also take some time at the end for some frank discussion about the use of generative AI tools in EECS 280, especially some data on learning outcomes and grades for students who use them in course projects (notwithstanding the fact doing so is against course policy).
      
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
      section_id: "section_03_1",
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
      section_id: "section_03_2",
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
      section_id: "section_03_3",
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
      section_id: "section_03_4",
      title: "Unit Testing",
      mk_description: dedent`
        Finally, let's take a bit of time to talk about unit testing. We need to make sure the code we write actually works.
        
        In particular, we'll look at **unit testing** as a strategy for making sure that the implementation we write for a function actually works according to the interface we've decided for it to have. We'll look at some examples and general strategies for writing good tests.
        
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
    {
      section_id: "section_03_5",
      title: "Generative AI in EECS 280",
      mk_description: dedent`
        Finally, a miscellaneous but important topic - the use of generative AI tools to write project code in EECS 280. The quick version: don't do it - you won't learn as much and your grades may reflect this.
        
        But, the long version is worth hearing. And we've been hard at work collecting some pretty fascinating data to back it up.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/KTO_4RVXkpg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Before moving on, I want to reiterate that the use of generative AI tools to write any significant portion of your project code is **prohibited** by EECS 280 course policy. So don't interpret the discussion above as "at your own risk", but more as "it's not allowed, but I also won't pretend it doesn't happen and I want to let you know what we're seeing".
        
      `,
      questions: [
        {
          question_id: "lec_gen_ai_usage_on_projects",
          points: 3,
          mk_description: dedent`
            Which of the following appear to be plausibly true based on our data + analysis of generative AI usage in EECS 280 projects?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Approximately 25-30% of students appear to use generative AI tools to write significant portions of their project code.",
              "Generative AI usage on course projects is associated with significantly lower exam scores and increased likelihood of falling below the exam threshold grade.",
              "We suspect that 10% or more of students in EECS 280 are actually bots.",
              "Nearly 40% of students who use generative AI tools to write significant portions of project code will end up withdrawing or failing to pass the course."
            ],
            multiple: true,
            sample_solution: [0,1,3],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
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
        }
      ],
    },
  ],
};
