import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_04 : ExamSpecification = {
  exam_id: "lec_04_arrays",
  title: "Arrays",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      The official course title for EECS 280 is *"Programming and Introductory Data Structures"*. The second half of this, **data structures**, is the study of how to represent containers or sequences of data in a way that makes the data easily (for you) and efficiently (for the computer) accessible.
      
      There are many different standard data structures, each well-suited for different kinds of tasks. We'll take a look at several throughout the course, realized via C++ implementations. The same sorts of data structures are applicable in most any programming language and thinking through which data structures to use for a particular problem is one of the fundamentals of good programming.

      To start, we'll focus on **arrays**, which are the most basic container for storing sequential data and also one of the most ubiquitous. In fact, *many* other containers, including \`std::vector\` and \`std::string\` from the C++ standard library, are actually built on top of arrays! (We'll come back to this later.)
      
      We'll also see that arrays provide very efficient access to data in a couple different ways:
      
      - **Sequential Access**: Iterating through a sequence of elements from start to end.
      - **Random Access**: Accessing an element at a particular index (i.e. position) in the sequence.
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
      section_id: "section_04_1",
      title: "Addresses and Pointers",
      mk_description: dedent`
        Arrays are a low-level abstraction over a sequence of objects in memory that we can fit into the memory model we've been building up so far...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/4r_X4JyNLT0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec04_arrays_and_memory",
          title: "Exercise: Addresses and Pointers",
          points: 1,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Determine whether each of the following statements are true or false.

              _BLANK_______ Arrays can be resized if you need more space.
              
              _BLANK_______ The elements in an array are stored contiguously in memory.
              
              _BLANK_______ All elements in a particular array must be the same type.
              
              _BLANK_______ All individual array elements must be the same size in memory.
              
              _BLANK_______ Each array element lives at the same address in memory.
            `,
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>

              <input type="text" size="8" value="false" readonly</input> Arrays can be resized if you need more space.
              
              <input type="text" size="8" value="true" readonly</input> The elements in an array are stored contiguously in memory.
              
              <input type="text" size="8" value="true" readonly</input> All elements in a particular array must be the same type.
              
              <input type="text" size="8" value="true" readonly</input> All individual array elements must be the same size in memory.
              
              <input type="text" size="8" value="false" readonly</input> Each array element lives at the same address in memory.
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_04_2",
      title: "Arrays, Pointers, and Pointer Arithmetic",
      mk_description: dedent`
        Because an array is essentially just a sequence of objects (one for each element in the array) that are laid out contiguously in memory, we can leverage pointers (i.e. addresses) to work with arrays. Here's one example, informally:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/DyEOyWsHAUc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Let's recap the fundamental arithmetic operations with pointers. Assume \`ptr1\` and \`ptr2\` are pointers and that \`x\` is an integer.

        1. **Pointer Offset**. For example, \`ptr1 + x\`. This computes a new address, offset \`x\` "spaces" in memory past the original \`ptr1\`. The size of a "space" depends on the type that \`ptr1\` was pointing to.  
        
        2. **Pointer Difference**. For example, \`ptr2 - ptr1\`. This computes the number of spaces between the two addresses in memory.

        Note that in both cases, we don't have to worry about how many bytes are involved - the compiler takes care of that behind the scenes based on the pointer types. We can think about offsets and differences in terms of the sequences of whole objects in memory.
      `,
      questions: [
        {
          question_id: "lec04_pointer_arithmetic",
          title: "Exercise: Pointer Arithmetic",
          points: 1,
          mk_description: dedent`
            Trace this code and draw a memory diagram as you go. Once you're finished, use your diagram to answer the question below. You could also run the lobster simulation to check your work.

            <div style="text-align: center;">
              <iframe class="lobster-iframe" style="height: 600px;" src="assets/pointer_arithmetic.html"></iframe>
            </div>
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              What values are printed for each of the expressions sent to \`cout\` at the end of the program? If the expression results in undefined behavior, write "undefined".

              &nbsp;&nbsp;&nbsp;&nbsp; \`*a\` _BLANK_________ &nbsp;&nbsp;&nbsp;  \`*(a + 2)\` _BLANK_________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`a - d\` _BLANK_________

              \`b - c\` _BLANK_________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`b[2]\` _BLANK_________ &nbsp;&nbsp;&nbsp;  \`*(arr + 5)\` _BLANK_________
            `,
            sample_solution: [
              "3",
              "4",
              "0",
              "-2",
              "4",
              "undefined",
            ]
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>

              &nbsp;&nbsp;&nbsp;&nbsp; \`*a\` <input type="text" size="10" value="3" readonly</input> &nbsp;&nbsp;&nbsp;  \`*(a + 2)\` <input type="text" size="10" value="4" readonly</input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`a - d\` <input type="text" size="10" value="0" readonly</input>

              \`b - c\` <input type="text" size="10" value="-2" readonly</input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`b[2]\` <input type="text" size="10" value="4" readonly</input> &nbsp;&nbsp;&nbsp;  \`*(arr + 5)\` <input type="text" size="10" value="undefined" readonly</input>
            </details>
            
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/LaBI6fgTOAM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `,
        }
      ],
    },
    {
      section_id: "section_04_3",
      title: "Pointer Comparison Operators",
      mk_description: dedent`
        Just like we can do arithmetic with pointers by considering offsets and distances between locations in memory, we can also understand pointer comparisons naturally in terms of addresses.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ffPi8C1tXek" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        So, basically, \`ptr1 < ptr2\` will be true if and only if \`ptr1\` points to an address that is numerically lower than the address \`ptr2\` points to. Or, put another way, if \`ptr1\` is pointing somewhere before \`ptr2\` in memory. The rest of the comparison operators (\`>\`, \`<=\`, \`>=\`) work analogously.

        It's also worth noting the equality operators \`==\` and \`!=\` test whether two pointers are pointing to the same object (by checking if they hold the same address and are pointing to the same place).
      `,
      questions: [
        {
          question_id: "lec04_pointer_comparison",
          title: "Exercise: Pointer Comparison",
          points: 1,
          mk_description: dedent`
            Given an array and some pointers:

            \`\`\`cpp
            int main() {
              int arr[5] = { 5, 4, 3, 2, 1 };
              int *ptr1 = arr + 2;
              int *ptr2 = arr + 3;
            }
            \`\`\`

            Determine whether each of the following expressions evaluates to \`true\` or \`false\`.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              _BLANK_______ \`ptr1 == ptr2\`

              _BLANK_______ \`ptr1 == ptr2 - 1\`
              
              _BLANK_______ \`ptr1 < ptr2\`
              
              _BLANK_______ \`*ptr1 < *ptr2\`
              
              _BLANK_______ \`ptr1 < arr + 5\`
            `,
            sample_solution: [
              "false",
              "true",
              "true",
              "false",
              "true",
            ]
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>

              <input type="text" size="7" value="false" readonly</input> \`ptr1 == ptr2\`

              <input type="text" size="7" value="true" readonly</input> \`ptr1 == ptr2 - 1\`
              
              <input type="text" size="7" value="true" readonly</input> \`ptr1 < ptr2\`
              
              <input type="text" size="7" value="false" readonly</input> \`*ptr1 < *ptr2\`
              
              <input type="text" size="7" value="true" readonly</input> \`ptr1 < arr + 5\`
            </details>
          `,
        }
      ],
    },
    {
      section_id: "section_04_4",
      title: "Traversal by Pointer",
      mk_description: dedent`
        There are two fundamental ways to approach sequential access of the elements in an array using a loop, which we might also call "traversal" or "iteration" through the array's elements:

        - **Traversal by Index**: Start an index variable (e.g. \`i\`) at \`0\`, increase it by 1 on each iteration of the loop, and plug \`i\` into an indexing operation to find each element of the array.
        - **Traversal by Pointer**: Start a pointer (e.g. \`ptr\`) at the beginning of an array, move it forward one space in memory on each iteration, and dereference it along the way to visit each element of the array.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/NtnOo1MNoCE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        Neither traversal by pointer nor traversal by index is fundamentally better or more efficient for arrays. You might hear someone say that traversal by index is slower, but this is generally not true given that modern compilers can optimize both approaches into the same machine code. You should use the one that feels more natural to you or that matches the generally accepted pattern for the code you're writing. In most cases, that's probably traversal by index.

        However, we're taking a look at traversal by pointer now because:

        1. It's another interesting thing you can do with pointers.
        2. It is customarily used in certain contexts, like with C-style strings, which we'll look at in a future lecture.
        3. It's conceptually similar to traversal by *iterator*, which we'll learn about later on in the course.
      `,
      questions: [
        {
          question_id: "lec04_traversal_by_pointer",
          title: "Exercise: Traversal By Pointer",
          points: 3,
          mk_description: dedent`
            Which of the following code snippets correctly implement traversal by pointer? For each, indicate whether it is correct or has a bug. If it has a bug, describe what's wrong. Is it a compile error or a runtime error? How would you fix it?
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
int arr[5] = {1,2,3,4,5};

for(int *ptr = 0; ptr < 5; ++ptr) {
  cout << *ptr << endl;
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
int arr[5] = {1,2,3,4,5};

for(int *ptr = arr; ptr < arr + 5; ++ptr) {
  cout << ptr << endl;
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
int arr[5] = {1,2,3,4,5};

for(int *ptr = arr; ptr < ptr + 5; ++ptr) {
  cout << *ptr << endl;
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
            Surprise! Each of the code snippets above contains at least one mistake. If you didn't find this, double check the ones you marked as correct, or take a look this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/PEgsl2a30Sc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_04_5",
      title: "Array Parameters and Functions",
      mk_description: dedent`
        When working with arrays, it's often helpful to write helper functions that process the arrays in some way, perhaps using a loop to iterate through each element and perform some operation.

        An example of this would be a function that prints out an array...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/esTbqG1K24U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        Two big takeaways here:

        1. The compiler turns array parameters into pass-by-pointer behind the scenes. That gives us a pointer we can use to access the original array. This is similar to pass-by-reference, but technically different.

        2. Because of this, the only thing passed into an array function is a pointer to the first element. That means we have to pass the size of the original array as a separate parameter.
      `,
      questions: [
        {
          question_id: "lec04_maxValue",
          title: "Exercise: Pass-by-Pointer",
          points: 3,
          mk_description: dedent`
            Write a function called \`maxValue\` that uses **traversal-by-pointer** to find the value of the maximum element in an array.
          `,
          response: {
            kind: "iframe",
            src: "assets/maxValue.html",
            element_class: "lobster-iframe",
            element_style: "height: 825px;",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/lJ7cLJwddYI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `,
        }
      ],
    },
  ],
};