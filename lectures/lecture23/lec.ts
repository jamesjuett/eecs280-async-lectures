import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const EXCEPTIONS : Omit<ExamSpecification, "exam_id"> = {
  title: "Error Handling and Exceptions",
  mk_intructions: `
<div markdown=1 class="alert alert-info">
This lecture covers error handling, with a primary focus on mechanisms for communicating information about an error detected in one part of your code to the rest of the program where there is sufficient context to decide how to handle the problem.

In many modern programming languages, **exceptions** are the tool of choice to connect error detection and handling. We'll take a look at the basics of exception handling in C++.
<div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Winter 2025</div>
</div>
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
      section_id: "section_22_1",
      title: "Error Detection and Handling",
      mk_description: dedent`
        When something unexpected happens in our program, we're often faced with a challenge - the part of the code that is able to first detect the problem is often ill-equipped to actually figure out what should be done. So, we need a strategy to communicate information about the error to the rest of the program, perhaps a \`main\` function, that can make a decision about what to do next.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/W9okMw8jJhc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_22_2",
      title: "Throwing and Catching Exceptions",
      mk_description: dedent`
        Exceptions are the primary mechanism for error handling in C++ and many modern programming languages. As we'll see, they generally have a few desirable properties:
        - **An "uncaught" (i.e. not handled) exception results in a program crash.** This is nice, because it's deterministic behavior and easy to notice, rather than the program randomly giving a wrong result or encountering other undefined behavior.
        - Code for **handling exceptional cases is separated out from normal code** using different language constructs. This generally makes programs easier to read and understand.
        - The language supports **responding to different kinds of errors in different ways**.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/I82BmrCVg6E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_exception_throw_catch",
          points: 1,
          mk_description: dedent`
Trace through this code, which may throw/catch exceptions. What is printed?
<table style="border: none;">
  <tr>
    <td style="padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
class GoodbyeError { };
void goodbye() {
  cout << "goodbye called. ";
  GoodbyeError e; throw e;
  cout << "goodbye returns. ";
}

class HelloError { };
void hello() {
  cout << "hello called. ";
  goodbye();
  throw HelloError();
  cout << "hello returns. ";
}
\`\`\`
    </div>
    </td>
    <td>
\`\`\`cpp
int main() {
  try {
    hello();
    cout << "done. ";
  }
  catch (const HelloError &h) {
    cout << "caught hello. ";
  }
  catch (const GoodbyeError &g) {
    cout << "caught goodbye. ";
  }
  cout << "main returns.";
}
\`\`\`
    </td>
  </tr>
</table>
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "hello called. goodbye called. hello returns. caught hello. main returns.",
              "hello called. goodbye called. caught goodbye. done. main returns.",
              "hello called. goodbye called. done. caught goodbye. main returns.",
              "hello called. goodbye called. caught goodbye. main returns.",
            ],
            multiple: false,
            sample_solution: [3],
            default_grader: {
              grader_kind: "simple_multiple_choice",
              correct_index: 3,
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/OVqRSThCJj4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `,
        },
      ],
    },
    
    {
      section_id: "section_22_3",
      title: "Exceptions in Interface Specification",
      mk_description: dedent`
        Exceptions play an important role in interface specification - if an "exceptional" situation occurs (e.g. an invalid input), the function can't do its job and will throw an exception.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ccfHo05FvW0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec22_drive_thru",
          title: "Exercise: Drive Thru Exceptions",
          points: 1,
          mk_description: dedent`
            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/PSgm5Z0DM8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />

            Here's a copy of the slide with the question from the video:

            <div style="text-align: center">
              <img src="assets/drive_thru.png" style="width: 650px;">
            </div>
            <br />
          `,
          
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Which approach is correct (if any)? Explain your reasoning.
              
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
                      pattern: /(.|\n){15,}/i,
                      explanation: "This is just graded for completion. Make sure to check the walkthrough video if you're not sure about your answer.",
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
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/GFPWeKieQOk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_22_4",
      title: "Exceptions and Program Design",
      mk_description: dedent`

        Let's take a look at several examples of exceptions used in a larger-scale program, which allows us to start to develop an appreciation for the way they can inform program design.
        
        (Pragmatic note: an example of catching a \`csvstream_exception\` is shown early in the video, which may be helpful for your project 5 driver program.)

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/jdcMNdjXYzE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
};