import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_07 : ExamSpecification = {
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
    <script>
      alert("Warning: The content of this lecture will change significantly in W24. Don't work through it early.")
    </script>
  `,
  mk_questions_message: MK_QUESTIONS_MESSAGE,
  mk_bottom_message: MK_BOTTOM_MESSAGE,
  mk_download_message: MK_DOWNLOAD_MESSAGE,
  mk_saver_message: MK_SAVER_MESSAGE,
  assets_dir: __dirname + `/assets`,
  allow_clientside_content: true,
  sections: [
    
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
};