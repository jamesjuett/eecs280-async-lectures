import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const INTRO : Omit<ExamSpecification, "exam_id"> = {
  title: "Course Introduction, Intro to C++",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      Welcome to **EECS 280**! This lecture presents our motivations and big-picture goals, some course logistics, and an introduction to programming in C++.
      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Fall 2025</div>
    </div>

    <div markdown=1 class="alert alert-success">
      <b>Participation credit</b> for async lectures is automatically recorded once you complete
      the embedded exercises. Take a look at the top left of the page. You'll need to <b>sign in</b> with
      your @umich.edu Google account so that we know it's you.
      
      Completion of individual exercises is tracked in the navigation panel to the left and section headers within the page. Once all exercises are complete, you'll see a "Completion Verified" message.

      To earn participation credit, complete the lecture by 11:59pm on the day the lecture is scheduled.
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
      section_id: "section_01_1",
      title: "Introductions, The Big Picture",
      mk_description: dedent`
        Hello! Let's get started with EECS 280!

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/8vEKA0Znpzk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        A few notes for async lectures:
        - They cover the same material as the regular lectures and are kept up-to-date with any changes for the current term.
        - It's just as important as with live lectures to keep up with the material. Async participation is due by 11:59pm the day of the lecture.
        - Generally speaking, I'll post the lectures several days ahead of time so you have a bit more flexibility in when to do them.
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_2",
      title: "Course Essentials",
      mk_description: dedent`

        Let's take a look at the major components of EECS 280 and course resources, all accessible from our website at [eecs280.org](https://eecs280.org).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/-ONgvp2xLJc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Don't worry if this all seems a bit overwhelming. There are a lot of different components to the course and a bunch of different resources to get used to. You can find everything from [eecs280.org](https://eecs280.org), and we'll try to keep it up-to-date with the most relevant material. I also highly encourage that you ask questions if you're feeling lost - on Ed, Discord, in office hours, in lab, etc.

        **Setup Tutorials**  
        Here's my recommended approach to getting your computer set up for C++ development (i.e. in the text bubbles below):
        
        <div style="text-align: center;">
          <img src="assets/tutorials.png" style="width: 600px;">
        </div>
        <br />

        **Computer/C++ Setup Walkthrough Sessions**  
        Join us for a live walkthrough session via Zoom on C++ development including set up, compilers, makefiles, C++ IDEs, EECS 280 project workflow, and open Q&A.
        - Tuesday, Aug 26 at 3-4:30pm via Zoom.
        - Separate, concurrent sessions for Windows/Mac.
        - Links on eecs280.org. Recordings will be posted.

        **Setup Support**  
        If you run into any issues with setup, please stop by office hours sometime later this week.

        **Syllabus**  
        For more details, course polices, etc. - check out our course syllabus at [eecs280.org/syllabus.html](https://eecs280.org/syllabus.html).

        **Course Schedule**  
        Reminder - the [schedule](https://eecs280.org/#schedule) for the entire term including all assignments and exams is available via the website. It's worth taking a look ahead now and noting any significant dates.
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_3",
      title: "Evaluation and Grading",
      mk_description: dedent`
        Here's a very quick look at assignments, exams, and grading policies in EECS 280.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Zda5HC44oew" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        <div class="alert alert-secondary" role="alert" markdown="1">
          <h5><span class="badge badge-primary">Fall 2025</span></h5>
          One quick difference for this term from the video above - we're introducing quizzes during some lab sessions, taken electronically on your own laptop/tablet. The quizzes are intended to provide formative evaluation and feedback and will include questions covering material from lecture, lab, and projects. Quizzes are worth 5% of the overall grade, and the lowest quiz score will be dropped. (The 5% for quizzes comes from 2% taken off regular lab, plus 1% off of each of the 3 bigger projects - you can find the full grade breakdown in the syllabus.)

          There are 6 quizzes during the term - you can see which labs contain a quiz on the [course schedule](https://eecs280.org/#schedule).

          Quizzes are a new course component and we're finalizing a few details. We'll share additional information in a future lecture.
        </div>

        For the full details on grading, see our course [syllabus](https://eecs280.org/syllabus.html) and the [grade calculator](https://eecs280.org/calculator.html) available on our website. (Don't feel like you need to dwell on all this now - but the information is there when you're ready to come back to it.)

        I also want to emphasize the importance of keeping up with lectures and actively participating...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/mFzvKwcxnjE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_intro_grading",
          title: "Exercise: Evaluation and Grading",
          points: 4,
          mk_description: dedent`
          
            Here's your first participation exercise! Fill in the blanks below.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              _______________BLANK______________ are the only part of the grade computation that is curved.

              Participation in _BLANK_________________ is *optionally* graded, worth 3% if it helps you.
              
              A student scoring 89.7% overall (with 91.8% on projects, 86.8% on exams) would earn a grade of _BLANK__.
              
              A student scoring 78.2% overall (with 58.1% on projects, 93.25% on exams) would earn a grade of _BLANK__.
            `,
            sample_solution: [
              "individual exams",
              "lectures",
              "B+",
              "C-",
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
                      pattern: /exam|test|midterm|final/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Each individual exam is curved, but nothing else.",
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
                      pattern: /lecture|participation/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Participation in lecture is now worth an optional 3%.",
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
                      pattern: /^\s*B\s*\+\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Double check your answer, or review the grading policy in the video above and course syllabus.",
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
                      pattern: /^\s*c\s*-\s*$/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /^\s*c\s*\+\s*$/i,
                      explanation: "A 78.2% would normally earn a C+, however this student did not score well enough on projects with 58.1% being below the project threshold of 60%. The highest grade they may earn is C-.",
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
        }
      ],
    },
    {
      section_id: "section_01_4",
      title: "Lab Groups and Exercises",
      mk_description: dedent`

        You'll work small groups of other students to further explore and pratice the course material in lab exercises.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/HGJ8AgFRL-8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        <img style="inline-block; height: 2em;" src="assets/eddie.jpg"> Pretty sure I heard a meow at the end of that video... 

        <div class="alert alert-secondary" role="alert" markdown="1">
          <h5><span class="badge badge-primary">Fall 2025</span></h5>
          Recall from the previous section that some lab sessions will include a quiz.
        </div>
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_5",
      title: "Machine Code and Compilation",
      mk_description: dedent`
        
        Let's take a break from talking about logistics and dive into our first sequence of course material! We'll start with a brief introduction to the nature of C++ as a **compiled** language.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/5I_gpGCwlGY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ],
    },
    {
      section_id: "section_01_6",
      title: "Demo: A First Progam in C++",
      mk_description: dedent`
        
        So, what does it actually look like to write a program in C++, compile it, and run it?

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/MLCHE6cbsLY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        There were several commands in there, including the \`g++ hello.cpp -o hello.exe\` that I used to compile the program. Don't worry about memorizing any of this right now. The tutorials and C++ setup walkthrough sessions will go into some more depth on these.
      `,
      questions: [ ],
    },
    {
      section_id: "section_01_7",
      title: "A Tour of C++",
      mk_description: dedent`
        
        Now, we'll spend some time on a brief, whirlwind-style tour of some of the characteristics of C++. This is just a high-level overview, and we'll spend more time on a lot of details throughout the rest of the course.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/V9-WMP0mXUY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        It's worth looking at **expressions** and **variables** in a bit more detail, especially the way variables and their types relate to the underlying memory used in our program.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/b0GpOtt0fK4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Understanding variables as a name for an object in memory also helps us understand what would happen if a variable were declared, but not properly initialized before we use it...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ub1lkk67XME" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Finally, we'll look at a few ways the compiler checks for common errors in programs before we're allowed to run them, using rules of **scope** and **static typing**.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/57NGk0keZLY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_intro_cpp_fundamentals",
          title: "Exercise: C++ Fundamentals",
          points: 1,
          mk_description: dedent`
            Complete each of the tasks described in the comments.
          `,
          response: {
            kind: "iframe",
            src: "assets/intro_cpp_fundamentals.html",
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
          verifier: {
            verifier_kind: "full_credit"
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              \`\`\`cpp
              #include <iostream>
              using namespace std;
              
              int main() {
              
                // Task 1: Define a variable called price with inital value 7.99.
                double price = 7.99;

                // Task 2: Define a variable called quantity with initial value 4.
                //         The variable's type should only allow whole numbers.
                int quantity = 4;

                // Task 3: Print the result of multiplying the variables to cout.
                //         (Use the unqualified name cout, not std::cout.)
                cout << price * quantity << endl;
              }
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_01_8",
      title: "Fundamental Types and Implicit Conversions",
      mk_description: dedent`
        Let's take a look at the set of fundamental data types built in to the C++ language, as well as the rules for implicit conversion between them.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/BFt_3sLGMy4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        I'll also point out that **explicit conversions** are possible, where we directly request a conversion. In some cases this may be necessary. In others, it's stylistically preferrable to make an otherwise implicit conversion more obvious. Here's a few examples:

        \`\`\`cpp
        int main() {
          double value = 4.3;

          // implicit conversion, too easy to miss
          int x = value;

          // C-style cast, avoid doing this
          int x = (int)value;

          // C++-style cast, this is preferred
          int x = static_cast<int>(value);
        }
        \`\`\`

        In C++, the \`static_cast\` form is preferred because it involves stronger compiler checks to ensure the conversion makes sense.
      `,
      questions: [],
    },
    {
      section_id: "section_01_9",
      title: "Projects and Autograder",
      mk_description: dedent`
        You get to exercise the skills you learn in lecture and lab in six large-scale programming projects throughout the course, designed to solidify your understanding and give you a chance to build some neat applications with real-world appeal!
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Bsr_bXDhaUE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_10",
      title: "Collaboration and Academic Integrity",
      mk_description: dedent`
        We want you to learn with and from each other! Enjoying the class with others and having a network you can reach out to for help is highly encouraged. At the same time, we want to make sure everyone has an opportunity to learn for themselves and that nobody takes credit for someone else's work.
        
        It's also important to do the (sometimes challenging, sometimes frustrating!) work yourself, because otherwise you're not going to get much out of the course. This informs our Generative AI Policy. The short version - you're encouraged to use tools like ChatGPT, Copilot, etc. to help you learn, but you aren't allowed to use them to do your work for you. I recommend against using such tools for *any* code generation, no matter how small. The [full version](https://eecs280.org/syllabus.html#generative-ai-policy) in our syllabus is also worth a read.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/UGL_kCo1P1Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_11",
      title: "Wrapping Up",
      mk_description: dedent`
        Just a few parting thoughts.
         
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/TlsM1jxpKDQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
  ],
};
