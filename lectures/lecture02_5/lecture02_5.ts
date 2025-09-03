import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const CATCH_UP_F25 : Omit<ExamSpecification, "exam_id"> = {
  title: "Catch Up Lecture",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">
      Live lectures are running behind and will be finishing up material from lectures 1 and/or 2 today (Wednesday, September 3). It turns out there was just too much material in those lectures. You may have noticed as well if you worked through the async versions! We'll make sure the remaining ones are better calibrated :).
      
      We've adjusted the overall schedule of lectures and will pick up on our usual sequence starting with lecture 3 on Monday, September 8. You're welcome to work ahead if you like, return to review some of the C++ fundamentals from lecture 2, or to take a break and start back up with lecture 3 on Monday.

      Before you go, make sure to scroll down for a quick announcement about the RenewCS mentoring program and a quick question that will earn you participation credit for today.

      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Fall 2025</div>
    </div>
    
    <div markdown=1 class="alert alert-warning">
      <p>
      <b>Switching over from live lecture?</b><br />
      If you're switching to async for lecture 3, take a look back at these sections from previous async lectures to make sure you don't miss anything. Or, you can watch the recordings of live lecture for today to catch up.
      </p>
      <p>
      If you're switching from Doom's live lecture:
      </p>
      <ul>
        <li>Sections 4-10 from async lecture 2</li>
      </ul>
      <p>
      If you're switching from Juett's live lecture:
      </p>
      <ul>
        <li>Sections 9-10 from async lecture 1</li>
        <li>Sections 5-8 and 10 from async lecture 2</li>
        <li>You may also want to try the exercises from sections 3 and 4 in lecture 2</li>
      </ul>
      If you're switching from Kamil's live lecture:
      </p>
      <ul>
        <li>Sections 3-10 from async lecture 2</li>
      </ul>

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
      title: "RenewCS Mentorship and Tutoring Program",
      mk_description: dedent`
        We're sharing an announcement on behalf of the RenewCS:

        <div style="text-align: center;">
          <img src="assets/renew_cs.png" style="width: 600px;">
        </div>
        <br />
        Here's the link from the image above:  
        [https://docs.google.com/forms/d/e/1FAIpQLSc6JtScDiZ8NTTFVOxVPRDEaoBDkvik_hqAK8xnBcYZq9vTuA/viewform](https://docs.google.com/forms/d/e/1FAIpQLSc6JtScDiZ8NTTFVOxVPRDEaoBDkvik_hqAK8xnBcYZq9vTuA/viewform)
      `,
      questions: [],
    },
    {
      section_id: "section_03_2",
      title: "Participation",
      mk_description: "",
      questions: [
        {
          question_id: "lec_catch_up_participation",
          points: 1,
          mk_description: dedent`
            Would you like participation credit for today?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Yes",
              "No",
            ],
            multiple: false,
            sample_solution: [0],
            default_grader: {
              grader_kind: "simple_multiple_choice",
              correct_index: 0,
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
        },
      ],
    },
  ],
};