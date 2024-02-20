import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_12 : ExamSpecification = {
  exam_id: "lec_12_containers_2",
  title: "Sorted vs. Unsorted Data Structures, Templates",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">
      Continuinddg from last time, we'll introduce the notion of **time complexity** to formally analyze the efficiency of operations on the unsorted array-based implementation of a set. Spoiler alert - we'll find this implementation is a bit slow.
      
      This leads us to consider another potential implementation of a set, this time based on an underlying array that is kept in sorted order. The addition of a sorting invariant means some of our functions are more complicated (i.e. you can't just put elements wherever), but searching for elements in the array can be done much more efficiently.

      Finally, it makes sense to introduce **templates** as a miscellaneous topic here. In particular, templates can be used to implement generic containers with flexible element types (e.g. \`set<int>\` and \`set<string>\`). Generally speaking, they also complete our exploration (started a few lectures ago) of different kinds of polymorphism.
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
    <script>
    alert('Due to an issue with authentication, you may see a "Server Error" after finishing the lecture exercises. If so, or if you do not see "Completion Verified" after finishing all exercises, please try signing in again manually (click the button with your username near the top left). If that doesn't work, try refreshing the page. Apologies for the inconvenience!');
    </script>
  `,
  mk_questions_message: MK_QUESTIONS_MESSAGE,
  mk_bottom_message: MK_BOTTOM_MESSAGE,
  mk_download_message: MK_DOWNLOAD_MESSAGE,
  mk_saver_message: MK_SAVER_MESSAGE,
  assets_dir: __dirname + `/assets`,
  allow_clientside_content: true,
  sections: [
    {
      section_id: "section_12_1",
      title: "Time Complexity",
      mk_description: dedent`
        As we're asessing the fitness of a data structure for a given task, it's helpful to determine its **time complexity**, which quantifies how well it performs as the size of the data we're working with scales up.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/sOC4Nizvh4I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec12_time_complexity",
          title: "Exercise: Time Complexity",
          points: 6,
          mk_description: dedent`
            Below are several implementations of functions for the unsorted \`IntSet\` from last time. Determine whether each function has _O(1)_ constant time complexity or _O(n)_ linear time complexity. Explain your reasoning. 
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
// IntSet constructor
IntSet::IntSet()
  : elts_size(0) { }
  \`\`\`
    </div>
    </td>
    <td>
    <div>
      [[BOX
      
      ]]
    </div>
    </td>
  </tr>
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
IntSet::size() {
  return elts_size;
}
\`\`\`
    </div>
    </td>
    <td>
    <div>
      [[BOX
      
      ]]
    </div>
    </td>
  </tr>
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int IntSet::indexOf(int v) const {
  for (int i = 0; i < elts_size; ++i) {
    if (elts[i] == v) {
        return i;
    }
  }
  return -1;
}
\`\`\`
    </div>
    </td>
    <td>
    <div>
      [[BOX
      
      ]]
    </div>
    </td>
  </tr>
  
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
bool IntSet::contains(int v) const {
  return indexOf(v) != -1;
}
\`\`\`
    </div>
    </td>
    <td>
    <div>
      [[BOX
      
      ]]
    </div>
    </td>
  </tr>
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
void IntSet::insert(int v) {
  assert(size() < ELTS_CAPACITY);
  if (contains(v)) {
    return;
  }
  elts[elts_size] = v;
  ++elts_size;
}
\`\`\`
    </div>
    </td>
    <td>
    <div>
      [[BOX
      
      ]]
    </div>
    </td>
  </tr>
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
void IntSet::remove(int v) {
  if (!contains(v)) {
    return;
  }
  elts[indexOf(v)] = elts[elts_size - 1];
  --elts_size;
}
\`\`\`
    </div>
    </td>
    <td>
    <div>
      [[BOX
      
      ]]
    </div>
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
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "The implementation has constant time complexity. Check the walkthrough video for details.",
                      points: 0
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
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "The implementation has constant time complexity. Check the walkthrough video for details.",
                      points: 0
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
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "The implementation has linear time complexity. Check the walkthrough video for details.",
                      points: 0
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
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "The implementation has linear time complexity. Check the walkthrough video for details.",
                      points: 0
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
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "The implementation has linear time complexity. Check the walkthrough video for details.",
                      points: 0
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
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "The implementation has linear time complexity. Check the walkthrough video for details.",
                      points: 0
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/LU8JMGBOLBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_12_2",
      title: "A Sorted \`IntSet\`",
      mk_description: dedent`

        Let's make a key change to the fundamental strategy and data representation for our set - keeping all the elements in sorted order - and see if we can improve the performance of the data structure...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/-ljA2Ecmn74" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec12_sortedintset_insert",
          title: "Exercise: \`SortedIntSet::insert()\`",
          points: 1,
          mk_description: dedent`
            Implement the \`insert()\` member function for the \`SortedIntSet\` class. If the given value is not already in the set, it should be inserted into the \`elts\` array at the appropriate position to maintain the sorting invariant. Elements greater than the inserted value will need to be shifted to the right to create the space to insert the element. \`elts_size\` should also increase by 1. However, if the value is already in the array, \`insert()\` does nothing.

            The \`main()\` function provided includes testing code to verify your implementation.
          `,
          response: {
            kind: "iframe",
            src: "assets/sortedintset_insert.html",
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
            You're welcome to check your solution with this **walkthrough** video:

            **Note:** This walkthrough uses several different files for the code, which is different than the above, where we had everthing embedded into one file. (The solution for \`insert()\` is the same, though!)

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/TR4nYlsL74g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_12_3",
      title: "Templates",
      mk_description: dedent`

        Finally, let's use **templates** to implement a generic set container with a flexible element type.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/vQRn75mtf0w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec12_fillFromArray",
          title: "Exercise: \`fillFromArray()\` Function Template",
          points: 4,
          mk_description: dedent`
            Fill in the blanks to make the function work as intended (the \`main\` function shows examples).
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              \`\`\`cpp
              template <_BLANK_______________________________>
              void fillFromArray(_BLANK_______________________________ set, _BLANK_______________________ arr, int n) {
                for (int i = 0; i < n; ++i) {
                  _BLANK_______________________________
                }
              }
              int main() {
                UnsortedSet<int> set1;
                int arr1[4] = { 1, 2, 3, 2 };
                fillFromArray(set1, arr1, 4); // set1 now contains 1, 2, 3
                UnsortedSet<char> set2;
                char arr2[3] = { 'a', 'b', 'a' };
                fillFromArray(set2, arr2, 3); // set2 now contains 'a', 'b'
              }
              \`\`\`
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
                      pattern: /^\s*(typename|class)\s+[a-zA-Z0-9_]+\s*$/i,
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
                      pattern: /int/i,
                      explanation: "Make sure not to hardcode `<int>` on the `UnsortedSet`. Instead, plug in the type from your template parameter.",
                      points: 0
                    },
                    {
                      pattern: /^\s*UnsortedSet\s*<\s*[a-zA-Z0-9_]+\s*>\s*&\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /^\s*UnsortedSet\s*&\s*<\s*[a-zA-Z0-9_]+\s*>\s*$/i,
                      explanation: "Almost! Your `&` is misplaced.",
                      points: 0
                    },
                    {
                      pattern: /^\s*UnsortedSet\s*<\s*[a-zA-Z0-9_]+\s*>\s*$/i,
                      explanation: "Make sure to pass the `UnsortedSet` by reference to ensure elements are actually added to the original (not just to a local copy).",
                      points: 0
                    },
                    {
                      pattern: /^\s*UnsortedSet\s*$/i,
                      explanation: "The UnsortedSet parameter will need to specify the element type as well, i.e. `UnsortedSet<____>` with the `____` replaced by your template parameter.",
                      points: 0
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
                      pattern: /int/i,
                      explanation: "Make sure not to hardcode `int` as the element type of the array. Instead, use the type from your template parameter.",
                      points: 0
                    },
                    {
                      pattern: /^\s*const\s*[a-zA-Z0-9_]+\s*\*\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /^\s*[a-zA-Z0-9_]+\s*const\s*\*\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /^\s*[a-zA-Z0-9_]+\s*\*\s*$/i,
                      explanation: "The element type should be const qualified here since the function does not modify the source array.",
                      points: 0
                    },
                    {
                      pattern: /\[.*\]/i,
                      explanation: "Given the placement of the fill-in-the-blank boxes, you'll need to pass the array parameter by pointer (recall that all arrays are ultimately passed this way due to array decay).",
                      points: 0
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
                      pattern: /.*insert.*arr.*i/i,
                      explanation: "Correct!",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/7tyRQjYejw0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
  ],
};