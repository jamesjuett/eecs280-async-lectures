import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_05 : ExamSpecification = {
  exam_id: "lec_05_const_structs_c_style_adts",
  title: "`const`, `struct`s, and C-Style ADTs",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-success">
        
      To earn participation credit, you'll need to complete the lecture within 2 days of the lecture date.
      For lecture 5 (released Monday 1/29), that means completing it by <b>Wednesday 1/31 at 11:59pm</b>.
    </div>
    <div markdown=1 class="alert alert-info">
      As we start to work with larger, more complex programs, abstraction helps manage that complexity. We've already discussed *procedural abstraction*, i.e. using functions to break down the flow of our program into manageable sub-tasks.
        
      Today, we'll introduce **Abstract Data Types (ADTs)**, which serve as a combined abstraction for data and the functions that operate on that data.

      Specifically, we'll define some conventions for ADTs as they could be implemented in the C language (which is both the precursor to C++ and also a contemporary language that used in lower-level systems development). We're starting here for a few reasons:
    
      - The C style will expose more plainly some of the basic fundamentals of ADTs.
      - More practice with pointers! (spoiler alert, we'll be using pointers)
      - Additional language features we'll see for C++ style ADTs will naturally build on conventions we define first in the C style.

      <!-- terminate list -->

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
  mk_questions_message: MK_QUESTIONS_MESSAGE,
  mk_bottom_message: MK_BOTTOM_MESSAGE,
  mk_download_message: MK_DOWNLOAD_MESSAGE,
  mk_saver_message: MK_SAVER_MESSAGE,
  assets_dir: __dirname + `/assets`,
  allow_clientside_content: true,
  completion: {
    threshold: 1,
    tooltip: "",
    endpoints: {
      check: "https://examma-ray.eecs.umich.edu/public_api/participation/me/",
      submit: "https://examma-ray.eecs.umich.edu/public_api/participation/me/",
    }
  },
  credentials_strategy: {
    strategy: "google_local",
    client_id: "444801118749-m2g9gl3gvvkh5ru959dmka0lsk94d9uq.apps.googleusercontent.com",
    message: "Sign in with your @umich.edu Google account to earn participation credit for completing embedded exercises.",
  },
  sections: [
    {
      section_id: "section_05_1",
      title: "The `const` Keyword",
      mk_description: dedent`
        The \`const\` keyword is a _type qualifier_ that we can add to declarations to tell the compiler that we don't intend for some value to change or be changeable. For it's part, the compiler then double checks for us that we don't accidentally try to do this and gives an error if we do!

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/69d4M_Kj0bQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec05_const_basics",
          title: "The `const` Keyword",
          points: 7,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Provided the declarations below, which of the following assignments cause a compiler error due to a violation of \`const\`? (Write "ok" or "error".)

              \`\`\`cpp
              int x = 3;
              int const y = x;
              int const * ptr1 = &x;
              int * const ptr2 = &x;
              int const &ref = x;
              \`\`\`

              _BLANK_______ \`y = 5;\`

              _BLANK_______ \`*ptr1 = 5;\`
              
              _BLANK_______ \`ptr1 = &y;\`
              
              _BLANK_______ \`*ptr2 = 5;\`
              
              _BLANK_______ \`ptr2 = &x;\`
              
              _BLANK_______ \`ref = 5;\`
              
              _BLANK_______ \`x = 5;\`
            `,
            sample_solution: [
              "error",
              "error",
              "ok",
              "ok",
              "error",
              "error",
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
                      pattern: /error|illegal|not.*legal|not.*allowed|wrong/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The compiler will not allow it. Answer = \"error\".",
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
                      pattern: /error|illegal|not.*legal|not.*allowed|wrong/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The compiler will not allow it. Answer = \"error\".",
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
                      pattern: /ok|allowed|legal/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The compiler will allow it. Answer = \"ok\".",
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
                      pattern: /ok|allowed|legal/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The compiler will allow it. Answer = \"ok\".",
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
                      pattern: /error|illegal|not.*legal|not.*allowed|wrong/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The compiler will not allow it. Answer = \"error\".",
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
                      pattern: /error|illegal|not.*legal|not.*allowed|wrong/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The compiler will not allow it. Answer = \"error\".",
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
                      pattern: /ok|allowed|legal/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The compiler will allow it. Answer = \"ok\".",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/8EwC3-wOLJs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `,
        }
      ],
    },
    {
      section_id: "section_05_2",
      title: "`const` Conversions",
      mk_description: dedent`
        The compiler also needs to decide where implicit conversions involving \`const\` should be allowed. The motivating principle is that we should never leave the program "less safe" than it was before in terms of protecting \`const\` objects. Let's take a look at a few examples...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/322bUCMVqTw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Perhaps the most important place these rules are realized is in function call parameters. Following the rules above, the compiler will only allow a function to be called on a \`const\` object if the parameters also include the necessary \`const\` qualification to continue protecting that object. Essentially, only functions that "promise" not to change their parameters are allowed to be called on \`const\` objects/variables.

        The exercise below explores this idea...
      `,
      questions: [
        {
          question_id: "lec05_const_function_parameters",
          title: "`const` in Function Parameters",
          points: 1,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Consider these function signatures and some variables declared in a \`main()\` function. Also recall that arrays are passed by pointer, as in \`teal()\` and \`red()\`.

              One of the function calls in \`main()\` below is "sus" (i.e. suspicious), in that it would put potentially put \`const\` objects at risk if the compiler allowed it. Can you find which one?

              \`\`\`cpp
              void teal(const int *a);
              void red(int *a);
              void purple(int a);

              int main() {
                const int arr1[6] = { ... };
                int arr2[6] = { ... };
                
                teal(arr1);
                red(arr1);
                purple(arr1[0]);
                
                teal(arr2);
                red(arr2);
                purple(arr2[0]);
              }
              \`\`\`

              For which function call does the compiler produce an error? Briefly explain why.

              [[BOX]]
            `,
            sample_solution: [
              "The compiler will prohibit the call to red(arr1) since the parameter does not maintain the const. If the call were allowed, the implementation of red could then potentially change data in the arr1 array, which was supposed to be const."
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
                      pattern: /red.*(arr|array).*1|red.*(first|1st).*arr|(arr|array).*1.*red|(first|1st).*arr.*red/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /purple|teal|arr2/i,
                      explanation: "All calls except `red(arr1)` are ok. Check the walkthrough video for details.",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/lXgZiHVwMuk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `,
        }
      ],
    },
    {
      section_id: "section_05_3",
      title: "Intro to `struct`s",
      mk_description: dedent`
        Now, back to our main event... defining and using compound objects.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/BiKWgQwhCjI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap the fundamentals:
        - We can define a new compound object _type_ via a **struct definition** (e.g. \`Person\`).
        - The \`struct\` definition contains **member variable declarations**. (e.g. what components does a \`Person\` have?)
        - We define objects as **instances** of that type and use them in the program.
        - Individual members are accessed via the \`.\` operator (also called the "**member access operator**").

        If you've got **a \`struct\` object that is const-qualified**, that forbids assignment to the struct as a whole and also forbids assignment to its individual members. That fits with the idea of \`const\` as "this shouldn't change".

        Finally, we can **work with structs via pointers**. If you're doing that, the syntax for member access changes. For example, assume \`obj\` is a \`Person\` object and \`ptr\` is a \`Person*\` pointer that points to that object. Then you would access the person's age as either:
        - \`obj.age\`
        - \`ptr->age\`

        Use the \`.\` for objects and the \`->\` for pointers.
      `,
      questions: [
        {
          question_id: "lec05_struct_practice",
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
                // Task 2: Define and initialize a Sandwich variable as described below:
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
          verifier: {
            verifier_kind: "full_credit"
          }
        }
      ],
    },
    {
      section_id: "section_05_4",
      title: "\`struct\`s and Functions",
      mk_description: dedent`
        We'll want to package up complex operations on \`struct\`s into functions to form abstractions. Let's take a look...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/IUSHt787vJc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        This is a good time to review the general best practices for parameter passing:
        - If you need to modify the original object, use **pass-by-pointer** or **pass-by-reference**.
        - If you don't modify the original object, use **pass-by-pointer-to-const** or **pass-by-reference-to-const**. This protects against accidental modification but more importantly also ensures your function can actually be called on const objects.
        - Only use **pass-by-value** for fundamental objects (e.g. \`int\`, \`double\`, etc.) or very small compound objects. If the objects are large (e.g. \`string\`, \`vector\`, your own custom \`struct\`s, etc.), pass-by-value makes an expensive and unnecessary copy.
      `,
      
      questions: [
        {
          question_id: "lec05_person_birthday",
          title: "Exercise: \`struct\`s and Functions",
          points: 4,
          mk_description: dedent`
            Each of the following implementations of \`Person_birthday()\` has a problem - some will not compile while others will run but ultimately not work as expected. Describe what the problem is and one way to fix it.
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
void Person_birthday(const Person *p) {
  ++p->age;
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
void Person_birthday(Person p) {
  ++p.age;
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
void Person_birthday(Person *p) {
  *(p.age)++;
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
void Person_birthday(Person &p) {
  ++p->age;
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
                      pattern: /.{10,}/i,
                      explanation: "This is just graded for completion. The comments in the sample solution describe the problem with each.",
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
                      pattern: /.{10,}/i,
                      explanation: "This is just graded for completion. The comments in the sample solution describe the problem with each.",
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
                      pattern: /.{10,}/i,
                      explanation: "This is just graded for completion. The comments in the sample solution describe the problem with each.",
                      points: 1
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
                      pattern: /.{10,}/i,
                      explanation: "This is just graded for completion. The comments in the sample solution describe the problem with each.",
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
              
              \`\`\`cpp
              // Version 1
              // There shouldn't be a const in the parameter,
              // since this function IS intended to change
              // the Person it's called on.
              void Person_birthday(const Person *p) {
                ++p->age;
              }
              \`\`\`

              \`\`\`cpp
              // Version 2
              // The pass-by-value parameter should be pass-by-reference,
              // otherwise, we can't adjust the original Person's age.
              void Person_birthday(Person p) {
                ++p.age;
              }
              \`\`\`

              \`\`\`cpp
              // Version 3
              // The parentheses here are misplaced. They need to be
              // placed as (*p).age++, otherwise the compiler attempts
              // to do the ++ before the *, which won't work.
              void Person_birthday(Person *p) {
                *(p.age)++;
              }
              \`\`\`

              \`\`\`cpp
              // Version 4
              // The -> operator can be used as a convenient shorthand
              // for member variable access through a pointer, but not
              // through a reference. For a reference, just use the .
              // operator directly like: ++p.age
              void Person_birthday(Person &p) {
                ++p->age;
              }
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_07_1",
      title: "C-Style ADTs",
      mk_description: dedent`
        Structs form the foundation of ADTs in C, acting as a **data representation** that allows us to model heterogeneous real-world objects. What makes a full ADT is the introduction of associated **behaviors** (i.e. functions) as well as plain **data**. We implement these behaviors as associated functions, which operate on an ADT struct via a pointer parameter.

        Here's some details:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/tyO29QSsV3g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec07_triangle_scale",
          title: "Exercise: `Triangle_scale()`",
          points: 5,
          mk_description: dedent`
            Let's say we want to add a function to scale a triangle by a given factor. Here's an example:

            \`\`\`cpp
            struct Triangle {
              double a, b, c;
            };
            
            int main() {
              Triangle t1 = { 2, 2, 2 };
              cout << Triangle_perimeter(&t1) << endl; // prints 6
              
              Triangle_scale(&t1, 2); // Scale up by a factor of 2
              
              cout << Triangle_perimeter(&t1) << endl; // prints 12
            }
            \`\`\`

            Which of the implementations of \`Triangle_scale()\` below are correct? Write **"correct"** or **"incorrect"**. For each that is not correct, explain what's wrong with it.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
// Implementation #1
void Triangle_scale(const Triangle *tri, double s) {
  tri->a *= s;
  tri->b *= s;
  tri->c *= s;
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
// Implementation #2
void Triangle_scale(Triangle *tri, double s) {
  a *= s;
  b *= s;
  c *= s;
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
// Implementation #3
void Triangle_scale(double s) {
  t1.a *= s;
  t1.b *= s;
  t1.c *= s;
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
// Implementation #4
void Triangle_scale(Triangle *tri, double s) {
  tri->a *= s;
  tri->b *= s;
  tri->c *= s;
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
// Implementation #5
void Triangle_scale(Triangle tri, double s) {
  tri.a *= s;
  tri.b *= s;
  tri.c *= s;
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
                      explanation: "The implementation is incorrect. The comments in the sample solution give more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. The comments in the sample solution give more details.",
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
                      pattern: /incorrect/i,
                      explanation: "The implementation is incorrect. The comments in the sample solution give more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. The comments in the sample solution give more details.",
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
                      pattern: /incorrect/i,
                      explanation: "The implementation is incorrect. The comments in the sample solution give more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. The comments in the sample solution give more details.",
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
                      pattern: /incorrect/i,
                      explanation: "The implementation is correct. The comments in the sample solution give more details.",
                      points: 0
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is correct. The comments in the sample solution give more details.",
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
                      pattern: /incorrect/i,
                      explanation: "The implementation is incorrect. The comments in the sample solution give more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. The comments in the sample solution give more details.",
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
            <details>
              <summary>Sample solution...</summary>
              
              \`\`\`cpp
              // Implementation #1
              // **Incorrect** - there should not be a const on the Triangle
              // parameter because the function needs to modify its members
              void Triangle_scale(const Triangle *tri, double s) {
                tri->a *= s;
                tri->b *= s;
                tri->c *= s;
              }
              \`\`\`

              \`\`\`cpp
              // Implementation #2
              // **Incorrect** - the member variables a, b, and c must be
              // accessed through the pointer tri, e.g. tri->a
              void Triangle_scale(Triangle *tri, double s) {
                a *= s;
                b *= s;
                c *= s;
              }
              \`\`\`

              \`\`\`cpp
              // Implementation #3
              // **Incorrect** - t1 is not in scope for this function.
              // Instead, a pointer to the triangle to work with should
              // be passed in to the function (e.g. pointing at t1).
              void Triangle_scale(double s) {
                t1.a *= s;
                t1.b *= s;
                t1.c *= s;
              }
              \`\`\`

              \`\`\`cpp
              // Implementation #4
              // **Correct**
              void Triangle_scale(Triangle *tri, double s) {
                tri->a *= s;
                tri->b *= s;
                tri->c *= s;
              }
              \`\`\`

              \`\`\`cpp
              // Implementation #5
              // **Incorrect** - because the triangle is passed by
              // value, the scaling modification is made to a copy
              // and the original triangle remains unchanged
              void Triangle_scale(Triangle tri, double s) {
                tri.a *= s;
                tri.b *= s;
                tri.c *= s;
              }
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_07_2",
      title: "ADT Initialization and Representation Invariants",
      mk_description: dedent`
        An essential component of proper ADT design is the use of **representation invariants** to express conditions that differentiate valid data (e.g. a Triangle with sides 3, 4, and 5) from invalid, nonsense values (e.g. one of the side lengths is -10).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/cvtrJPdnZsY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        There are two main perspectives on representation invariants when you're implementing code:
        1. There's a responsibility to ensure the invariants are followed and aren't broken by bad code (e.g. don't allow creating an invalid \`Triangle\` with negative side lengths).
        2. You may assume the invariants are true when implementing ADT functions, kind of like an implicit \`REQUIRES\` clause (e.g. when implementing \`Triangle_scale()\` we don't need to worry about "what if the sides are negative??").

        \\#1 is a bit of extra work we put in so that we can rely on \\#2.
      `,
      questions: [],
    },
    {
      section_id: "section_07_3",
      title: "Interfaces and Implementations",
      mk_description: dedent`

      Just a few high level comments on the relationship between interfaces and implementations in ADT design...

      <div style="text-align: center;">
        <iframe class="lec-video" src="https://www.youtube.com/embed/GSjBT7UusRU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <br />
      `,
      questions: [],
    },
    {
      section_id: "section_07_4",
      title: "ADTs in Project 2",
      mk_description: dedent`
        
        Let's take a quick look at the way abstraction is used in project 2 to build \`Matrix\` and \`Image\` ADTs.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/n6DKUrWNyec" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Additionally, a technical detail relevant for the project... because the structs are very large, their memory must be managed using the \`new\` and \`delete\` operators.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ozS3b_4UzxE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      
      questions: [
        {
          question_id: "lec05_adts_in_project_2",
          points: 4,
          mk_description: dedent`
            Which of the following are true about ADTs in project 2?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "The `Matrix` and `Image` structs must be manually created using `new` and destroyed using `delete`.",
              "The `Image_init()` function implementations should call `Matrix_init()` on each color channel member.",
              "The code you'll write for the image processing algorithm should directly access the `data` array in each `Matrix`.",
              "The `Matrix` ADT provides a 2D grid as an abstraction, built on top of an internal 1D array.",
            ],
            multiple: true,
            sample_solution: [0,1,3],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
                {points: 1, selected: true},
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
      section_id: "section_07_5",
      title: "Unit Testing ADTs",
      mk_description: dedent`
        Of course, just as we write unit tests for functions (which are the realization of procedural abstractions in our code), we should also write tests for ADTs to ensure that the behavior of their implementation matches with their specified interface.

        Let's take a look at this with some examples for testing the \`Matrix\` ADT, including some specifics for testing C-Style ADTs without breaking their interface.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/z6qniEWelyE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
};