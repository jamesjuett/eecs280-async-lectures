import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE } from "../../common/messages";





export const LECTURE_07 = Exam.create({
  exam_id: "lec_7_adts_in_c",
  title: "Abstract Data Types in C",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      As we start to work with larger, more complex programs, we'll leverage abstraction to help manage that complexity. We've already discussed *procedural abstraction*, i.e. using functions to break down the flow of our program into manageable sub-tasks.
      
      Today, we'll begin a series of lectures that cover **Abstract Data Types (ADTs)**, which serve as a combined abstraction for data and the functions that operate on that data.

      Specifically, we'll define some conventions for ADTs as they could be implemented in the C language (which is both the precursor to C++ and also a language that still sees use in lower-level systems development to this day). We're starting here for a few reasons:
      
      - The C style will expose more plainly some of the basic fundamentals of ADTs
      - More practice with pointers! (spoiler alert, we'll be using pointers)
      - Additional language features we'll see for C++ style ADTs will naturally build on the conventions we define first in the C style
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
      section_id: "section_7_1",
      title: "C-Style Strings",
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
          question_id: "lec5_person_birthday",
          title: "Exercise: Functions and \`struct\`s",
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
      section_id: "section_7_2",
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
          question_id: "lec7_strcpy",
          title: "Exercise: \`strcpy()\`",
          points: 3,
          mk_description: dedent`
            Write the function \`strcpy()\` described at the end of the video above.
          `,
          response: {
            kind: "iframe",
            src: "assets/strcpy.html",
            element_class: "lobster-iframe",
            element_style: "height: 825px;",
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
      section_id: "section_7_3",
      title: "C-Style Strings vs. C++ \`string\`",
      mk_description: dedent`
        Because cstrings are just built on fundamental types like arrays, \`char\`, and pointers, you don't need to include any libraries to use them. However, many common operations for cstrings are available as functions in the \`<cstring>\` Library, which you can \`#include\` at the top of your files if you need them. You can find documentation for these in a number of places, but online resources like [http://www.cplusplus.com/reference/cstring/](http://www.cplusplus.com/reference/cstring/>) are generally a good place to start.

        You may have worked with the C++ \`string\` type in your intro programming course or other previous experience. If not, or if you're primarily familiar with strings from a different language, we encourage you to check out one of several tutorials or documentation resources available online. (If you didn't take one of the intro courses here at UM, please also feel free to reach out and I can connect you with the material on \`string\` from one of those courses.)

        In general, you should prefer to use C++ \`string\` where you can. It's an easier datatype to work with than a cstring and supports intuitive string operators like \`==\`, \`<\`, \`+\`, \`=\`, etc. Basically it works well and doesn't have some of the unpredictable quirks. (Contrast this to the fact that by its nature as an array of characters, cstring variables won't work with any of the operators just mentioned.)
        
        Why are we learning about cstrings if they're so...un-useful?
        
        - Sometimes you need to use them, for example, command-line arguments (see below) rely on cstrings.
        - It's an interesting look into a low-level representation of a string, very much similar to the way a C++ \`string\` is actually implemented internally.
        - The notion of a sentinel-terminated sequence generalizes and will show up elsewhere.
        - More practice with pointers! Yay. :)
      `,
      questions: [],
    },
    {
      section_id: "section_7_4",
      title: "Input and Output Streams",
      mk_description: dedent`
        
        **Streams** are the fundamental mechanism for text-based I/O (input/output) in C++, whether it's printing messages and taking input from the user via the terminal, reading and writing to files, or a number of other applications.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/CLW-DIZ5AOw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        For reference, here is the final example from the video:

        \`\`\`cpp
        #include <iostream>
        #include <string>
        #include <fstream>
        
        using namespace std;
        
        int main() {
        
          string inName = "in.txt";
          string outName = "out.txt";
        
          cout << "Copying from " << inName << " to " << outName << endl;
        
          string wordToRemove;
          cout << "What word would you like to remove? ";
          cin >> wordToRemove;
        
          ifstream fin(inName);
          ofstream fout(outName);
          if ( !fin.is_open() ) {
            cout << "Unable to open " << inName << endl;
            return 1;
          }
          
          if ( !fout.is_open() ) {
            cout << "Unable to open " << outName << endl;
            return 1;
          }
        
          string word;
          while (fin >> word) {
            if (word != wordToRemove) { fout << word << " "; }
            else { fout << "*****" << " "; }
          }
        
          fin.close();
          fout.close();
        }
        \`\`\`

        Here's another example, which also showcases the \`stoi()\` function, which converts from a \`string\` to the \`int\` value that it represents. In this case, we want to read a sequence of numbers from the user via \`cin\` and add them together. The user may enter as many numbers as they like and then types \`"done"\` to indicate they are finished. Because we need to accommodate both numbers and a string, we use the most general type - \`string\` and then convert to an \`int\` where appropriate using \`stoi\`.

        \`\`\`cpp
        #include <iostream>
        #include <string>
        
        using namespace std;
        
        int main() {
          int sum = 0;
          string word;
          while (cin >> word && word != "done") {
            sum += stoi(word);
          }
          cout << "sum is " << sum << endl;
        }
        \`\`\`
      `,
      
      questions: [],
    },
    {
      section_id: "section_7_5",
      title: "Command Line Arguments",
      mk_description: dedent`
        One last place we might like to take in input - when the program is originally launched from the terminal. For example, if we're running the "redact" program from the previous section, perhaps we'd like to specify the word to redact, the input/output files, and the number of "*****" to use as extra arguments we first run the program:

        \`\`\`console
        ./redact bee in.txt out.txt 10
        \`\`\`

        Let's take a look at how this works in C++:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/mXJA13Go9qk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To get an argument out of \`argv\`, you generally just use indexing, e.g. \`argv[x]\` where \`x\` is the index of the argument you want. Remember that the argument at index \`0\` is just the name of the executable, so your "real" arguments will start indexed at \`1\`.

        Once you have an argument, there are three things you might want to do with it:

        1. \`string wordToRemove = argv[1];\`  
           Immediately convert it to a C++ string (e.g. by storing in a \`string\` variable). C++ strings are MUCH easier to work with and support convenient operators like \`==\`.  
           
        2. \`ifstream fin(argv[2]);\`  
           \`ofstream fout(argv[3]);\`  
           Use it directly somewhere that a cstring is readily accepted. For example, an \`ifstream\` or \`ofstream\` can be constructed from a cstring with the name of an input/output file.  

        3. \`int redactLength = atoi(argv[4]);\`  
           For arguments you want to interpret as a number (rather than a "string of digits"), convert it to an \`int\` using \`atoi()\` or to a \`double\` using \`atof()\`. (Or, if you already converted to a C++ \`string\`, use \`stoi()\` or \`stod()\`.)  

        If you like, you can always start with option #1. It's almost never a bad idea to go ahead and switch over to a C++ \`string\` where you can.

        Again, for reference, here's the final code for the "redact" example, modified to use command line arguments as shown in the video.

        \`\`\`cpp
        #include <iostream>
        #include <string>
        #include <fstream>
        
        using namespace std;
        
        int main(int argc, char *argv[]) {
        
          // Usage message shown if the user runs with incorrect command line args
          if (argc != 5) {
            cout << "Usage: redact WORD INFILE OUTFILE NUM_STARS" << endl;
            return 1;
          }
        
          string inName = argv[2];
          string outName = argv[3];
        
          cout << "Copying from " << inName << " to " << outName << endl;
        
          string wordToRemove = argv[1];
          int numStars = atoi(argv[4]); // to double - atof()
          string replacement(numStars, '*'); // e.g. numStars is 3, makes ***
        
          ifstream fin(inName);
          ofstream fout(outName);
          if ( !fin.is_open() ) {
            cout << "Unable to open " << inName << endl;
            return 1;
          }
          
          if ( !fout.is_open() ) {
            cout << "Unable to open " << outName << endl;
            return 1;
          }
        
          string word;
          while (fin >> word) {
            if (word != wordToRemove) { fout << word << " "; }
            else { fout << replacement << " "; }
          }
        
          fin.close();
          fout.close();
        }
        
        \`\`\`
      `,
      questions: [],
    },
    {
      section_id: "section_7_6",
      title: "The Structure of \`argv\`",
      mk_description: dedent`
        Finally, let's talk about the way \`argv\` is structured in memory, which is an interesting (and somewhat complex) combination of many of the different types we've seen so far.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/fRfxPaOX7b4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
});