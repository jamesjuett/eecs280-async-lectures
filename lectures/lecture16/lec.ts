import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";


const BIG_THREE_SOLUTIONS = [
  "ctor a",
  "ctor b",
  "ctor c",
  "copy ctor b",
  "copy ctor a",
  "dtor a",
  "dtor b",
  "copy ctor c",
  "assign c.*c",
  "dtor c",
  "dtor c",
  "dtor b",
  "dtor a",
];

const BIG_THREE_PATTERNS = BIG_THREE_SOLUTIONS.map(
  sol => "[\\s\\n]*" + sol.replace(/ /g, "[\\s\\n]*") + "[\\s\\n]*"
);


export const DEEP_COPIES_AND_THE_BIG_THREE : Omit<ExamSpecification, "exam_id"> = {
  title: "Deep Copies and The Big Three",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      In this lecture, we'll introduce the idea of **shallow copies** vs. **deep copies**, its connection to dynamic resource management, and the way these concepts are realized specifically in C++ via the **Big Three**.
      
      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Spring 2025</div>
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
      section_id: "section_15_1",
      title: "Warm Up Exercise",
      mk_description: "",
      questions: [
        {
          question_id: "lec15_warm_up",
          title: "Exercise: Warm Up",
          points: 1,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              
              Consider the code below for the \`UnsortedIntSet\` class from previous lectures, which we've recently upgraded to use a pointer to a dynamically allocated array (instead of storing the array directly).

              The code also contains a \`main()\` function that creates two sets:
              - The first set, \`s1\`, is default-constructed and we add some elements to it.
              - Then, a second set \`s2\` is created as a copy of \`s1\`.

              Go ahead and run the lobster simulation (you can just click "run" to skip all the way to the end). Then, observe the contents of memory and the structure of the two sets. Can you identify any potential problems that might lead to unintuitive behavior?

              [[BOX
              
              
              
              ]]

              <div style="text-align: center;">
                <iframe class="lobster-iframe" style="height: 600px;" src="assets/shallow_copy.html"></iframe>
              </div>
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
                      pattern: /.{30,}/i,
                      explanation: "This is just graded for completion. Make sure to check the walkthrough video if you're not sure about your answer!",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/xwEFRufV6lw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_15_2",
      title: "The Shallow Copy Problem",
      mk_description: dedent`

        Let's take a look at the built-in copying behavior we get in C++ for compound objects (i.e. \`struct\` or \`class\`) and the way this leads to a "shallow copy" by default.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/FlDsWfh4Wrk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec15_shallow_copy_grow",
          title: "Exercise: Shallow Copy Problems",
          points: 2,
          mk_description: dedent`
            Consider the code for \`UnsortedSet\` below. The implicitly-defined copy constructor is used for the line \`UnsortedSet<int> s2 = s1;\` in \`main()\`, but this only performs a shallow copy, which results in some problems.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
\`\`\`cpp
template <typename T>
class UnsortedSet {
public:

  // Default constructor, empty set
  UnsortedSet()
    : elts(new T[DEFAULT_CAPACITY]), capacity(DEFAULT_CAPACITY), elts_size(0) { }

  // Built-in copy ctor from compiler. (Normally, this wouldn't be written
  // out. But we've done so here to emphasize what the built-in one does
  // behind the scenes.)
  UnsortedSet(const UnsortedSet &other)
    : elts(other.elts), capacity(other.capacity), elts_size(other.elts_size) { }

  // Destructor
  ~UnsortedSet() { delete[] elts; }

  // grow function switches to a new, larger array
  void grow() {
    T *newArr = new T[2 * capacity];
    for (int i = 0; i < elts_size; ++i) {
      newArr[i] = elts[i];
    }
    capacity *= 2;
    delete[] elts;
    elts = newArr;
  }
};
\`\`\`

<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 48%;">
      <div markdown="1">
<b>Part 1:</b> In the code below, what problem is encountered on the marked line that causes undefined behavior? You might find it helpful to sketch out a memory diagram and trace the code. 
      </div>
    </td>
    <td></td>
    <td style="width: 48%;">
      <div markdown="1">
<b>Part 2:</b> In the code below, the shallow copy is still made, but we don't modify either set after making the problematic copy. Is this ok? Or is there still some memory error that will occur?
      </div>
    </td>
  </tr>
  <tr>
    <td>
    <div markdown="1">
\`\`\`cpp
int main() {
  // assume initial capacity of 2
  UnsortedSet<int> s1;
  s1.insert(2);
  s1.insert(3);

  UnsortedSet<int> s2 = s1;

  // this requires a call to grow()
  s2.insert(4);
  cout << s1 << endl; // THIS LINE
}
\`\`\`
    </div>
    </td>
    <td></td>
    <td>
    <div markdown="1">
\`\`\`cpp
int main() {
  // assume initial capacity of 2
  UnsortedSet<int> s1;
  s1.insert(2);
  s1.insert(3);

  UnsortedSet<int> s2 = s1;

  // read only operations - is this ok?
  cout << s1 << endl;
  cout << s2 << endl;
}
\`\`\`
    </div>
    </td>
  </tr>
  <tr>
    <td>
      <div>
        [[BOX
        
        
        
        ]]
      </div>
    </td>
    <td></td>
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
                      pattern: /.{45,}/i,
                      explanation: "This is just graded for completion. Make sure to check the walkthrough video if you're not sure about your answer!",
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
                      pattern: /.{45,}/i,
                      explanation: "This is just graded for completion. Make sure to check the walkthrough video if you're not sure about your answer!",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/kCi8LeXB40s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_15_3",
      title: "Deep Copy Constructors",
      mk_description: dedent`

        The semantically correct way to copy an \`UnsortedSet\` object (or any class that manages a dynamic resource, like the underlying array for the set) is to implement a deep copy. We can do this by defining our own custom copy constructor for the class.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/RLa4ALJDJw4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec15_unsortedintset_copy_ctor",
          title: "Exercise: \`UnsortedIntSet\` Copy Constructor",
          points: 1,
          mk_description: dedent`
            Implement a custom copy constructor for \`UnsortedIntSet\`. Your implementation should ensure that a deep copy of the dynamically allocated array is made, following these steps:

            1. Initialize the "regular" members (\`capacity\` and \`elts_size\`) of the new set to match the original set.
            2. Initialize \`elts\` to point to a new dynamically allocated array, with the same capacity as the array from the original set.
            3. Copy over each element from the original set into the new set's dynamic array.

            _(Hint: Steps 1 and 2 should be done in the member-initializer-list, and 3 uses a loop in the body of the constructor.)_

            The \`main()\` function provided includes testing code to verify your implementation.
          `,
          response: {
            kind: "iframe",
            src: "assets/unsortedintset_copy_ctor.html",
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

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/z7KUYFb9YU4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_15_4",
      title: "Deep Copy Assignment",
      mk_description: dedent`

        Copies are also made when we perform assignment on already-existing objects (as opposed to declaring a completely new object as a copy of another). The key difference is that in this case, the assigned-to object will already have some prior dynamic resources that need to be cleaned up before the deep copy is made.

        Additionally, to implement the deep copy properly in C++, we can conveniently overload the \`=\` operator.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/05d0cmi7TSA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec15_unsortedintset_assignment_op",
          title: "Exercise: \`UnsortedIntSet\` Assignment Operator",
          points: 1,
          mk_description: dedent`
            Implement a custom copy constructor for \`UnsortedIntSet\`. Your implementation should ensure that a deep copy of the dynamically allocated array is made, following these steps:

            1. If the assignment is a self-assignment, simply \`return *this;\`.
            2. Free the original dynamically allocated array using \`delete\`.
            3. Copy over the "regular" members (\`capacity\` and \`elts_size\`) from the \`rhs\` set.
            4. Make a deep copy by setting \`elts\` to point to a new dynamically allocated array, with the same capacity as the array from the \`rhs\` set.
            5. Copy over each element from the \`rhs\` set into the new dynamic array.
            6. \`return *this;\`

            The \`main()\` function provided includes testing code to verify your implementation.
          `,
          response: {
            kind: "iframe",
            src: "assets/unsortedintset_assignment_op.html",
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

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/Y-wIMnDcjlk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_15_5",
      title: "The Big Three",
      mk_description: dedent`

        Finally, let's take a look at the connection between dynamic resource management with destructors and the necessity for a deep copy via a custom copy constructor and assignment operator. Affectionately, these are called "the big three" - and it turns out that they come as a package deal. Here's some more details:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Gnl-5mr5uhU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec15_big_three",
          title: "Exercise: The Big Three",
          points: BIG_THREE_PATTERNS.length,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              
              Determine what is printed by the following code. To do this, you'll need to think about where each of the Big Three are used by the code in the main program. Record your prediction in the box at the right. You can use the simulation to double check your answer.

              _**Note**: The run button in the simulation automatically pauses at the end of main. If you want to see all the output, including the destructors that run as main ends, you can click "run", "step", then "run" again._

              <table>
                <tr>
                  <td style="width: 65%">
                    <div style="text-align: center;">
                      <iframe class="lobster-iframe" style="height: 600px; width: 100%;" src="assets/big_three.html"></iframe>
                    </div>
                  </td>
                  <td>
                    Record your predicted output here.

                    ${BIG_THREE_PATTERNS.map(_ => "_BLANK___________________").join("\n")}
                  </td>
                </tr>
              </table>
            `,
            default_grader: {
              grader_kind: "manual_regex_fill_in_the_blank",
              rubric: BIG_THREE_PATTERNS.map((pattern, i) => ({
                blankIndex: i+1,
                title: `Box ${i+1}`,
                points: 1,
                description: "",
                patterns: [
                  {
                    pattern: new RegExp(pattern, "i"),
                    explanation: `Correct!`,
                    points: 1
                  }
                ]
              }))
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/4qua-DItFY0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
  ],
};