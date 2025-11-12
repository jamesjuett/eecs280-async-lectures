import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const STRUCTURAL_RECURSION : Omit<ExamSpecification, "exam_id"> = {
  title: "Structural Recursion",
  mk_intructions: `
<div markdown=1 class="alert alert-info">
Recursion is well-suited for problems that have an intrinsic **recursive structure**. This also applies directly for many data structures, including **linked lists** (which we've seen before) and **trees** (which we introduce today). It will also turn out that for some operations, a recursive approach is natural while an iterative approach requires significant additional work.

<div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Fall 2025</div>
</div>
</div>

<div>
<p>
Before we get started, I want to share with all of you some thoughts on recent changes to U of M programs and policies. Below is a brief video from a lecture near the end of the Winter 2025 term. The content is still relevant, and I hope you may take a moment to reflect and consider your own values and perspective.
<div style="text-align: center;">
<iframe class="lec-video" src="https://www.youtube.com/embed/18Da82iITr0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<br />
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
      section_id: "section_20_1",
      title: "Recursion on Linked Lists",
      mk_description: dedent`

        As an initial example, let's consider the recursive structure implicit in a linked list as well as strategies for recursively processing the data stored in the list.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/_nb3TaK3grk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec20_recursive_list_functions",
          title: "Exercise: Recursive List Functions",
          points: 7,
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
                {
                  blankIndex: 4,
                  title: "Box 4",
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
                  blankIndex: 5,
                  title: "Box 5",
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
                  blankIndex: 6,
                  title: "Box 6",
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
                  blankIndex: 7,
                  title: "Box 7",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/9liMsgq0OfU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
        {
          question_id: "lec20_list_max",
          title: "Exercise: Coding \`list_max()\`",
          points: 1,
          mk_description: dedent`
            Implement the \`list_max()\` function based on the base case and recurrence relation from earlier.
          `,
          response: {
            kind: "iframe",
            src: "assets/list_max.html",
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

            <details>
              <summary>Sample solution...</summary>
              \`\`\`cpp
              // REQUIRES: 'node' must not be null (i.e. the list
              //           starting at 'node' may not be empty)
              // EFFECTS:  Returns the largest element in the list.
              int list_max(Node *node) {
                // (1) base case - hint: take a second look at REQUIRES clause
                if(!node->next) {
                  return node->datum;
                }
                // (2) recursive case
                else {
                  return max(node->datum, list_max(node->next));
                }
              }
              \`\`\`
            </details>
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
          <iframe class="lec-video" src="https://www.youtube.com/embed/OyeEIGJTX80" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/-AG9nsVV4P4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec20_recursive_tree_functions",
          title: "Exercise: Recursive Tree Functions",
          points: 7,
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
                {
                  blankIndex: 4,
                  title: "Box 4",
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
                  blankIndex: 5,
                  title: "Box 5",
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
                  blankIndex: 6,
                  title: "Box 6",
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
                  blankIndex: 7,
                  title: "Box 7",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/5vfT6JSnWNw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
        {
          question_id: "lec20_tree_height",
          title: "Exercise: Coding \`tree_height()\`",
          points: 1,
          mk_description: dedent`
            Implement the \`tree_height()\` function based on the base case and recurrence relation from earlier. Note that \`max()\` helper function provided.
          `,
          response: {
            kind: "iframe",
            src: "assets/tree_height.html",
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

            <details>
              <summary>Sample solution...</summary>
              \`\`\`cpp
              // REQUIRES: 'node' must be a binary search tree
              // EFFECTS: Returns the height of the tree rooted at 'node'.
              int tree_height(Node *node) {
                if(!node) {
                  return 0;
                }
                return 1 + max(tree_height(node->left), tree_height(node->right));
              }
              \`\`\`
            </details>
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
      questions: [
        {
          question_id: "lec20_recursion_kinds_1",
          points: 1,
          mk_description: dedent`
            Consider this function. What kind of recursion does it use?

            \`\`\`cpp
            int sum(int n) {
              if (n == 0) {
                return 0;
              }
              return n + sum(n - 1);
            }
            \`\`\`
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Tail recursive",
              "Linear recursive (but not tail recursive)",
              "Tree recursive",
              "Not recursive at all"
            ],
            multiple: false,
            sample_solution: [1],
            default_grader: {
              grader_kind: "simple_multiple_choice",
              correct_index: 1,
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
        },
        {
          question_id: "lec20_recursion_kinds_2",
          points: 1,
          mk_description: dedent`
            Consider this function. What kind of recursion does it use?

            \`\`\`cpp
            void print_list(Node* n) {
              if (!n) {
                return;
              }
              cout << n->datum << endl;
              print_list(n->next);
            }

            \`\`\`
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Tail recursive",
              "Linear recursive (but not tail recursive)",
              "Tree recursive",
              "Not recursive at all"
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
        {
          question_id: "lec20_recursion_kinds_3",
          points: 1,
          mk_description: dedent`
            Consider this function. What kind of recursion does it use?

            \`\`\`cpp
            int fibonacci(int n) {
              if (n <= 1) {
                return n;
              }
              return fibonacci(n - 1) + fibonacci(n - 2);
            }
            \`\`\`
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Tail recursive",
              "Linear recursive (but not tail recursive)",
              "Tree recursive",
              "Not recursive at all"
            ],
            multiple: false,
            sample_solution: [2],
            default_grader: {
              grader_kind: "simple_multiple_choice",
              correct_index: 2,
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