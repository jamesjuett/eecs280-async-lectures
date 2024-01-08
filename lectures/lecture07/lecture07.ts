import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_07 = Exam.create({
  exam_id: "lec_07_adts_in_c",
  title: "Abstract Data Types in C",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      As we start to work with larger, more complex programs, abstraction helps manage that complexity. We've already discussed *procedural abstraction*, i.e. using functions to break down the flow of our program into manageable sub-tasks.
      
      Today, we'll begin a series of lectures that cover **Abstract Data Types (ADTs)**, which serve as a combined abstraction for data and the functions that operate on that data.

      Specifically, we'll define some conventions for ADTs as they could be implemented in the C language (which is both the precursor to C++ and also a contemporary language that used in lower-level systems development to this day). We're starting here for a few reasons:
      
      - The C style will expose more plainly some of the basic fundamentals of ADTs.
      - More practice with pointers! (spoiler alert, we'll be using pointers)
      - Additional language features we'll see for C++ style ADTs will naturally build on the conventions we define first in the C style.
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
      section_id: "section_07_1",
      title: "Introduction to ADTs in C",
      mk_description: dedent`
        Structs form the foundation of ADTs in C, acting as a **data representation** that allows us to model heterogeneous real-world objects. What makes a full ADT is the introduction of associated **behaviors** (i.e. functions) as well as plain **data**. We implement these behaviors as associated functions, which operate on an ADT struct via a pointer parameter.

        Here's some details:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/sX2-rECyB8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec07_triangle_scale",
          title: "Exercise: `Triangle_scale()`",
          points: 3,
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

            Which of the implementations of \`Triangle_scale()\` below are correct? For each that is not correct, explain what's wrong with it.
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
      questions: [
        {
          question_id: "lec07_matrix_image_representation_invariants",
          title: "Exercise: `Matrix`/`Image` Representation Invariants",
          points: 3,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Brainstorm three representation invariants for the Matrix ADT from project 2. (At least one of these should involve the data array.)

              **Data Representation**

              \`\`\`cpp
              const int MAX_MATRIX_WIDTH = 500;
              const int MAX_MATRIX_HEIGHT = 500;
              
              struct Matrix{
                int width;
                int height;
                int data[MAX_MATRIX_WIDTH * MAX_MATRIX_HEIGHT];
              };
              \`\`\`
              
              **Representation Invariants**
              [[BOX
              
              
              
              
              ]]

              Additionally, brainstorm three representation invariants for the Image ADT from project 2. (At least one of these should involve the channel members.)

              **Data Representation**

              \`\`\`cpp
              const int MAX_INTENSITY = 255;

              struct Image {
                int width;
                int height;
                Matrix red_channel;
                Matrix green_channel;
                Matrix blue_channel;
              }
              \`\`\`
              
              **Representation Invariants**
              [[BOX
              
              
              
              
              ]]
            `,
          },
          mk_postscript: dedent`
            <hr />
            Generally, question walkthrough videos are optional - but **I recommend watching this one in particular** since since the solution is used to introduce some partially new concepts/examples that we'll build on later in the couse.

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/Wl4e6fAJs-U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
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
      title: "Composing ADTs",
      mk_description: dedent`
        
        We can build more complex ADTs that contain other ADTs. Let's look at a few examples...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/WO91KyakW-I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      
      questions: [],
    },
    {
      section_id: "section_07_5",
      title: "Unit Testing ADTs",
      mk_description: dedent`
        Of course, just as we write unit tests for functions (which are the realization of procedural abstractions in our code), we should also write tests for ADTs to ensure that the behavior of their implementation matches with their specified interface.

        Let's take a look at this with some examples for testing the \`Matrix\` ADT, including some specifics for testing C-Style ADTs without breaking their interface.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/pUla-V9vLGw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_07_6",
      title: "Testing with `stringstream`s",
      mk_description: dedent`
        If you're writing a function that performs input/output, how can you write automated unit tests?
        
        For example - if the function is supposed to take some input from the user, it's not like you can have someone sit there and type in the input every time you run your tests. Or, if the function writes output to a file, do you need to open up the file and read it back in to make sure the output was successful? That seems a bit excessive.

        Generally, the C++ approach to testing functions like these is to use \`stringstream\`s, which are special stream objects that can essentially "fake" input/output operations:
        - **Input**: Instead of reading from \`cin\` or a file-based \`ifstream\`, we pass the function an \`istringstream\` that has been pre-loaded with a string containing the planned input for testing.
        - **Output**: Instead of writing output to \`cout\` or to a file-based \`ofstream\`, we ask the function to write to an \`ostringstream\` that stores the output as a string that we can check in the rest of our testing code.

        The video below covers some preliminary information on streams in general and then walks through a few examples of using \`stringstream\`s for testing.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/7EBHrVxDe0w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec07_triangle_print_stringstream",
          title: "Exercise: Testing a `Triangle_print()` Function",
          points: 3,
          mk_description: dedent`
            Let's add a \`Triangle_print\` function for the \`Triangle\` ADT.

            \`\`\`cpp
            struct Triangle {
              double a;
              double b;
              double c;
            };
            
            void Triangle_print(const Triangle * tri, ostream &os) {
              os << "Triangle:" << endl;
              os << " side a: " << tri->a << endl;
              os << " side b: " << tri->b << endl;
              os << " side c: " << tri->c << endl;
            }
            \`\`\`
            
            For example, for a triangle with side lengths of 3, 4, and 5, the function would print:
            
            \`\`\`text
            Triangle:
             side a: 3
             side b: 4
             side c: 5
            \`\`\`

            Write a test for \`Triangle_print()\` that creates a \`Triangle\` with side lengths 3, 4, and 5 and uses a \`ostringstream\` to verify the output produced by a call to \`Triangle_print()\` is exactly the same as the example output shown above.
          `,
          response: {
            kind: "code_editor",
            codemirror_mime_type: "text/x-c++src",
            code_language: "cpp",
            header: dedent`
              #include <sstream>

              TEST(test_triangle_print_basic) {
            `,
            footer: dedent`
              }

              TEST_MAIN()
            `,
            starter: "",
            sample_solution: dedent`
              #include <sstream>

              TEST(test_triangle_print_basic) {

                Triangle t;
                Triangle_init(&t, 3, 4, 5);

                string expected = "Triangle:\n side a: 3\n side b: 4\n side c: 5\n";

                ostringstream oss;
                Triangle_print(&t, oss);
                ASSERT_EQUAL(oss.str(), expected);

              }

              TEST_MAIN()
            `
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/uyGsgTXdosw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_07_7",
      title: "Test-Driven Development",
      mk_description: dedent`
        This section is optional - it includes an extended example of test-driven development for a complex C-Style ADT, but it doesn't introduce any new material.

        You might consider watching this video if you:
        - Get really excited about testing code and just love it so much.
        - Don't think testing code is important. Then maybe you need to watch it :).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/KmuSmyR-3Bk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
});