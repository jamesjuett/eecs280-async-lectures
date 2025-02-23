import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const SORTED_VS_UNSORTED_DATA_STRUCTURES : Omit<ExamSpecification, "exam_id"> = {
  title: "Sorted Data Structures, Templates",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">
      Continuing from last time, we'll consider another potential implementation of a set, this time based on an underlying array that is kept in sorted order. The addition of a sorting invariant means some of our functions are more complicated (i.e. you can't just put elements wherever), but searching for elements in the array can be done much more efficiently.

      We'll also introduce **templates**, which are a C++ mechanism for compile-time parametric polymorphism and can be used to implement generic containers with flexible element types (e.g. \`set<int>\` or \`set<string>\`).

      But first, we'll cover a few miscellaneous topics that didn't fit in the last lecture:  
      - The difference between the prefix and postfix versions of the \`++\` and \`--\` operators.  
      - Overloading operators with member functions (as opposed to regular, non-member functions).
      <br />
      <br />
      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Winter 2025</div>
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
      title: "Prefix `++` vs. Postfix `++`",
      mk_description: dedent`

        Ever wanted to know the difference between \`++i\` and \`i++\`? Here's the scoop:

                <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/gY3jOra3kZo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [],
    },
    {
      section_id: "section_12_2",
      title: "Member vs. Non-Member Operator Overloads",
      mk_description: dedent`

        You know the only thing cooler than a set ADT? A set ADT with custom operators!

        We'll look at two different examples:
        - \`operator<<\`, which is implemented as a **non-member** function operator overload.
        - \`operator[]\`, which is implemented as a **member** function operator overload.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/8z7QnyRcK0s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec11_intset_operator_plus_equals",
          title: "Exercise: Overloading \`+=\` on \`IntSet\`",
          points: 5,
          mk_description: dedent`
            Let's add a \`+=\` operator to our \`IntSet\` class, which allows a nice syntax for adding elements to the set. Here's an example of how we might use it:

            \`\`\`cpp
            class IntSet {
              // operator+= overload
            };
            int main() {
              IntSet set;
              set += 3;
              set += 5;
              cout << set; // {3, 5}
            }
            \`\`\`

            The \`+=\` operator can be implemented either as a member function overload or a non-member function overload. Consider each of the potential implementations of \`+=\` below. For each, indicate how the \`operator+=\` overload function is being defined (write **"member"** or **"non-member"**) and whether or not it is implemented correctly (write **"correct"** or **"incorrect"**).
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
// Version 1
void operator+=(IntSet &s, int v) {
  s.insert(v);
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
// Version 2
void IntSet::operator+=(int v) {
  this->insert(v);
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
// Version 3
void IntSet::operator+=(IntSet &s, int v) {
  s.insert(v);
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
// Version 4
void operator+=(IntSet &s, int v) {
  this->insert(v);
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
// Version 5
void IntSet::operator+=(int v) {
  insert(v);
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
                      pattern: /incorrect/i,
                      explanation: "`operator+=` is being implemented as a non-member function. The implementation is correct.",
                      points: 0
                    },
                    {
                      pattern: /non\s*-?\s*member.*correct|correct.*non\s*-?\s*member/i,
                      explanation: "`operator+=` is being implemented as a non-member function. The implementation is correct.",
                      points: 1
                    },
                    {
                      pattern: /.{12,}/i,
                      explanation: "`operator+=` is being implemented as a non-member function. The implementation is correct.",
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
                      pattern: /non\s*-?\s*member|incorrect/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is correct.",
                      points: 0
                    },
                    {
                      pattern: /member.*correct|correct.*member/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is correct.",
                      points: 1
                    },
                    {
                      pattern: /.{12,}/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is correct.",
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
                      pattern: /non\s*-?\s*member/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is incorrect.",
                      points: 0
                    },
                    {
                      pattern: /member.*incorrect|incorrect.*member/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is incorrect.",
                      points: 1
                    },
                    {
                      pattern: /.{12,}/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is incorrect.",
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
                      pattern: /non\s*-?\s*member.*incorrect|incorrect.*non\s*-?\s*member/i,
                      explanation: "`operator+=` is being implemented as a non-member function. The implementation is incorrect.",
                      points: 1
                    },
                    {
                      pattern: /.{12,}/i,
                      explanation: "`operator+=` is being implemented as a non-member function. The implementation is incorrect.",
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
                      pattern: /non\s*-?\s*member|incorrect/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is correct.",
                      points: 0
                    },
                    {
                      pattern: /member.*correct|correct.*member/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is correct.",
                      points: 1
                    },
                    {
                      pattern: /.{12,}/i,
                      explanation: "`operator+=` is being implemented as a member function. The implementation is correct.",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/Z4FmzZ4ppQQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_12_3",
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
      section_id: "section_12_4",
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