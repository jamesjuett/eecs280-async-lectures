import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_07 : ExamSpecification = {
  exam_id: "lec_07_cstrings",
  title: "C-Style Strings",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-success">
      To earn participation credit, you'll need to complete the lecture within 2 days of the lecture date.
      For lecture 7 (released Monday 2/5), that means completing it by <b>Wednesday 2/7 at 11:59pm</b>.
    </div>
    <div markdown=1 class="alert alert-info">
      In this lecture, we'll take a look at a common low-level representation for a string: an **array of characters**. We'll call this a C-style string (or cstring for short), because this is the predominant form for strings in the original C language.

      There's one additional trick to C-style strings - instead of keeping track of the length of the array of characters separately, we instead mark the end of the string data in the array with a special character called a **sentinel**. Any code processing the string keeps an eye out for the sentiel value to know when to stop.
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
      section_id: "section_06_1",
      title: "C-Style Strings",
      mk_description: dedent`
        

        Here's a brief introduction to character representations and C-style strings:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/0z_SYTVQnA0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap:
        - A cstring is a sequence of characters, living in an array, terminated by a null character (\`'\\0'\`).
        - The null character acts as a sentinel, so that code processing the cstring knows where to stop.
        - When initializing a cstring from a double-quoted string literal, the compiler automatically adds the null character.
        - It's customary to work with cstrings via traversal by pointer.

        There are three main options for creating a cstring:
        - \`const char *welcomeMsg = "Welcome to EECS 280!";\`  
          Point at a string literal. We can use it, but we don't plan to modify the contents (and the compiler enforces this with the const).  

        - \`char hexColor[] = "00274C";\`  
          Create a local array to contain a *copy* of the given cstring. The example here has space for 7 characters (6 regular plus the null character). We can modify the contents however we want, but the size is fixed.  

        - \`char filename[1024];\`  
          Create a "buffer" that may hold many different cstrings (one at a time) throughout the execution of a program. The array contains lots of space, because some strings might be longer than others. The placement of the null character lets us know the end of the current cstring living in the buffer.  
      `,
      questions: [
        {
          question_id: "lec07_null_character_mc",
          points: 4,
          mk_description: dedent`
            Which of the following are true?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "A loop using a pointer to traverse the characters in a cstring should stop when the pointer becomes null.",
              "A loop using a pointer to traverse the characters in a cstring should stop when the pointer points to a null character.",
              "Assume `char* str;` is declared and used to for traversal of a cstring in a loop. A loop condition of `while (str) {` will ensure the loop stops at the end of the string.",
              "Assume `char* str;` is declared and used to for traversal of a cstring in a loop. A loop condition of `while (*str) {` will ensure the loop stops at the end of the string.",
            ],
            multiple: true,
            sample_solution: [1,3],
            default_grader: {
              grader_kind: "summation_multiple_choice",
              rubric: [
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
      section_id: "section_06_2",
      title: "Processing C-style Strings",
      mk_description: dedent`
        For almost any operation we would like to perform on a cstring, the basic idea is that we set up a traversal by pointer loop that iterates until it happens upon the null character. As the pointer walks through the string, we perform whatever data processing or modifications we need by dereferencing the pointer to work with individual characters.

        It's generally a good idea to wrap up this kind of work in a function that can be reused wherever we need it. Let's take a look at how this plays out in code with a few examples.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/lhoW6iwCl9M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec06_strcpy",
          title: "Exercise: \`strcpy()\`",
          points: 1,
          mk_description: dedent`
            Write the function \`strcpy()\` described at the end of the video above.
          `,
          response: {
            kind: "iframe",
            src: "assets/strcpy.html",
            element_class: "lobster-iframe",
            element_style: "height: 825px;",
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

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/KOS5Oe2FvO0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `,
        }
      ],
    },
    {
      section_id: "section_06_3",
      title: "C-Style Strings vs. C++ \`string\`",
      mk_description: dedent`
        Because cstrings are just built on fundamental types like arrays, \`char\`, and pointers, you don't need to include any libraries to use them. However, many common operations for cstrings are available as functions in the \`<cstring>\` Library, which you can \`#include\` at the top of your files if you need them. You can find documentation for these in a number of places, but online resources like [http://www.cplusplus.com/reference/cstring/](http://www.cplusplus.com/reference/cstring/>) are generally a good place to start.

        You may have worked with the C++ \`string\` type in your intro programming course or other previous experience. If not, or if you're primarily familiar with strings from a different language, we encourage you to check out one of several tutorials or documentation resources available online. (If you didn't take one of the intro courses here at UM, please also feel free to reach out and I can connect you with the material on \`string\` from one of those courses.)

        In general, you should prefer to use C++ \`string\` where you can. It's an easier datatype to work with than a cstring and supports intuitive string operators like \`==\`, \`<\`, \`+\`, \`=\`, etc. Basically it works well and doesn't have some of the unpredictable quirks. (Contrast this to the fact that by its nature as an array of characters, cstring variables won't work with any of the operators just mentioned.)
        
        Why are we learning about cstrings if they're so...un-useful?
        
        - You may encounter them somewhere, for example, command-line arguments (see below) rely on cstrings.
        - It's an interesting look into a low-level representation of a string, very much similar to the way a C++ \`string\` is actually implemented internally.
        - The notion of a sentinel-terminated sequence generalizes and will show up elsewhere.
      `,
      questions: [],
    },
    {
      section_id: "section_06_6",
      title: "The Structure of \`argv\`",
      mk_description: dedent`
        Finally, let's talk about the way \`argv\` is structured in memory, which is an interesting (and somewhat complex) combination of many of the different types we've seen so far, including cstrings.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/fRfxPaOX7b4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_06_7",
      title: "Test-Driven Development",
      mk_description: dedent`
        This miscellaneous section is optional - it includes an extended example of test-driven development for a complex C-Style ADT, but it doesn't introduce any new material. It's not related to cstrings, and you're welcome to skip it. I don't present this in live lecture.

        You might consider watching this video if you:
        - Get really excited about testing code and just love it so much.
        - Don't think testing code is important at all. Then maybe you need to watch it :).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/KmuSmyR-3Bk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
};