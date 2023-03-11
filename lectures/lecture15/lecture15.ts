import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_15 = Exam.create({
  exam_id: "lec_15_raii_growable_containers",
  title: "RAII and Growable Containers",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      Let's take a look at two common strategies for managing dynamic memory:
      1. **RAII** - The use of constructors and destructors to manage dynamic resources within a class-based ADT.
      2. **Growable Containers** - Dynamic memory enables a data structure to allocate additional space for elements as needed.
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
                <iframe class="lobster-iframe" style="height: 600px;" src="assets/main.html"></iframe>
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
      title: "Growable Containers",
      mk_description: dedent`

        Previously, we implemented containers with a fixed-capacity restriction. Using dynamic memory, we can instead implement growable containers that start with a small amount of dynamic memory and allocate more as needed.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/NM9ONBQzM8c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec15_unsortedintset_grow",
          title: "Exercise: \`UnsortedIntSet::grow()\`",
          points: 3,
          mk_description: dedent`
            Fill in the code for the \`grow()\` function for \`UnsortedIntSet\` using the algorithm described in the video (it is also repeated in the comments above the function in the code below).

            The \`main()\` function provided includes testing code to verify your implementation.
          `,
          response: {
            kind: "iframe",
            src: "assets/unsortedintset_grow.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            Note that the walkthrough is for a templated class with type \`T\` whereas the exercise used \`int\` specifically. The concept is the same otherwise.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/5li19qh2TX8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_15_4",
      title: "Dynamic Resource Invariants",
      mk_description: dedent`

        Let's take just a moment to formally reason about the management of dynamic resources by an ADT and sketch out a rough strategy for proving they don't leak memory or run into other memory errors.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/iB6QhLSM6pM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ],
    },
  ],
});