import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_07 : ExamSpecification = {
  exam_id: "f24_lec_07",
  title: "Program Design and Debugging",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-danger">

      Thanks to those of you who reached out to let me know the videos don't have any audio. Unfortunately, the issue was with the original recording, so I'll need to redo them... I'll have a re-recorded, fixed version ASAP, though not likely until late Wednesday evening.
      
    </div>
    <div markdown=1 class="alert alert-info">

      This lecture presents a sample program that implements a "Pirate Treasure" game using C-Style ADTs and many of the programming techniques we've seen in the course so far. We also cover several debugging strategies to track down bugs in the program.

      This lecture is shorter than usual - the live lectures are running behind schedule (turns out we tried to pack to much into the first several lectures...) and may not present this material. It's officially considered optional, but you may find the debugging strategies particularly helpful to apply to your own projects. (You can still earn participation credit for this lecture by answering the question following the first section.)

      I didn't get this lecture out as soon as I would have liked, so I've extended the participation deadline until Friday at 11:59pm.
      
      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Fall 2024</div>
      
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
      section_id: "section_07_1",
      title: "Pirate Treasure Program Overview",
      mk_description: dedent`
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/s2UMsHhEMfY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec07_null_character_mc",
          points: 1,
          mk_description: dedent`
            Select one of the answers below for participation credit.
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Select this for participation credit.",
            ],
            multiple: false,
            sample_solution: [0],
            default_grader: {
              grader_kind: "freebie",
              points: 1,
              allow_blanks: false
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
        }
      ],
    },
    {
      section_id: "section_07_2",
      title: "Debugging",
      mk_description: dedent`
        Now, let's look at several debugging strategies applied to the "Pirate Treasure" program.
        
        First, we'll take a look at running the overall \`pirate.exe\` program and \`Game_tests.exe\` unit tests. We encounter and track down a segmentation fault using a visual debugger.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/RJ-guj0rqIs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Next, we'll take a look at some defensive programming techniques, including using assertions, to detect bugs earlier and make them easier to fix.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/a0SrDPXWscc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Finally, we'll get more information about what exactly the program is doing by adding breakpoints and using print statements so that we can figure out what is happening to cause the last few bugs.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/qobgGlBx01Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
};