import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const RAII_AND_GROWABLE_CONTAINERS : Omit<ExamSpecification, "exam_id"> = {
  title: "RAII and Growable Containers",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      Let's take a look at two common strategies for managing dynamic memory:
      1. **RAII** - The use of constructors and destructors to manage dynamic resources within a class-based ADT.
      2. **Growable Containers** - Dynamic memory enables a data structure to allocate additional space for elements as needed.
      
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
      section_id: "section_14_1",
      title: "Warm Up Exercise",
      mk_description: "",
      questions: [
        {
          question_id: "lec14_warm_up",
          title: "Exercise: Warm Up",
          points: 1,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Let's review some of the issues we can run into with dynamic memory. What memory errors do you see in the code below?

              \`\`\`cpp
              int *func(int x) {
                int *y = new int(x);
                y = new int[x];
                return y;
              }
              
              int main() {
                int *a = func(5);
                int *b = a;
                delete b;
                cout << a[2] << endl;
              }
              \`\`\`

              Describe a few conceptual problems and/or specific errors in the way the code above manages dynamic memory.

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
              <iframe class="lec-video" src="https://www.youtube.com/embed/sPqOvZb0c5A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_14_2",
      title: "RAII: A Strategy for Managing Dynamic Resources",
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
          question_id: "lec14_raii",
          title: "Exercise: RAII and Memory Management",
          points: 4,
          mk_description: dedent`
            Which of these functions leak memory? Write either **"ok"** or **"memory leak"**, as well as a brief justification. You should assume the constructors and destructor for \`UnsortedSet\` are defined (correctly) as described above for \`DynamicIntArray\`, such that the constructor and destructor take care of creating and destroying the internal array used to store set elements.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
void func() {
  UnsortedSet<int> s1;
  s1.insert(2);
  s1.insert(3);
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
void func() {
  UnsortedSet<int*> s2;
  s2.insert(new int(2));
  s2.insert(new int(3));
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
void func() {
  UnsortedSet<int> *s3 = new UnsortedSet<int>;
  s3->insert(2);
  s3->insert(3);
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
void func() {
  UnsortedSet<int> *s4 = new UnsortedSet<int>;
  s4->insert(2);
  s4->insert(3);
  delete s4;
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
            sample_solution: [
              "ok",
              "memory leak",
              "memory leak",
              "ok",
            ],
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
                      pattern: /ok/i,
                      explanation: "The code here does not use `new`, and we presume the `UnsortedSet` class manages its memory correctly. Answer = \"ok\".",
                      points: 1
                    },
                    {
                      pattern: /memory ?-?leak/i,
                      explanation: "The code here does not use `new`, and we presume the `UnsortedSet` class manages its memory correctly. Answer = \"ok\".",
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
                      pattern: /memory ?-?leak/i,
                      explanation: "The code allocates integers with `new` and stores the pointers in the set. However, the `UnsortedSet` will only clean up the memory for its internal array, not these additional integers we created. Answer = \"memory leak\".",
                      points: 1
                    },
                    {
                      pattern: /ok/i,
                      explanation: "The code allocates integers with `new` and stores the pointers in the set. However, the `UnsortedSet` will only clean up the memory for its internal array, not these additional integers we created. Answer = \"memory leak\".",
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
                      pattern: /memory ?-?leak/i,
                      explanation: "In this case, the `UnsortedSet` itself is allocated on the heap with `new`, but not deleted. Although `UnsortedSet` manages its internal memory correctly, the problem is the set overall is never destroyed. Answer = \"memory leak\".",
                      points: 1
                    },
                    {
                      pattern: /ok/i,
                      explanation: "In this case, the `UnsortedSet` itself is allocated on the heap with `new`, but not deleted. Although `UnsortedSet` manages its internal memory correctly, the problem is the set overall is never destroyed. Answer = \"memory leak\".",
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
                      pattern: /ok/i,
                      explanation: "This contrasts to the previous example by adding the appropriate `delete` operation. Answer = \"ok\".",
                      points: 1
                    },
                    {
                      pattern: /memory ?-?leak/i,
                      explanation: "This contrasts to the previous example by adding the appropriate `delete` operation. Answer = \"ok\".",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/6s5tvv3aDE4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_14_3",
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
          question_id: "lec14_unsortedintset_grow",
          title: "Exercise: \`UnsortedIntSet::grow()\`",
          points: 1,
          mk_description: dedent`
            Fill in the code for the \`grow()\` function for \`UnsortedIntSet\` using the algorithm described in the video (it is also repeated in the comments above the function in the code below).

            The \`main()\` function provided includes testing code to verify your implementation.
          `,
          response: {
            kind: "iframe",
            src: "assets/unsortedintset_grow.html",
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
      section_id: "section_14_4",
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
};