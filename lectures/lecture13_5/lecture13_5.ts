import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const CONTAINERS_AND_ITERATORS : Omit<ExamSpecification, "exam_id"> = {
  title: "Containers and Iterators",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-success">
      I didn't get this one published as early as usual, so I've extended the participation deadline by 24 hours to give a little extra flexibility.
    </div>
    <div markdown=1 class="alert alert-info">
      This lecture covers a broad overview of **Containers** as well as the fundamental approaches to , which allow us to store and organize collections of other objects. Using container ADTs from the C++ standard library as examples:
      
      - A \`std::vector<double>\` could store datapoints for statistical analysis
      - A \`std::set<string>\` could represent uniqnames of students registered for a course
      - A \`std::map<string, double>\` could allow us to look up the price of an item on a menu by providing its name

      <!-- force end of list -->

      If you're not familiar with all these containers, don't worry - we'll introduce each briefly today. throughout the rest of the course.
      
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
      section_id: "section_11_1",
      title: "Introduction to Standard Library Containers",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/OsOmWAPXySA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_2",
      title: "Sequential Containers with Contiguous Allocation",
      mk_description: dedent`
        
        There are two fundamental approaches to data representation for containers. The first of these is to use a **contiguous allocation** (i.e. elements are stored in an underlying array). \`std::array\` and \`std::vector\` are sequential containers from the C++ standard library that use this approach.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/0PV-zEA08z4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_contiguous_allocation_containers",
          points: 5,
          mk_description: dedent`
            Which of the following are true?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Both a \`std::array\` and a \`std::vector\` use a single, contiguous memory allocation to store their elements.",
              "The implementation of \`std::array\` contains a pointer to a separately allocated array.",
              "The implementation of \`std::vector\` must use separate variables to track its current size vs. the capacity of the underlying array.",
              "A \`std::array\` is dynamically sized - if more space for elements is needed, it can request an increase to the size of its underlying array.",
              "A \`std::vector\` is dynamically sized - if more space for elements are needed, it can request a completely new, larger array and change its internal pointer to use that one instead.",
            ],
            multiple: true,
            sample_solution: [0, 2, 4],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
                {points: 1, selected: true},
                {points: 1, selected: false},
                {points: 1, selected: true},
                {points: 1, selected: false},
                {points: 1, selected: true},
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
        }
      ],
    },
    {
      section_id: "section_11_3",
      title: "Sequential Containers with Linked Structures",
      mk_description: dedent`

        The second fundamental approach to data representation for containers is to use a **linked structure** (i.e. elements are stored in nodes that point to each other). \`std::list\` and \`std::forward_list\` are sequential containers from the C++ standard library that use this approach.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/9HrsiY_Hqyk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_contiguous_vs_linked_time_complexity",
          title: "Exercise: Time Complexity",
          points: 7,
          mk_description: dedent`
            Determine the time complexity of each of the following operations on the given data structure. Using a worst-case analysis, determine whether each function has _O(1)_ constant time complexity or _O(n)_ linear time complexity.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              _BLANK__________________ Updating the value of the first element in a \`std::array\`.

              _BLANK__________________ Inserting a new element at the front (left) of a \`std::vector\`.
              
              _BLANK__________________ Inserting a new element at the back (right) of a \`std::vector\`.

              _BLANK__________________ Printing the value of the first element in a \`std::list\`.

              _BLANK__________________ Inserting a new element at the front (left) of a \`std::list\`.
              
              _BLANK__________________ Printing the element in the middle of a \`std::list\`.
              
              _BLANK__________________ Assuming you already have a pointer to some node within a \`std::list\`, inserting a new element right after that position.
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
                      explanation: "Correct! The implementation has constant time complexity, since it's a case of indexing (i.e. at index 0) and indexing can be implemented with constant time complexity in array using pointer arithmetic.",
                      points: 1
                    },
                    {
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "The implementation has constant time complexity, since it's a case of indexing (i.e. at index 0) and indexing can be implemented with constant time complexity in array using pointer arithmetic.",
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
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "Correct! The implementation has linear time complexity. A vector doesn't maintain any free space at the front, so inserting at the front requires shifting all existing elements to the right.",
                      points: 1
                    },
                    {
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "The implementation has linear time complexity. A vector doesn't maintain any free space at the front, so inserting at the front requires shifting all existing elements to the right.",
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
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "Correct! The implementation has constant time complexity. A vector's free space is at the back, so we just need to access the next open space (using indexing, which is contant time), assign a new value there, and increase the current size variable.",
                      points: 1
                    },
                    {
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "The implementation has constant time complexity. A vector's free space is at the back, so we just need to access the next open space (using indexing, which is contant time), assign a new value there, and increase the current size variable.",
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
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "Correct! The implementation has constant time complexity. The list has a pointer to the first node, which we can dereference to access the value of the first element.",
                      points: 1
                    },
                    {
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "The implementation has constant time complexity. The list has a pointer to the first node, which we can dereference to access the value of the first element.",
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
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "Correct! The implementation has constant time complexity. Inserting a new first element in a linked list requires updating a few pointers, but doesn't require any more time for longer lists than shorter lists (i.e. we only need to update pointers at the front - we don't need to shift over all existing elements as we would in an array.)",
                      points: 1
                    },
                    {
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "The implementation has constant time complexity. Inserting a new first element in a linked list requires updating a few pointers, but doesn't require any more time for longer lists than shorter lists (i.e. we only need to update pointers at the front - we don't need to shift over all existing elements as we would in an array.)",
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
                      explanation: "Correct! The implementation has linear time complexity. Indexing into a linked list cannot be done efficiently, because it is not based on a contiguous memory allocation. Instead of using pointer arithmetic, we must traverse through a bunch of next pointers starting from the beginning of the list. In this case, the number of next pointers to get to the halfway point is linearly proportional to the size of the list.",
                      points: 1
                    },
                    {
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "The implementation has linear time complexity. Indexing into a linked list cannot be done efficiently, because it is not based on a contiguous memory allocation. Instead of using pointer arithmetic, we must traverse through a bunch of next pointers starting from the beginning of the list. In this case, the number of next pointers to get to the halfway point is linearly proportional to the size of the list.",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 7,
                  title: "Box 7",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /constant|O\s*\(\s*1\s*\)/i,
                      explanation: "Correct! The implementation has constant time complexity. If we already have a pointer to the node, we can insert a new element after it by updating a few pointers. We don't need to shift elements or change pointers for the rest of the list, either before or after the local point of insertion. (Note that if we did not start with the pointer to the node, this would be a linear operation in terms of how far into the list we need to go to insert.)",
                      points: 1
                    },
                    {
                      pattern: /linear|O\s*\(\s*n\s*\)/i,
                      explanation: "The implementation has constant time complexity. If we already have a pointer to the node, we can insert a new element after it by updating a few pointers. We don't need to shift elements or change pointers for the rest of the list, either before or after the local point of insertion. (Note that if we did not start with the pointer to the node, this would be a linear operation in terms of how far into the list we need to go to insert.)",
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
        },
        
        {
          question_id: "lec_binary_search_contiguous_vs_linked",
          title: "Exercise: Binary Search",
          points: 1,
          mk_description: dedent`
            Recall the binary search algorithm, where we find a desired value in a _sorted_ array by:  
              1. Finding the middle value current search range by indexing at the halfway point.  
              2. Comparing the query value to the middle value.  
              3. Repeating the process on the left or right half of the array, depending on the comparison result (or stop if we find the value).  
            
            Using binary search, a lookup operation in a sorted array can be implemented in worst-case logarithmic time, _O(log n)_.
            
            However, this isn't the case for a sorted linked list! Why not? Explain why binary search is not a good fit for a linked list.
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
                      pattern: /.{10,}/i,
                      explanation: "This is just graded for completion. Check your answer against the sample solution",
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
              
              Binary search relies on efficient indexing to get the middle value in the array. In an array, this is possible via pointer arithmetic. But linked lists do not support efficient indexing! To take one step of the binary search algorithm, we'd need to traverse linearly through 50% of the list by following next pointers. This first step alone already puts us at linear time complexity (and rules out logarithmic time).
              
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_11_4",
      title: "Iterators and Traversal by Iterator",
      mk_description: dedent`

        The C++ standard library uses the concept of an **iterator** to indicate the position of an element in a list and to facilitate traversal through elements.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/20lCBbM4CpI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Note that traversal by iterator is analogous to traversal by pointer, which we've seen previously. (Although not all iterators are literally implemented as pointers.)
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_5",
      title: "The `auto` Keyword",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/B2MYNqlYB8Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_6",
      title: "Range-based `for` Loops",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/1xzy5yLeiVg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_7",
      title: "Iterator Interfaces",
      mk_description: dedent`

        Iterator types are also used to specify the parameter or return types for many functions from the standard library.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/cOOMmqo90R0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_11_8",
      title: "Sets and Maps",
      mk_description: dedent`
                
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/gzHPz0BzP5U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec11_participation_freebie",
          points: 1,
          mk_description: dedent`
            Select the item below for participation credit.
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Select this for participation credit.",
            ],
            multiple: false,
            sample_solution: [0],
            default_grader: {
              grader_kind: "freebie",
              points: 1,
              allow_blanks: false
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
        }
      ],
    },
  ],
};
