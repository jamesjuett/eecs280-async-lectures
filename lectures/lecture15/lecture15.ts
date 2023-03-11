import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_15 = Exam.create({
  exam_id: "lec_15_deep_copies_and_the_big_three",
  title: "Deep Copies and The Big Three",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      TODO
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
      section_id: "section_15_1",
      title: "Warm Up Exercise",
      mk_description: "",
      questions: [
        {
          question_id: "lec15_warm_up",
          title: "Exercise: Warm Up",
          points: 3,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              
              Consider the code below. We've got a copy of the \`UnsortedIntSet\` class from previous lectures, which we've recently upgraded to use a pointer to a dynamically allocated array (instead of storing the array directly).

              The code also contains a \`main()\` function that creates two sets. Two elements are added to the first set, \`s1\`. Then, a second set \`s2\` is created as a copy of \`s1\`.

              Go ahead and run the lobster simulation (you can just click "run" to skip all the way to the end). Then, observe the contents of memory and the structure of the two sets. Can you identify any potential problems that might lead to unintuitive behavior?

              [[BOX
              
              
              
              ]]

              <div style="text-align: center;">
                <iframe class="lobster-iframe" style="height: 600px;" src="assets/shallow_copy.html"></iframe>
              </div>
            `,
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/sPqOvZb0c5A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

        We've seen a few strategies for managing dynamic memory so far. Let's consider one more, which is to use constructors and destructors for a class to manage the allocation and deletion of dynamically allocated memory.
        
        This strategy is often called **"Resource Acquisition Is Initialization (RAII)"**. Here's some motivation and the details:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/uljsiNouVuY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap, the strategy is essentially:
        - **Allocate** dynamic resources in a **constructor**, as part of initializing a class object.
        - Track the dynamic memory using a **pointer** stored as a \`private\` member variable, provide access as desired through \`public\` member functions.
        - When the class object dies (e.g. goes out of scope), its **destructor** ensures the dynamically allocated resources are properly **deleted**.
      `,
      questions: [
        {
          question_id: "lec15_shallow_copy_grow",
          title: "Exercise: Shallow Copy Problems",
          points: 3,
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
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/6s5tvv3aDE4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

        Previously, we implemented containers with a fixed-capacity restriction. Using dynamic memory, we can instead implement growable containers that start with a small amount of dynamic memory and allocate more as needed.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/NM9ONBQzM8c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec15_unsortedintset_copy_ctor",
          title: "Exercise: \`UnsortedIntSet\` Copy Constructor",
          points: 3,
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
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="TODO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

        Let's take just a moment to formally reason about the management of dynamic resources by an ADT and sketch out a rough strategy for proving they don't leak memory or run into other memory errors.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/iB6QhLSM6pM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec15_unsortedintset_assignment_op",
          title: "Exercise: \`UnsortedIntSet\` Assignment Operator",
          points: 3,
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
            src: "assets/main.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="TODO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_15_5",
      title: "The Big Three",
      mk_description: "",
      questions: [
        {
          question_id: "lec15_big_three",
          title: "Exercise: The Big Three",
          points: 3,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              
              Determine what is printed by the following code. To do this, you'll need to think about where each of the Big Three are used by the code in the main program. You can also step through the code on Lobster (L16.2_BigThree) to check your work.

              <table>
                <tr>
                  <td style="width: 80%">
                    <div style="text-align: center;">
                      <iframe class="lobster-iframe" style="height: 600px;" src="assets/main.html"></iframe>
                    </div>
                  </td>
                  <td>
                    [[BOX
                    
                    
                    
                    ]]
                  </td>
                </tr>
              </table>
            `,
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/sPqOvZb0c5A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
  ],
});