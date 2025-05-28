import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const SP25_DEBUGGING : Omit<ExamSpecification, "exam_id"> = {
  title: "Program Design and Debugging",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">
      <p>This lecture showcases several debugging strategies applied to bugs added to the "Pokemon" program from lab. Students in the live lecture contributed several bugs and we walked through strategies for finding them. In particular, we focused on the following strategies:</p>
      <ul>
        <li>Running the program and unit tests to find bugs</li>
        <li>Using assertions to detect bugs earlier</li>
        <li>Comparing program output to the sample correct file using the VS code diff tool</li>
        <li>Using print statements to understand what the program is doing</li>
        <li>Using a debugger to inspect variables and memory</li>
        <li>Using a visual debugger to step through the program and find bugs</li>
        <li>Using a debugger to track down the source of a segmentation fault or failed assertion</li>
        <li>Setting conditional breakpoints to stop the program when a certain condition is met</li>
      </ul>
      <p>These strategies are particularly helpful for more complex programs like the project 3 Euchre game.</p>
      <p>Because this lecture is not available ahead of time, I've extended the participation deadline until Friday, May 30 at 11:59pm.</p>

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
      section_id: "section_13_1",
      title: "Debugging Demo",
      mk_description: dedent`

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/zUbdzNLTx3A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        Apologies for the abrupt end to the video - the lecture capture system cuts off a couple minutes early. The remaining part was just taking a look at the specific situation after setting the conditional breakpoint to identify the bug.
      `,
      questions: [
        {
          question_id: "debugging_participation",
          title: "Participation Credit",
          points: 1,
          mk_description: dedent`
            Once you've watched the video, mark the item below to receive participation credit.
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "I watched the video and learned about debugging strategies.",
            ],
            multiple: true,
            sample_solution: [0],
            default_grader: {
              grader_kind: "freebie",
              points: 1,
              allow_blanks: false,
            }
          },
          verifier: {
            verifier_kind: "full_credit",
          },
        }
      ],
    },
  ],
};