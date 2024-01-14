import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_12 : ExamSpecification = {
  exam_id: "lec_12_containers_2",
  title: "Containers, Part 2 and Templates",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      Continuing from last time, we'll investigate another potential implementation of a set, this time based on an underlying array that is sorted. This ends up affecting the implementations of the functions as well as their efficiency. We'll briefly introduce the notion of **time complexity** to formally analyze efficiency.

      We'll also introduce **templates** as both a specific technique for implementing generic containers with flexible element types (e.g. \`set<int>\` and \`set<string>\`) and generally as another fundamental expression of polymorphism.
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
      section_id: "section_12_1",
      title: "Time Complexity",
      mk_description: dedent`
        As we're asessing the fitness of a data structure for a given task, it's helpful to determine its **time complexity**, which quantifies how well it performs as the size of the data set we're working with scales up.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/sOC4Nizvh4I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec12_time_complexity",
          title: "Exercise: Time Complexity`",
          points: 3,
          mk_description: dedent`
            Below are several implementations of functions for the unsorted \`IntSet\` from last time. Determine whether each function has $$O(1)$$ constant time complexity or $$O(n)$$ linear time complexity. Explain your reasoning. 
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
          points: 3,
          mk_description: dedent`
            Implement the \`insert()\` member function for the \`SortedIntSet\` class. If the given value is not already in the set, it should be inserted into the \`elts\` array at the appropriate position to maintain the sorting invariant. Elements greater than the inserted value will need to be shifted to the right to create the space to insert the element. \`elts_size\` should also increase by 1. However, if the value is already in the array, \`insert()\` does nothing.

            The \`main()\` function provided includes testing code to verify your implementation.
          `,
          response: {
            kind: "iframe",
            src: "assets/sortedintset_insert.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
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
          points: 3,
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
            `
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/Fid4TlI19oI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
  ],
};