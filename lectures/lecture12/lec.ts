import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const ARRAY_BASED_DATA_STRUCTURES : Omit<ExamSpecification, "exam_id"> = {
  title: "Array-Based Data Structures",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">
      In this lecture and the next, we'll implement a **set** (an associative container for storing unique elements) based on an array.
      
      We'll be following our normal process for building an ADT - starting with our motivating use cases and the interface we want, followed by a fundamental data representation and invariants, and finally filling in the implementations for each member function.
      
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
      title: "An Array-Based Unsorted Set",
      mk_description: dedent`
        Let's take a look at a data structure to represent an **unsorted set**. We'll be following our normal process for building an ADT - starting with our motivating use cases and the interface we want, followed by a fundamental data representation and invariants, and finally filling in the implementations for each member function.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/oHqTh9VfrEc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Our next step is to choose a data representation and invariants. This ends up as the foundation for the data structure, the implementation of its functions, and the efficiency we can achieve. Throughout the course, we'll end up looking at several different possibilities for an unsorted set. We'll start here with an unsorted array.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/K6eRavvlUY0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_2",
      title: "Implementation",
      mk_description: dedent`
        Let's get into the implementation of a default constructor and a few member functions for the array-based unsorted set.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/vy07Uesr0i8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec11_intset_insert",
          title: "Exercise: \`IntSet::insert()\`",
          points: 1,
          mk_description: dedent`
            Implement the \`insert()\` member function for the \`IntSet\` class, which adds a given value \`v\` to the set.
            
            First, your code should call \`contains()\` as a helper to check if \`v\` is already in the set:
              - If the given value is not already in the set, it should add the value to the next available position in the \`elts\` array and increase \`elts_size\` by 1.
              - If the value is already in the set, \`insert()\` does nothing.

            The \`main()\` function provided includes testing code to verify your implementation. Note that you should not worry about implementing \`remove()\` yet... save that for the next exercise below. 
          `,
          response: {
            kind: "iframe",
            src: "assets/intset_insert.html",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/ajaQVu7oHKM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
        {
          question_id: "lec11_intset_remove",
          title: "Exercise: \`IntSet::remove()\`",
          points: 5,
          mk_description: dedent`
            Below are some potential implementations of the \`remove()\` function for \`IntSet\`. Which ones work correctly?
            
            It may be helpful to trace through the code on this set, removing the \`1\`, for example:

            <div style="text-align: center">
             <img style="width: 450px;" src="assets/intset_example.png" />
            </div>
            
            Or, you might also consider pasting them into the code for the exercise above and uncommenting the additional set of tests in \`main()\` for the \`remove()\` function.

            Which of the implementations of \`remove()\` below are correct? Write **"correct"** or **"incorrect"**. For each that is not correct, explain what's wrong with it.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
// Potential Implementation 1
void remove(int v) {
  int i = indexOf(v);
  if (i == -1) { return; }
  elts[i] = elts[i+1];
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
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
// Potential Implementation 2
void remove(int v) {
  int i = indexOf(v);
  if (i == -1) { return; }
  elts[i] = elts[elts_size-1];
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
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
// Potential Implementation 3
void remove(int v) {
  int i = indexOf(v);
  if (i == -1) { return; }
  elts[i] = elts[0];
  ++elts;
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
  
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
// Potential Implementation 4
void remove(int v) {
  int i = indexOf(v);
  if (i == -1) { return; }
  for( ; i < elts_size-1 ; ++i) {
    elts[i] = elts[i+1];
  }
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

Two of the implementations above for \`remove()\` work correctly. Which one is the most efficient for sets with lots of elements? How does this fit in with what the representation invariants require (or rather, what they don't require)?
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
                      pattern: /incorrect|not\s*correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
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
                      pattern: /incorrect|not\s*correct/i,
                      explanation: "The implementation is correct. Check the walkthrough video for more details.",
                      points: 0
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is correct. Check the walkthrough video for more details.",
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
                      pattern: /incorrect|not\s*correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
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
                      pattern: /incorrect|not\s*correct/i,
                      explanation: "The implementation is correct. Check the walkthrough video for more details.",
                      points: 0
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is correct. Check the walkthrough video for more details.",
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
                      pattern: /.{10,}/i,
                      explanation: "This is just checked for completion. Check the walkthrough video to confirm your answer.",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/u3V4L9g_x44" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />

            **NOTE:** For completeness, I'll mention here that ultimately both implementations that work correctly end up having similar runtime _complexities_ in that their runtime scales linearly with the amount of elements in the set - that's because even though the one I describe in the walkthrough video does less work to remove the element, it still needs to call \`indexOf\`, which has a linear runtime. We'll talk more about time complexity in the next lecture.
          `
        }
      ],
    },
    {
      section_id: "section_11_4",
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
  ],
};
