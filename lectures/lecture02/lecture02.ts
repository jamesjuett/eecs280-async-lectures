import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_02 : ExamSpecification = {
  exam_id: "lec_02_procedural_abstraction_and_the_call_stack",
  title: "Procedural Abstraction and The Call Stack",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-success">
      <b>Participation credit</b> for async lectures is now automatically recorded once you complete
      the embedded exercises. Take a look at the top left of the page. You'll need to <b>sign in</b> with
      your @umich.edu Google account so that we know it's you.
      
      Completion of individual exercises is tracked the section headers. Look for badges like this: <span style="vertical-align: text-bottom" class="badge badge-success">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
          <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"></path>
          <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"></path>
        </svg>
        <span style="vertical-align: middle;">2.1 Complete</span>
      </span>.

      To earn participation credit, you'll need to complete the lecture within 2 days of the lecture date.
      For lecture 2 (released Wednesday 1/17), that means completing it by <b>Friday 1/19 at 11:59pm</b>.
    </div>

    <div markdown=1 class="alert alert-info">
      This lecture is all about **functions**. We'll look at two complementary perspectives:

      1. Expanding our conceptual model of program execution and memory to include functions and how they are managed on **the call stack**.
      2. Understanding how functions and **procedural abstraction** contribute to good program design.
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
      title: "Intro to Lobster",
      mk_description: dedent`
        Before we start, let me cover a few basics for the Lobster program visualization tool, which we'll use throughout several lecture examples and exercises in the future.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/SyYblfASLlE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        You can find Lobster at [https://lobster.eecs.umich.edu](https://lobster.eecs.umich.edu). However, there are also Lobster exercises embedded directly in these asynchronous lecture documents, and you can just work on them here (your work will be saved along with any other interactive exercises).
      `,
      questions: [ ]
    },
    {
      section_id: "section_02_2",
      title: "Functions and The Call Stack",
      mk_description: dedent`
        
        The memory allocated for each function is generally called an **activation record** or (more commonly) a **stack frame**. Each function takes up a certain amount of memory that depends on how many local variables it may need to store, and this memory is allocated and freed as needed during the program.

        Because of the way that functions call work (i.e. the called function has to finish and return before you can start back up in the original function), it's natural to use a stack to represent the memory frames for each function. Whichever function is called most recently is added to the top of the stack, and will always be removed before any other functions that were already on the stack (this is called the "Last In First Out" or "LIFO" property).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/jT077RVOUgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec02_stack_frames",
          title: "Exercise: Stack Frames",
          points: 3,
          mk_description: dedent`
            Consider the following code. Trace through the code either manually or using the Lobster simulation and answer the questions below.

            <div style="text-align: center;">
              <iframe class="lobster-iframe" style="height: 625px;" src="assets/call_stack.html"></iframe>
            </div>
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Which function has the largest stack frame (in terms of memory use)? How can you tell? Is this a compile-time property or a runtime property?

              [[BOX
              
              
              ]]

              What is the maximum amount of memory on the (call) stack needed by the program at any one given time? Assume an \`int\` takes up 4 bytes, and that the memory to store local \`int\` objects is the only memory used by the program. 

              [[BOX
              
              
              ]]

              How many different stack frames are created for the \`min()\` function throughout the execution of the program?

              [[BOX
              
              
              ]]
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
                      pattern: /min[ _]*[O0]f[ _]*(3|three|tree)/i,
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
                      pattern: /40|forty|fourty/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /10|ten/i,
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
                      pattern: /3|three|tree/i,
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
            You're also welcome to check out this **walkthrough** video where I talk through the questions. 

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/N6e_IA6GaKo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_02_3",
      title: "Parameter Passing",
      mk_description: dedent`
        Two primary mechanisms for parameter passing are pass-by-value and pass-by-reference. Let's take a look at the differences between the two, as well as how they relate to function stack frames.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/xetnP9gQXEY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec02_parameter_passing",
          title: "Exercise: Parameter Passing",
          points: 4,
          mk_description: dedent`
            Consider this code that defines a function with both pass-by-value and pass-by-reference parameters.
            
            <div style="text-align: center;">
              <iframe class="lobster-iframe" style="height: 500px;" src="assets/parameter_passing.html"></iframe>
            </div>
            
            What are the values of each variable at the end of the main function? (You can also use the Lobster simulation to check.)

          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              **\`a\`**: _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp; **\`b\`**: _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;**\`c\`**: _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;**\`d\`**: _BLANK______
            `,
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
                      pattern: /1|one/i,
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
                      pattern: /3|three|tree/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /10|ten/i,
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
                      pattern: /3|three|tree/i,
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
                      pattern: /4|four/i,
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
              <p markdown="1">
              **\`a\`**: 1 &nbsp;&nbsp;&nbsp;&nbsp; **\`b\`**: 3 &nbsp;&nbsp;&nbsp;&nbsp;**\`c\`**: 3 &nbsp;&nbsp;&nbsp;&nbsp;**\`d\`**: 4
              </p>
            </details>
          `,
        }
      ],
    },
    {
      section_id: "section_02_4",
      title: "Procedural Abstraction",
      mk_description: dedent`
        Turning now to our second, higher-level point, how can we use functions to implement effective procedural abstractions that make our code easier to write, understand, and maintain?
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/WVqOirVNBqI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Feedback from former students generally indicates that lab is sometimes where the "real" learning happens. We do the best we can in lecture, but often the hands-on experience in lab is what makes things click.
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
                    {
                      pattern: /10|ten/i,
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
      section_id: "section_02_5",
      title: "Project 1 File Structure",
      mk_description: dedent`
        The file structure in project 1 is a great example of implementing several different modules in our code and using procedural abstractions as the bridge between those modules.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/a26xmgSPE6U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_02_6",
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
      section_id: "section_02_7",
      title: "Unit Testing",
      mk_description: dedent`
        Finally, let's take a bit of time to talk about testing. We need to make sure the code we write actually works.
        
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
    //   section_id: "section_02_8",
    //   title: "System and Regression Testing",
    //   mk_description: dedent`
    //     TODO
    //   `,

    //   questions: [
        
    //   ],
    // },
  ],
};