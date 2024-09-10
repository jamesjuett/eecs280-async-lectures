import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_06 : ExamSpecification = {
  exam_id: "f24_lec_06",
  title: "Streams and I/O",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">

      **Streams** are the fundamental mechanism for text-based I/O (input/output) in C++, whether it's printing messages and taking input from the user via the terminal, reading and writing to files, or a number of other applications.

      Programs can also receive input via **command-line arguments** provided when it is initally run.

      We'll cover these as well as a number of miscellaneous topics related to programs and the command-line environment from which they run, including exit codes, input/output redirection, and pipelining.
      
      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Fall 2024</div>
      
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
      section_id: "section_06_1",
      title: "Standard Input and Output",
      mk_description: dedent`
        The familiar \`cin\` and \`cout\` variables in C++ are the realization of standard input and output streams that allow a program to communicate with its runtime environment. By default, this might be communication with a user typing at the terminal, but these streams can also be redirected to/from files or connected to other programs as part of a pipeline.

        Here's the details and several examples:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/g9Fo2FAOWWw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        
      `,
      questions: [
        {
          question_id: "lec_standard_io_mc",
          points: 4,
          mk_description: dedent`
            Consider this command run at the terminal. Assume \`filter.exe\` and \`meow.exe\` are C++ programs.

            \`\`\`console
            ./filter.exe < cats.txt | ./meow.exe
            \`\`\`
          
          Which of the following are true?
          `,
          response: {
            kind: "multiple_choice",
            choices: [
              "Reading from `cin` within the code for `filter.exe` would yield data from `cats.txt`.",
              "Standard output from `filter.exe` is being redirected to an output file.",
              "If the `meow.exe` program prints `\"MEOW\"` to `cout`, this will show at the terminal.",
              "The input via `cin` to `meow.exe` is determined by the output of `filter.exe` to `cout`.",
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
      ],
    },
    {
      section_id: "section_06_2",
      title: "File Streams",
      mk_description: dedent`
        Streams are also used for reading and writing files in C++. First, some basics:
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/msHuDHN71vs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        In the previous video, we saw that the program should \`return 1;\` if it runs into an error opening the file. This is an "exit code" or "exit status" that indicates something has gone wrong to the parent process that originally invoked the program. Now seems like a reasonable time to take a detour to talk a bit more about exit codes generally...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/wh7okv03l6o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [

      ],
    },
    {
      section_id: "section_06_3",
      title: "Patterns for File Input in C++",
      mk_description: dedent`
      
      File input can be fairly complex, but there are a few common patterns that tend to work well. These depend on a some specifics of the stream operators and interface in C++, so we'll introduce those first.

      <div style="text-align: center;">
        <iframe class="lec-video" src="https://www.youtube.com/embed/nBUfC4PYtFg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <br />

      Now, on to some common patterns (and anti-patterns!) for file input in C++...
      
      <div style="text-align: center;">
        <iframe class="lec-video" src="https://www.youtube.com/embed/625r53MiaI8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <br />
      `,
      questions: [],
    },
    {
      section_id: "section_06_4",
      title: "Stream Functions and Unit Testing with Stringstreams",
      mk_description: dedent`
        This section addresses a few design considerations for functions that performs input/output.
        
        First, it's generally best to pass generic \`ostream\` or \`istream\` objects to the function, so that it can potentially be used with any different kind of stream (e.g. sometimes write output to \`cout\` and other times to a file through an \`ofstream\`).
        
        Additionally, how can you write automated unit tests for the function? (You can't just have someone sit there and type input via \`cin\` every time you want to run tests.) Instead, use \`stringstream\`s - special stream objects that can essentially "fake" input/output operations.

        The video below covers both in more detail.

        <div class="alert alert-secondary" role="alert" markdown="1">
          <h5><span class="badge badge-success">Fall 2024</span></h5>
          Please disregard the use of the \`new\` and \`delete\` operators in the video below. We've modified project 2 such so that you do not need to use them.
        </div>

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/a8c4coHtvKg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_06_5",
      title: "Command Line Arguments",
      mk_description: dedent`
        One last place we might like to take in input - when the program is originally launched from the terminal. For example, in project 2, the image resizing program takes arguments that look something like this:

        \`\`\`console
        ./resize.exe horses.ppm horses_400x250.ppm 400 250
        \`\`\`

        Let's take a look at how this works in C++:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/3JPzvVsuoCg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_06_6",
      title: "Exercise: Word Count",
      mk_description: dedent`
        In this exercise, implement a program that counts the number of words in a set of files, which are specified by providing their filenames as command line arguments.

        If a particular file does not open successfully, the program should print "Skipping file: " with the associated filename and continue on to the next file.
        
        ##### \`wordcount.exe\` Example

        Assume these files are present in the current working directory:

        <table>
          <tr>
            <th>File Name</th>
            <th>Contents</th>
          </tr>
          <tr>
            <td><code>greeting.txt</code></td>
            <td>
              <code>
                hello world!
              </code>
            </td>
          </tr>
          <tr>
            <td><code>fav_class.txt</code></td>
            <td>
              <code>
                EECS 280 is awesome :)
              </code>
            </td>
          </tr>
          <tr>
            <td><code>fav_colors.txt</code></td>
            <td>
              <code>
                red blue green
              </code>
            </td>
          </tr>
        </table>

        If the program was compiled to \`wordcount.exe\` and run as:

        \`\`\`console
        ./wordcount.exe greeting.txt aaaaa.txt fav_class.txt
        \`\`\`

        The output to \`cout\` would be:
        \`\`\`text
        greeting.txt has 2 words.
        Skipping file: aaaaa.txt
        fav_class.txt has 5 words.
        7 words in total.
        \`\`\`
        
        (Note that \`fav_colors.txt\` was not specified and therefore ignored.)
      `,
      questions: [
        {
          question_id: "lec_word_count",
          points: 8,
          mk_description: dedent`
            Implement the program by filling in the boxes below.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              \`\`\`cpp
              #include <string>
              #include <iostream>
              #include <fstream>
              
              using namespace std;
              
              // MODIFIES: The given input stream
              // EFFECTS:  Reads all input from the given input stream and returns the
              //           number of words in the input (with words separated from each
              //           other by whitespace).
              int word_count(______________BLANK______________ input) {
                
                string word;
                int count = 0;
                while(______________BLANK______________) {
                  ++count;
                }
                return count;
              }
              
              int main(int argc, char *argv[]) {
                int total = 0;
                for(int i = ______BLANK______; __________BLANK__________; ++i) {
                  string filename = ____________BLANK____________;
                  ifstream fin(____________BLANK____________);
              
                  if (____________BLANK____________) {
                    cout << "Skipping file: " << filename << endl;
                    continue;
                  }
                  int wc = ____________BLANK____________;
                  cout << filename << " has " << wc << " words." << endl;
                  total += wc;

                  fin.close(); // technically not needed since fin is going out of scope each iteration
                }
                
                cout << total << " words in total." << endl;
              }
              \`\`\`
            `,
            sample_solution: [
              "istream & or ifstream &",
              "input >> word",
              "1",
              "i < argc",
              "argv[i]",
              "filename",
              "!fin.is_open()",
              "filename",
              "word_count(fin)",
              "filename",
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
                      pattern: /^\s*istream\s*&\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /^\s*ifstream\s*&\s*$/i,
                      explanation: "While an `ifstream&` will work for this specific case, the function should take an `istream&` to be as flexible as possible.",
                      points: 0
                    },
                    {
                      pattern: /./i,
                      explanation: "The parameter type should be `istream &`.",
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
                      pattern: /input\s*>>\s*word/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Use `input >> word` to read each word until the end of stream input.",
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
                      pattern: /^\s*1\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The loop should begin with `int i = 1;`. (The argument at index 0 is the name of the program, which we don't need.)",
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
                      pattern: /i\s*<\s*argc/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The loop should continue as long as `i < argc`.",
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
                      pattern: /argv\s*\[\s*i\s*\]/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Each argument represents a filename, retrieved by using `argv[i]`.",
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
                      pattern: /filename/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /argv\s*\[\s*i\s*\]/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Either `filename` or `argv[i]` should be used to open the input file stream.",
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
                      pattern: /^\s*!\(?\s*fin\.is.?open\(?\)?\s*\)?\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Check whether the file stream has failed to open with `!fin.is_open()`;",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 8,
                  title: "Box 8",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /^\s*word.?count\s*\(\s*fin\s*\)\s*;?\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Call the function `word_count(fin)`.",
                      points: 0
                    },
                  ]
                },
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit"
          }
        }
      ],
    },
  ],
};