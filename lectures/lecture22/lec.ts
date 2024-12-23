import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const BINARY_SEARCH_TREES : Omit<ExamSpecification, "exam_id"> = {
  title: "Binary Search Trees, Sets, and Maps",
  mk_intructions: `
<div markdown=1 class="alert alert-info">
This lecture covers **Binary Search Trees (BSTs)**, which are a special kind of binary tree that maintains a sorting invariant on its elements. It combines the advantages of a sorted array (i.e. fast lookup with binary search) with the flexibility of a linked list (i.e. efficient insert/remove operations anywhere in the data structure).

BSTs are the foundation of "industry-strength" implementations of several application-oriented data structures, including sets and maps. We'll particularly focus on maps, since we haven't discussed them previously and they are a key part of project 5 in EECS 280.

</div>
<div class="alert alert-secondary" role="alert" markdown="1">
<h5><span class="badge badge-success">Fall 2024</span></h5>
In some of the videos for this lecture, I might refer to implementing a binary search tree or map in project 5. That's project 6 this term.
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
      section_id: "section_21_1",
      title: "Intro to Binary Search Trees",
      mk_description: dedent`

        In essence, a binary search tree is a regular binary tree where each node's left subtree contains lower values and right subtree contains higher values. Let's take a look at some specifics as well as the reason this leads to efficient performance.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/8w_0IkymhhY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_21_2",
      title: "Recursive Functions on BSTs",
      mk_description: dedent`

        We can work with binary search trees using a similar recursive approach to regular binary trees, except that we can make an informed decision about which subtree to explore based on the sorting invariant.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/dBZQHTba1Ps" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec21_bst_contains",
          title: "Exercise: \`bst_contains()\`",
          points: 1,
          mk_description: dedent`
            Implement the \`bst_contains()\` function, introduced at the end of the video above.
          `,
          response: {
            kind: "iframe",
            src: "assets/bst_contains.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
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
            You're welcome to check your solution with this **walkthrough** video.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/KH2OQcbJAoM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_21_3",
      title: "BST Implementation on Project 6",
      mk_description: dedent`

        It's also worth a bit of time to take a look at how a binary search tree could be realized as a C++ class, including some of the specifics for the implementation you'll work with in EECS 280 project 6. (Sorry - I recorded this video last year, when it was project 5.)

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/T-RWJ_-Mt6E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_21_4",
      title: "Building a Set on a BST",
      mk_description: dedent`
        Now, let's turn to some useful data structures implemented via a binary search tree.
        First, we'll consider a BST-based set, which will outperform the other array-based implementations we've seen previously. (Please ignore the references to the classifier application where you use a map... you've already done that this term in project 4.)

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/jSiwdyPCz_A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [],
    },
    {
      section_id: "section_21_5",
      title: "Building a Map on a BST",
      mk_description: dedent`
        In this video, we'll introduce the idea of a map as an associative container where we can store and retrieve *values* according to a particular *key*. Then we'll look at the fundamental approach we could use to implement a map with a BST.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/8cdFFouBjvs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_21_6",
      title: "`Map` Implementation",
      mk_description: dedent`
        Finally, a few practical tips and tricks for \`Map.h\` from project 6.

        Let's take a tour of each component in the \`Map\` class, including the BST member variable (i.e. the "has-a" pattern), the template parameters, and a custom comparator to compare key-value pairs in the BST based on the keys only.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Feou0OEHEPQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        
        Here's also an overview of what each of the three main \`Map\` functions (\`find\`, \`insert\`, and \`operator[]\`) should do. You'll use each in various places thoughout the project 6 driver.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/DlBMShisMkQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
};