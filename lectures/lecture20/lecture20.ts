import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_20 : ExamSpecification = {
  exam_id: "lec_20_structural_recursion",
  title: "Structural Recursion",
  mk_intructions: `
<div markdown=1 class="alert alert-info">
Recursion is well-suited for problems that have an intrinsic **recursive structure**. This also applies directly for many data structures, including **linked lists** (which we've seen before) and **trees** (which we introduce today). It will also turn out that for some operations, a recursive approach is natural while an iterative approach requires significant additional work.

By the way, I want to give a big thanks to **Ashvin**, who recorded walkthrough videos for this lecture.
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
  sections: [
    {
      section_id: "section_20_1",
      title: "Recursion on Linked Lists",
      mk_description: dedent`

        As an initial example, let's consider the recursive structure implicit in a linked list as well as strategies for recursively processing the data stored in the list.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/oLDv_mYmvGc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec20_recursive_list_functions",
          title: "Exercise: Recursive List Functions",
          points: 3,
          mk_description: dedent`

            <table class="table w-auto">
              <tr>
                <td style="border: none;">
                  Determine base cases and recurrence relations for the list functions below. Some portions are already given to help you get started. Use the abstract terms in the picture at right, but don't worry too much about precise notation.
                  <br />
                  <br />
                  This exercise is challenging! Recursion is a totally different kind of thinking than we use in our normal lives. We promise it gets easier. If you get stuck, check the walkthrough video.
                </td>
                <td style="border: none;">
                  <img src="assets/list_abstract.png" style="width: 200px;">
                </td>
              </tr>
            </table>
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              **\`length(list)\`**  
              Finds the number of elements in \`list\`.

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b>
                  </td>
                  <td>
                    <div style="height: 5em; border: solid 1px #ccc; width: 100%; margin: 2px 3px; padding: 0.25em; font-family: monospace; color: #333;">
                      if empty, length(list) = 0
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    <div style="height: 5em; border: solid 1px #ccc; width: 100%; margin: 2px 3px; padding: 0.25em; font-family: monospace; color: #333;">
                      length(list) = 1 + length(rest)
                    </div>
                  </td>
                </tr>
              </table>

              <br />
              **\`sum(list)\`**  
              Finds the sum of element values in \`list\`.

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
              </table>

              <br />
              **\`last(list)\`**  
              Finds the last element in \`list\`.<br />
              \`REQUIRES:\` \`list\` is not empty

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b>
                  </td>
                  <td>
                    <div style="height: 5em; border: solid 1px #ccc; width: 100%; margin: 2px 3px; padding: 0.25em; font-family: monospace; color: #333;">
                      if rest is empty, last(list) = x<br />
                      (Base case is a single element list)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
              </table>

              <br />
              **\`count(list, n)\`**  
              Finds the number of times \`n\` appears in \`list\`.

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b><br />
                    <span style="font-style: italic;">Hint: Use an if-else here!</span>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
              </table>

              <br />
              **\`max(list)\`**  
              Finds the largest value in \`list\`.<br />
              \`REQUIRES:\` \`list\` is not empty<br />
              <span style="font-style: italic;">Hint: Use a helper function \`max(int,int)\`</span>


              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
              </table>
            `
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/qj1c_BU3EBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_20_2",
      title: "Coding Recursive List Functions",
      mk_description: dedent`

        Next, we'll take a quick look at coding up an implementation of a recursive list function. As usual, we primarily follow the conceptual base case and recurrence relation we've already worked out, but there are a few more details to consider once we get to the actual code.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ybgmPmWsgf0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec20_list_max",
          title: "Exercise: Coding \`list_max()\`",
          points: 3,
          mk_description: dedent`
            Implement the \`list_max()\` function based on the base case and recurrence relation from earlier.
          `,
          response: {
            kind: "iframe",
            src: "assets/list_max.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/3H6qPjwzwXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_20_3",
      title: "Recursion on Trees",
      mk_description: dedent`

        Now, let's take a look at a new data structure, the binary tree. It turns out that binary trees underly many of the most efficient implementations of a variety of data structures, including sets and maps, which we'll talk about next time.
        
        Because trees are also a naturally recursive data structure, we'll apply recursion here as well.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/4XJgvfQsvwo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec20_recursive_tree_functions",
          title: "Exercise: Recursive Tree Functions",
          points: 3,
          mk_description: dedent`

            <table class="table w-auto">
              <tr>
                <td style="border: none;">
                  Determine base cases and recurrence relations for the tree functions below. Some portions are already given to help you get started. Use the abstract terms in the picture at right, but don't worry too much about precise notation.
                  <br />
                  <br />
                  This exercise is challenging! Recursion is a totally different kind of thinking than we use in our normal lives. We promise it gets easier. If you get stuck, check the walkthrough video.
                </td>
                <td style="border: none;">
                  <img src="assets/tree_abstract.png" style="width: 200px;">
                </td>
              </tr>
            </table>
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              **\`size(tree)\`**  
              Finds the number of elements in \`tree\`.

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b>
                  </td>
                  <td>
                    <div style="height: 5em; border: solid 1px #ccc; width: 100%; margin: 2px 3px; padding: 0.25em; font-family: monospace; color: #333;">
                      if empty, size(tree) = 0
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    <div style="height: 5em; border: solid 1px #ccc; width: 100%; margin: 2px 3px; padding: 0.25em; font-family: monospace; color: #333;">
                      size(tree) = 1 + size(left) + size(right)
                    </div>
                  </td>
                </tr>
              </table>

              <br />
              **\`height(tree)\`**  
              Finds the height of \`tree\`.<br />
              <span style="font-style: italic;">Hint: Use a helper function \`max(int,int)\`</span>

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
              </table>

              <br />
              **\`sum(tree)\`**  
              Finds the sum of element values in \`tree\`.

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
              </table>

              <br />
              **\`num_leaves(tree)\`**  
              Finds the number of leaf nodes in \`tree\`.

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b><br />
                    <span style="font-style: italic;">Hint: there are two base cases here!</span>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    <div style="height: 5em; border: solid 1px #ccc; width: 100%; margin: 2px 3px; padding: 0.25em; font-family: monospace; color: #333;">
                      num_leaves(tree) = num_leaves(left) + num_leaves(right)
                    </div>
                  </td>
                </tr>
              </table>

              <br />
              **\`contains(tree, n)\`**  
              Returns true if \`tree\` contains the value \`n\`, and false otherwise.

              <table style="width: 100%; border: none;">
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Base Case</b><br />
                    <span style="font-style: italic;">Hint: there are two base cases here!</span>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
                <tr>
                  <td style="width: 175px; text-align: right;">
                    <b>Recurrence Relation</b>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
              </table>
            `
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/GggjCqNt9eU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_20_4",
      title: "Coding Recursive Tree Functions",
      mk_description: dedent`
        Let's take a look at a specific representation of trees in code, using a \`Node\` structure much like we had used for linked lists. We'll also work through a quick example of code that processes a tree recursively.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/OinWaXbmkm0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec20_tree_height",
          title: "Exercise: Coding \`tree_height()\`",
          points: 3,
          mk_description: dedent`
            Implement the \`tree_height()\` function based on the base case and recurrence relation from earlier. Note that \`max()\` helper function provided.
          `,
          response: {
            kind: "iframe",
            src: "assets/tree_height.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/aPbU04V-87Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_20_5",
      title: "Tree Traversals",
      mk_description: dedent`
        To traverse and process each element in the tree, there are several possible orderings. (Contrast this to a linear data structure like a linked list where there is only one straightforward traversal.)

        Let's take a look at each:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/7bd-YBzEj7o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Here's a copy of the slide with all the traversals:

        <div style="text-align: center">
          <img src="assets/tree_traversals.png" style="width: 600px;">
        </div>
        <br />

      `,
      questions: [],
    },
    {
      section_id: "section_20_6",
      title: "Types of Recursion",
      mk_description: dedent`
        Finally, let's take a look at several qualitatively different kinds of recursion we've seen so far. Generally, the distinguishing factors are the number and placement of the recursive calls.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/veFwW_oDpd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [],
    },
  ],
};