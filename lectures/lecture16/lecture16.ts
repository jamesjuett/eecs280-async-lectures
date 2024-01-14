import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_16 : ExamSpecification = {
  exam_id: "lec_16_linked_lists",
  title: "Linked Lists",
  mk_intructions: `
<div markdown=1 class="alert alert-info">
Most any data structure uses one of two fundamental approaches in its underlying data representation:

- **Contiguous memory**: store elements next to each other in memory (i.e. in an array)
- **Linked structures**: store elements separately from each other, connected together via pointers

We've previously covered the contiguous memory approach. In this lecture, we'll begin to explore linked structures. As an initial example, we'll implement a **linked list** - a sequential, ordered container that functions kind of like a vector. It turns out that linked lists have somewhat limited practical applications themselves, but they serve as good starting point to practice the mechanics of linked structures and to introduce some of the fundamental contrasts in efficiency of operations between contiguous memory and linked structures.
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
      title: "Warm Up Exercise",
      mk_description: "",
      questions: [
        {
          question_id: "lec16_warm_up",
          title: "Exercise: Warm Up",
          points: 3,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              
              Arrays and vectors are sequential containers that allow us to maintain elements in a particular order (not necessarily sorted, but we do care about order, unlike in a set.)

              The way that arrays and vectors maintain the sequence is straightforward - literally, the elements are stored contiguously in memory, and to iterate through them in order you just walk straight forward through memory, either through traversal by index or traversal by pointer.

              Storing data contiguously in memory makes some operations quite efficient, but makes others less efficient since we have to shift elements around to maintain the contiguous ordering.
              
              Consider the following operations, and determine their time complexity (either $$O(1)$$ constant or $$O(n)$$ linear).
            
              <table style="border: none;">
                <tr>
                  <td style="vertical-align: middle;"><b>A</b></td>
                  <td style="vertical-align: middle;">_BLANK_________</td>
                  <td style="vertical-align: middle;">Finding an element at a given index <code>i</code></td>
                </tr>
                <tr>
                  <td style="vertical-align: middle;"><b>B</b></td>
                  <td style="vertical-align: middle;">_BLANK_________</td>
                  <td style="vertical-align: middle;">Iterating through all of the elements in an array</td>
                </tr>
                <tr>
                  <td style="vertical-align: middle;"><b>C</b></td>
                  <td style="vertical-align: middle;">_BLANK_________</td>
                  <td style="vertical-align: middle;">Adding an element to the back of a sequence stored in an array (assuming the array is not full)</td>
                </tr>
                <tr>
                  <td style="vertical-align: middle;"><b>D</b></td>
                  <td style="vertical-align: middle;">_BLANK_________</td>
                  <td style="vertical-align: middle;">Adding an element to the back of a full array, where you have to reallocate a new, bigger one and copy the elements over</td>
                </tr>
                <tr>
                  <td style="vertical-align: middle;"><b>E</b></td>
                  <td style="vertical-align: middle;">_BLANK_________</td>
                  <td style="vertical-align: middle;">Adding an element to the front of a sequence stored in an array (assuming the array is not full)</td>
                </tr>
                <tr>
                  <td style="vertical-align: middle;"><b>F</b></td>
                  <td style="vertical-align: middle;">_BLANK_________</td>
                  <td style="vertical-align: middle;">Inserting an element in the middle of an array</td>
                </tr>
              </table>
              
              <br />
              Hypothetically, let's say we could store elements of the sequence non-contiguously in memory. Which operations above would become **less** efficient, **more** efficient, or stay the **same**?
              
              <b>A</b> _BLANK____ &nbsp;&nbsp;
              <b>B</b> _BLANK____ &nbsp;&nbsp;
              <b>C</b> _BLANK____ &nbsp;&nbsp;
              <b>D</b> _BLANK____ &nbsp;&nbsp;
              <b>E</b> _BLANK____ &nbsp;&nbsp;
              <b>F</b> _BLANK____ &nbsp;&nbsp;
            `,
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/3vqF8Y4eUow" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_16_2",
      title: "Intro to Linked Lists",
      mk_description: dedent`
        Here we'll introduce the **Linked List**, which is the simplest realization of a linked data structure. The key idea is that we store each piece of data in the list separately in memory (and not necessarily contiguously!) and keep them connected using pointers.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/c7Glq0Q7urw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec16_linked_list_representation_invariants",
          title: "Exercise: Linked List Representation Invariants",
          points: 3,
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
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              
              - \`first\` is either null (indicating an empty list) or points to a valid \`Node\`.  
              - In the last \`Node\`, \`next\` is always null (i.e. has the value \`0x0\`).  
              - For all other \`Node\`s, next points to another \`Node\`.  
              - A \`Node\` may never point to itself.  

            </details>
          `
        }
      ],
    },
    {
      section_id: "section_16_3",
      title: "Linked List Implementation",
      mk_description: dedent`

        Let's keep working on the \`IntList\` class and fill in the implementations of several key functions.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/rsnOd2rpQVg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec16_pop_front",
          title: "Exercise: \`IntList::pop_front()\`",
          points: 3,
          mk_description: dedent`
            Implement the \`pop_front()\` member function for the IntList class, which removes the front element from the list. Your implementation should ensure the Node for this element is properly deleted to prevent a memory leak, but you will also need to be careful to avoid undefined behavior! _(Hint: For linked list coding, it is VERY helpful to draw a picture.)_
          `,
          response: {
            kind: "code_editor",
            codemirror_mime_type: "text/x-c++src",
            code_language: "cpp",
            header: dedent`
              class IntList {
              private:
                struct Node {
                  int datum;
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
            starter: "",
            sample_solution: dedent`
              assert(!empty());
              Node* victim = first;
              first = first->next;
              delete victim;
            `
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
      section_id: "section_16_4",
      title: "Traversing a Linked List",
      mk_description: dedent`

        With a data structure based on contiguous memory, walking through increasing indices or addresses is a natural approach. With a linked structure, however, this doesn't work (it was predicated on the contiguous memory assumption). Instead, we have to follow \`next\` pointers to traverse from one node to the next.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/rVJM2DoxXuw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec16_print",
          title: "Exercise: \`IntList::print()\`",
          points: 3,
          mk_description: dedent`
            Implement the \`print()\` member function, using traversal via \`next\` pointers.
          `,
          response: {
            kind: "code_editor",
            codemirror_mime_type: "text/x-c++src",
            code_language: "cpp",
            header: dedent`
              class IntList {
              private:
                struct Node {
                  int datum;
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
            starter: "",
            sample_solution: dedent`
              for(Node *ptr = first; ptr; ptr = ptr->next) {
                cout << ptr->datum << endl;
              }
            `
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/yzL0w-hhUl4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_16_5",
      title: "Managing Memory, Doubly-Linked Lists, and Templates",
      mk_description: dedent`

        A few more miscellaneous topics:
        - Since we're using dynamically allocated nodes, we need to ensure proper **dynamic memory management** using RAII and custom implementations of the Big Three.
        - We'll upgrade to a **doubly-linked** list (with both \`next\` and \`prev\` pointers) to enable working with the list from both ends, reverse traversal, etc.
        - We can create a linked list class **template** with minimal changes, which will allow creating linked lists of different types.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/7mkpKCce6Mk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: []
    },
  ],
};