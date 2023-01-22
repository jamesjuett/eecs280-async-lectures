import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE } from "../../common/messages";





export const LECTURE_05 = Exam.create({
  exam_id: "lec_5_compound_objects",
  title: "Compound Objects",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      In today's lecture we'll take a look at the basics of compound objects using \`struct\` definitions to create our own custom data types composed of several different members that may each have their own distinct type. These custom types allow us to model real-world objects and/or concepts and are also the foundation for building abstract data types (we'll learn more about this later).

      But first, let's take a detour to formally acknowledge the \`const\` keyeword, which has been showing up and will start showing up even more in the near future...
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
  mk_questions_message: "",
  mk_bottom_message: MK_BOTTOM_MESSAGE,
  mk_download_message: MK_DOWNLOAD_MESSAGE,
  mk_saver_message: MK_SAVER_MESSAGE,
  assets_dir: __dirname + `/assets`,
  sections: [
    {
      section_id: "section_5_1",
      title: "The `const` Keyword",
      mk_description: dedent`
        The \`const\` keyword is a _type qualifier_ that we can add to declarations to tell the compiler that we don't intend for some value to change or be changeable. For it's part, the compiler then double checks for us that we don't accidentally try to do this and gives an error if we do!

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/qgb6usquy1M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec5_const_basics",
          title: "The `const` Keyword",
          points: 1,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Provided the declarations below, which of the following assignments cause a compiler error due to a violation of \`const\`? (Write "ok" or "error".)

              \`\`\`cpp
              int x = 3;
              int const * a = &x;
              int const b = x;
              int * const c = &x;
              int const &d = x;
              \`\`\`

              _BLANK_______ \`*a = 5;\`
              
              _BLANK_______ \`b = 5;\`
              
              _BLANK_______ \`*c = 5;\`
              
              _BLANK_______ \`c = &x;\`
              
              _BLANK_______ \`d = x;\`
              
              _BLANK_______ \`a = &b;\`
              
              _BLANK_______ \`x = 5;\`
            `,
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>

              <input type="text" size="8" value="error" readonly</input> \`*a = 5;\`
              
              <input type="text" size="8" value="error" readonly</input> \`b = 5;\`
              
              <input type="text" size="8" value="ok" readonly</input> \`*c = 5;\`
              
              <input type="text" size="8" value="error" readonly</input> \`c = &x;\`
              
              <input type="text" size="8" value="error" readonly</input> \`d = x;\`
              
              <input type="text" size="8" value="ok" readonly</input> \`a = &b;\`
              
              <input type="text" size="8" value="ok" readonly</input> \`x = 5;\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_5_2",
      title: "`const` Conversions",
      mk_description: dedent`
        The compiler also needs to decide where implicit conversions involving \`const\` should be allowed. The motivating principle is that we should never leave the program "less safe" than it was before in terms of protecting \`const\` objects. Let's take a look at a few examples...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/TXvWYNNWoCI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Perhaps the most important place these rules are realized is in function call parameters. Following the rules above, the compiler will only allow a function to be called on a \`const\` object if the parameters also include the necessary \`const\` qualification to continue protecting that object. Essentially, only functions that "promise" not to change their parameters are allowed to be called on \`const\` objects/variables.

        The exercise below explores this idea...
      `,
      questions: [
        {
          question_id: "lec5_const_function_parameters",
          title: "`const` in Function Parameters",
          points: 1,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Consider these function signatures and some variables declared in a \`main()\` function. Also recall that arrays are passed by pointer, as in \`func1()\` and \`func2()\`.

              Which of the function calls in of \`main()\` would be allowed by the compiler?  (Write "ok" or "error".)

              \`\`\`cpp
              void array_func_1(const int *arr);
              void array_func_2(int *arr);
              void int_func_3(int a);

              int main() {
                const int arrA[4] = {1, 3, 2, 6};
                int arrB[3] = {5, 5, 5};
                const int num = 3;
                
                // Will the compiler allow the function calls below?

                array_func_1(arrA);  _BLANK_______
                
                array_func_1(arrB);  _BLANK_______
                
                array_func_2(arrA);  _BLANK_______
                
                array_func_2(arrB);  _BLANK_______
                
                int_func_3(num);     _BLANK_______
              }
              \`\`\`
            `,
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>
              

              \`\`\`cpp
              void array_func_1(const int *arr);
              void array_func_2(int *arr);
              void int_func_3(int a);

              int main() {
                const int arrA[4] = {1, 3, 2, 6};
                int arrB[3] = {5, 5, 5};
                const int num = 3;

                array_func_1(arrA);  // ok
                
                array_func_1(arrB);  // ok
                
                array_func_2(arrA);  // error
                
                array_func_2(arrB);  // ok
                
                int_func_3(num);     // ok
              }
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_5_3",
      title: "Compound Objects using `struct`s",
      mk_description: dedent`
        Now, back to our main event... defining and using compound objects.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/jY5AQytp2qI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap the fundamentals:
        - We can define a new compound object _type_ via a **struct definition** (e.g. \`Person\`).
        - The \`struct\` definition contains **member variable declarations**. (e.g. what components does a \`Person\` have?)
        - We define objects as **instances** of that type and use them in the program.
        - Individual members are accessed via the \`.\` operator (also called the "member access operator").

        If you've got a \`struct\` object that is const-qualified, that forbids assignment to the struct as a whole and also forbids assignment to its individual members. That fits with the idea of \`const\` as "this shouldn't change".

        Finally, we can work with structs via pointers. If you're doing that, the syntax for member access changes. For example, assume \`obj\` is a \`Person\` object and \`ptr\` is a \`Person*\` pointer that points to that object. Then you would access the person's age as either:
        - \`obj.age\`
        - \`ptr->age\`

        Use the \`.\` for objects and the \`->\` for pointers.
      `,
      questions: [
        {
          question_id: "lec5_struct_practice",
          title: "Exercise: Practice with \`structs\`",
          points: 3,
          mk_description: dedent`
            Complete each of the tasks described in the comments.
          `,
          response: {
            kind: "iframe",
            src: "assets/struct_basics.html",
            element_class: "lobster-iframe",
            element_style: "height: 850px;",
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              \`\`\`cpp
              #include <iostream>
              #include <string>
              using namespace std;

              // Task 1: Define a struct called "Sandwich" with the members listed below.
              //         Use the names given and choose an appropriate type for each.
              //  "name"    A name, e.g. "Reuben", "Tofu Bánh mì", "Chicken Shawarma"
              //  "is_veg"  A true/false value indicating whether the sandwich is vegetarian
              //  "price"   The cost to buy the sandiwch, e.g. 7.99
              struct Sandwich {
                string name;
                bool is_veg;
                double price;
              };

              int main() {
                // Task 2.1: Define and initialize a Sandwich variable as described below:
                // - You may name the variable whatever you like.
                // - The variable should be declared as const.
                // - Use the "= {}" notation to give each member a value.
                const Sandwich s = {"Falafel", true, 7.50};

                // Task 3: Create a pointer variable pointing to that Sandwich.
                const Sandwich *ptr = &s;

                // Task 4: Use the -> operator to print the name of the sandwich.
                cout << ptr->name << endl;
              }
              \`\`\`
            </details>
          `,
        }
      ],
    },
    {
      section_id: "section_5_4",
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
          question_id: "lec5_traversal_by_pointer",
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
      section_id: "section_5_5",
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
          question_id: "lec5_maxValue",
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
});