import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const RECURSION : Omit<ExamSpecification, "exam_id"> = {
  title: "Recursion and Tail Recursion",
  mk_intructions: `
<div markdown=1 class="alert alert-info">
Today, we'll look at a fundamentally new way of developing algorithms and writing code using **recursion**.

Recursion occurs when a function that calls itself. It's a bit hard to describe why this is useful until you get a feel for it, but here's two high level points that eventually resonate:

- Recursion offers a different approach to "repetition" in code without using loops. Perhaps surprisingly, this can be more intuitive for some problems.
- Recursion allows us to model the self-similar structure that naturally exists in many interesting problems and data structures.
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
      section_id: "section_19_1",
      title: "Introduction to Recursion",
      mk_description: dedent`

        To start, let's take a look at the basic mechanism by which a function can call itself recursively and a quick example of where this is actually useful.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/XU33Xp1yXWk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_19_2",
      title: "Solving Problems with Recursion",
      mk_description: dedent`

        Here we'll try to build build an understanding of what sorts of problems are approachable using a recursive approach, how to extract a recurrence relation from a problem definition, and how to turn that into code.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/mc16okENpfs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec19_ducks_1",
          title: "Exercise: Counting Ducks, Part 1",
          points: 1,
          mk_description: dedent`

            Here's a copy of the duck exercise slide from the previous video:

            <div style="text-align: center">
              <img src="assets/ducks_exercise.png" style="width: 600px;">
            </div>
            <br />
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              We already know the value of $$ducks(0)$$ is $$5$$, because that's the number of ducklings we start with (i.e. "after 0 months").

              Write a recurrence relation for the number of ducks after $$n$$ months, $$ducks(n) = ~ ???$$. Your recurrence should depend on the value(s) of the two previous months, e.g. $$ducks(n-1)$$ and $$ducks(n-2)$$.

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
            The walkthrough for this exercise is included with the walkthrough video for the second exercise below.
          `
        },
        
        {
          question_id: "lec19_ducks_2",
          title: "Exercise: Counting Ducks, Part 2",
          points: 1,
          mk_description: dedent`
            Translate your recurrence relation from Part 1 to code.
          `,
          response: {
            kind: "iframe",
            src: "assets/ducks.html",
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

            Note that this video covers BOTH part 1 and part 2 of the exercise. If you're here for part 1, you can pause partway through and come back.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/lYcApEDtQX4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_19_3",
      title: "Reversing an Array with Recursion",
      mk_description: dedent`

        Let's consider an example of using recursion to processing a data structure - reversing an array.
        
        We could do this iteratively with a loop, but what does it look like using recursion?

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/GmNvmhOGeDo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec19_array_reverse_1",
          title: "Exercise: Recursive Array Reverse, Part 1",
          points: 3,
          mk_description: dedent`

            Let's do a bit of brainstorming to come up with a recursive algorithm.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              What base case could we use for reversing an array? What's the "simplest" possible array? What do you need to do to reverse it (if anything)?

              [[BOX
              
              
              ]]

              What "subarray" would you reverse using the "recursive leap of faith"?

              [[BOX
              
              
              ]]

              What do you need to do to finish the problem, assuming the subarray is reversed successfully?

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
                      pattern: /(.|\n){5,}/i,
                      explanation: "This is just graded for completion. Make sure to check the walkthrough video if you're not sure about your answer.",
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
                      pattern: /(.|\n){5,}/i,
                      explanation: "This is just graded for completion. Make sure to check the walkthrough video if you're not sure about your answer.",
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
                      pattern: /(.|\n){5,}/i,
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
            You're welcome to check your solution with this **walkthrough** video.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/3X7hruWsXJI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
        
        {
          question_id: "lec19_array_reverse_2",
          title: "Exercise: Recursive Array Reverse, Part 2",
          points: 1,
          mk_description: dedent`
            Translate your recurrence relation from Part 1 to code.
          `,
          response: {
            kind: "iframe",
            src: "assets/array_reverse.html",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/hLCJO2VdiMo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_19_4",
      title: "Tail Recursion",
      mk_description: dedent`

        It turns out that recursion can be less memory-efficient than iteration in some cases due to a proliferation of stack frames. Let's take a look at a strategy called **tail recursion** that allows the compiler to perform optimizations to eliminate the inefficiency (in some cases).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ioW9LOCr00o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        In some cases, like the tail-recursive \`reverse()\` implementation, there's a natural approach to solve the problem using tail recursion. In other cases, like for \`factorial()\`, a more deliberate approach is necessary, including additional work to "pass a computed result forward" rather than computing a result as the call stack unwinds. Here's an example of an alternate approach that involves an extra accumlator parameter to implement a tail-recursive \`factorial()\` function.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/hqHgiKwEF9o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
};