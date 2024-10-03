import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_11 : ExamSpecification = {
  exam_id: "f24_lec_11",
  title: "Containers and Iterators",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">
      So far, we've covered a lot of the fundamental tools C++ gives us, as well as some general principles of good programming design, in particular including the design of Abstract Data Types (ADTs).
      
      We'll now look at various **Container ADTs**, which allow us to store and organize collections of other objects. Using container ADTs from the C++ standard library as examples:
      
      - A \`std::vector<double>\` could store datapoints for statistical analysis
      - A \`std::set<string>\` could represent uniqnames of students registered for a course
      - A \`std::map<string, double>\` could allow us to look up the price of an item on a menu by providing its name

      <!-- force end of list -->

      If you're not familiar with all these containers, don't worry - we'll introduce each briefly today. throughout the rest of the course.

      You may also have seen that EECS 280 is called "Programming and Introductory Data Structures". We're now entering the **data structures** portion of the course. If a container ADT specifies the _interface_ for organizing information, the underlying _implementation_ is a data structure. We'll consider several possible data structures and their pros/cons for various purposes, including efficiency analysis.
      
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
      section_id: "section_11_1",
      title: "Introduction to Standard Library Containers",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/7ehtdAdEPJg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_2",
      title: "Sequential Containers with Contiguous Allocation",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/kSb09sg_aMo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_3",
      title: "Sequential Containers with Linked Structures",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/xHagPSzCyFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_4",
      title: "Iterator Interfaces and Traversal by Iterator",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/IFmHOY8C6vI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_5",
      title: "The `auto` Keyword",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/01Vhfh_pu18" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_6",
      title: "Range-based `for` Loops",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/kqYju9fcbFA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_7",
      title: "Sets and Maps",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/McLdkrnLwKo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec11_participation_freebie",
          points: 1,
          mk_description: dedent`
            Select the item below for participation credit.
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
  ],
};
