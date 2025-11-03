import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LINKED_LISTS : Omit<ExamSpecification, "exam_id"> = {
  title: "Linked Lists",
  mk_intructions: `

<div markdown=1 class="alert alert-info">
Most any data structure uses one of two fundamental approaches in its underlying data representation:

- **Contiguous memory**: store elements next to each other in memory (i.e. in an array)
- **Linked structures**: store elements separately from each other, connected together via pointers

We've previously covered the contiguous memory approach. In this lecture, we'll begin to explore linked structures. As an initial example, we'll implement a **linked list**.
<div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Fall 2025</div>
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
      section_id: "section_16_1",
      title: "Sequential Containers and Data Structures",
      mk_description: dedent`
        First, let's briefly review the kinds of **sequential containers** we'd like to build and the applications they're used for.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ImchR43lyN8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_16_2",
      title: "Arrays vs. Linked Lists",
      mk_description: dedent`
        Data structures generally fall into one of two fundamental for these containers generally use one of two fundamental approaches:

        Option 1 - **Contiguous Memory**: We've covered this throughout the last several lectures on **array-based** data structures and growable containers. The use of a contiguous block of memory allows for efficient $$O(1)$$ indexing, but insert/erase operations in the middle of the array incur a linear $$O(N)$$ complexity due to the need to shift elements (assuming we're dealing with an ordered container where we must preserve the relative ordering of elements).

        Option 2 - **Linked Structures**: The video below introduces the general idea of a **linked-list** as the alternative approach, gives a preliminary look at its data representation, and compares/contrasts the efficiency of various operations on linked-lists vs. arrays.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ZRhqG8pmYWM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        So, to recap:

        **Array-Based**: efficient $$O(1)$$ indexing, but insert/erase in middle is $$O(N)$$ due to shifting elements. Other advantages including better performance via memory caching and lower memory overhead. It turns out this is the superior approach for most applications.

        **Linked Lists**: inefficient $$O(N)$$ indexing (must traverse nodes), but insert/erase anywhere is $$O(1)$$ if we already have a pointer to the insert/erase location. Linked lists are useful in particular applications where frequent insert/erase operations are required from an existing pointer/iterator and where indexing is not needed at all. From a pedagogical perspective, linked lists are also an introduction to linked structures in general.
      `,
      questions: [
        {
          question_id: "lec16_warm_up",
          title: "Exercise: Arrays vs. Linked Structures",
          points: 2,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              
              Describe one of the operations that can be performed more efficiently on an array than on a linked list. Why is this the case and what are the relevant time complexities?

              [[BOX
              
              

              ]]
              
              Describe one of the operations that can be performed more efficiently on a linked list than on an array. Why is this the case and what are the relevant time complexities?

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
                      pattern: /(.|\n){50,}/i,
                      explanation: "This is just graded for completion. Make sure to check back through the original video if you're not sure about your answer.",
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
                      pattern: /(.|\n){50,}/i,
                      explanation: "This is just graded for completion. Make sure to check back through the original video if you're not sure about your answer.",
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
            There is no walkthrough video for this question, but you can refer back to the video above for examples.

            <br />
          `
        }
      ],
    },
    {
      section_id: "section_16_3",
      title: "Intro to Linked Lists",
      mk_description: dedent`

        <div class="alert alert-secondary" role="alert" markdown="1">
        <h5><span class="badge badge-primary">Fall 2025</span></h5>
        In some of the videos below, I might refer to implementing a linked list on project 4. That's project 5 this term.
        </div>
      
        Here we'll consider building an ADT for a linked **Linked List**, which is the simplest linked data structure. The key idea is that we implement a sequential container by storing several nodes (each individually allocated in dynamic memory) that contain element values and a pointer to the next node in the sequence. There's no requirement that the nodes are contiguous in memory.

        Specifically, we'll start with a "singly-linked, single-ended" list, which we'll call \`ForwardList\` (since we can only traverse it in a forward direction).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/2H26k6Xd7E4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec16_linked_list_representation_invariants",
          title: "Exercise: Linked List Representation Invariants",
          points: 1,
          mk_description: dedent`
            Here again is the basic data representation for a linked list:

            <div style="text-align: center">
             <img src="assets/linked_list_data_representation.png" style="width: 500px;">
            </div>
            <br />

            Brainstorm three different representation invariants for the linked list's data representation. Think about what things must be true for the node structure to make sense, or for functions working with the structure to be able to do their job correctly.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              
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
                      pattern: /(.|\n){50,}/i,
                      explanation: "This is just graded for completion. Check the sample solution if you're not sure about your answer!",
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
            <details>
              <summary>Sample solution...</summary>
              
              - \`first\` is either null (indicating an empty list) or points to a valid \`Node\`.  
              - In the last \`Node\`, \`next\` is always null (i.e. has the value \`0x0\`).  
              - For all other \`Node\`s, next points to another \`Node\`.  
              - A \`Node\` may never point to itself. There may be no cycles of \`next\` pointers.  

            </details>
          `
        }
      ],
    },
    {
      section_id: "section_16_4",
      title: "Linked List Implementation",
      mk_description: dedent`

        Let's keep working on the \`ForwardList\` class and fill in the implementations of several key functions.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/H6T0hK2Pw9s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec16_pop_front",
          title: "Exercise: \`ForwardList::pop_front()\`",
          points: 1,
          mk_description: dedent`
            Implement the \`pop_front()\` member function for the ForwardList class, which removes the front element from the list. Your implementation should ensure the Node for this element is properly deleted to prevent a memory leak, but you will also need to be careful to avoid undefined behavior! _(Hint: For linked list coding, it is VERY helpful to draw a picture.)_
          `,
          response: {
            kind: "code_editor",
            codemirror_mime_type: "text/x-c++src",
            code_language: "cpp",
            header: dedent`
              template <typename T>
              class ForwardList {
              private:
                struct Node {
                  T datum;
                  Node *next;
                };
                Node *first;
              public:
                // REQUIRES: the list is not empty
                // EFFECTS:  removes the first element
                void pop_front() {
            `,
            footer: dedent`
                }
              };
            `,
            starter: "// This exercise is not automatically graded.\n// However, getting a correct answer is a bit tricky.\n// I highly suggest you check the walkthrough video.",
            sample_solution: dedent`
              assert(!empty());
              Node* victim = first;
              first = first->next;
              delete victim;
            `,
            default_grader: {
              grader_kind: "freebie",
              points: 1,
              allow_blanks: false,
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/00Z7pNXaTPY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_16_5",
      title: "Traversing a Linked List",
      mk_description: dedent`

        With a data structure based on contiguous memory, walking through increasing indices or addresses is a natural approach. With a linked structure, however, this doesn't work (we can't rely on the contiguous memory assumption anymore). Instead, we have to follow \`next\` pointers to traverse from one node to the next.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/yZdgKYELFJE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec16_print",
          title: "Exercise: \`ForwardList::print()\`",
          points: 1,
          mk_description: dedent`
            Implement the \`print()\` member function, using traversal via \`next\` pointers.
          `,
          response: {
            kind: "code_editor",
            codemirror_mime_type: "text/x-c++src",
            code_language: "cpp",
            header: dedent`
              template <typename T>
              class ForwardList {
              private:
                struct Node {
                  T datum;
                  Node *next;
                };
                Node *first;
              
              public:
                // MODIFIES: os
                // EFFECTS:  prints the list to os
                void print(ostream &os) const {
            `,
            footer: dedent`
                }
              };
            `,
            starter: "// This exercise is not automatically graded.\n// You can check your solution against the walkthrough video.",
            sample_solution: dedent`
              for(Node *ptr = first; ptr; ptr = ptr->next) {
                cout << ptr->datum << endl;
              }
            `,
            default_grader: {
              grader_kind: "freebie",
              points: 1,
              allow_blanks: false,
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video: 

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/8q0GZsjDsGU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_16_6",
      title: "Doubly-Linked, Double-Ended Lists",
      mk_description: dedent`

        Let's take a look at three upgrades to our data representation and where they make a difference in terms of efficiency:
          - Adding a "previous" pointer to each node in addition to the "next" pointer
          - Adding a "last" pointer to the overall list in addition to the "first" pointer
          - Tracking the current size of the list in a member variable
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/9_BIlGfoQSw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec16_singly_doubly_mc",
          points: 4,
          mk_description: dedent`
            Which of the following are true?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "For a singly-linked list, it is impossible to implement a `pop_back()` function in constant time, even if the list is double-ended (i.e. it has a `last` pointer).",
              "For a doubly-linked list, the time complexity of some operations is worse (i.e. becomes linear instead of constant) due to the addition of \"previous\" pointers.)",
              "Determining the size of a linked list by iterating and counting next pointers has linear time complexity.",
              "Iterating both forward and backward is possible with a doubly-linked list.",
            ],
            multiple: true,
            sample_solution: [0,2,3],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
                {points: 1, selected: true},
                {points: 1, selected: false},
                {points: 1, selected: true},
                {points: 1, selected: true},
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
        }
      ]
    },
    {
      section_id: "section_16_7",
      title: "The Big Three",
      mk_description: dedent`

        One more thing - since our class manages dynamically allocated nodes, we'll need custom implementations of "the big three". (Don't be tempted to skip this video - it includes implementations that are directly relevant to the linked list you implement in the project, including a few places with subtle pitfalls!)

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/QYjqEOEuSes" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: []
    },
  ],
};