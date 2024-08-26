import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_01 : ExamSpecification = {
  exam_id: "f24_lec_01",
  title: "Course Introduction, Intro to C++",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      Welcome to **EECS 280**! This lecture presents our motivations and big-picture goals, some course logistics, and an introduction to programming in C++.
      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Fall 2024</div>
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
      title: "The Big Picture",
      mk_description: dedent`
        What's EECS 280 all about? Why are we here? Why do we care?

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/d_aE2QjQyAI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        While the overall goals of EECS 280 haven't changed since... *checks video*... 2021... a few specific things have! I'll make sure to call out anything specific you need to know for the current term.
        
        Where course content has changed or I figure out a better way to teach something, I'll also make sure to record updated videos. Sometimes I reuse a video and point out a few minor differences. Because course policies change slightly each term, this lecture has more cases of that than usual...
        
        <div class="alert alert-secondary" role="alert" markdown="1">
          <h5><span class="badge badge-success">Fall 2024</span></h5>
          We now have 6 projects instead of 5, but the workload is the same. We used to have a single project covering "Binary Search Trees" and a "Piazza Classifier Application". This term, we're splitting it into two pieces. Project 4 is now the "Piazza Classifier" half, and Project 5 is the "Binary Search Trees" half. We made this change because it aligns better with the flow of curriculum in the rest of the course and overall should make for a better student experience.

          The application on the old project 4 has changed to implementing a text editor using a linked list, and it now sits at project 5. We made this change because it's a more interesting and well-motivated application of a linked list (which we'll cover later in the course) than previous versions of the project.
          
          <div style="text-align: center;">
            <img src="assets/projects.png" style="width: 600px;">
          </div>
        </div>
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_2",
      title: "Course Essentials",
      mk_description: dedent`
        Let's take a look at the major parts of the course, including resources and websites you'll use to engage with the course and how the overall course is graded.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/tAE1kGzAwPI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        <div class="alert alert-secondary" role="alert" markdown="1">
          <h5><span class="badge badge-success">Fall 2024</span></h5>
          One correction to this video. This term, we're using Ed rather than Piazza for our Q&A forum.
        </div>

        Don't worry if this all seems a bit overwhelming. There are a lot of different components to the course and a bunch of different resources to get used to. You can find everything from [eecs280.org](https://eecs280.org), and we'll try to keep you up-to-date with the most relevant material. I also highly encourage that you ask questions if you're feeling lost - on Ed, Discord, in office hours, in lab, etc.

        **Setup Tutorials**  
        Here's my recommended approach to getting your computer set up for C++ development:
        
        <div style="text-align: center;">
          <img src="assets/tutorials.png" style="width: 600px;">
        </div>
        <br />

        **C++ Walkthrough Sessions**  
        Join us for a live walkthrough session via Zoom on C++ development including set up, compilers, makefiles, C++ IDEs, EECS 280 project workflow, and open Q&A.

        - **Wednesday, Aug 28 at 7-8:30pm** via Zoom.  
        - Separate, concurrent sessions for Windows/Mac.  
        - Links on eecs280.org. Recordings will be posted.  
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_3",
      title: "Evaluation and Grading",
      mk_description: dedent`
        It's not terribly exciting, but let's take a bit of time to discuss assignment weights, exams, and overall grading in the course.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/9q_tGX4h2XY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        <div class="alert alert-secondary" role="alert" markdown="1">
          <h5><span class="badge badge-success">Fall 2024</span></h5>
          Recall that we're splitting up project 5 for this term, into projects 4 and 6. Each of those halves is worth 5% each.

          Please also note a key difference for Fall 2024 - **lecture participation** is _optionally_ worth 3% of your overall grade. We'll compute your grade with and without it and take the better.

          You can find full details in our syllabus at [https://eecs280.org/syllabus.html#lecture-participation](https://eecs280.org/syllabus.html#lecture-participation).
          
        </div>
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

              In previous terms, _BLANK_________________ were not graded, but now they are worth an optional 3%.
              
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

        Lectures are followed up with labs, where you work with small groups of other students to further explore and pratice the course material.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/hcF1NbPVuu0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_5",
      title: "Machine Code and Compilation",
      mk_description: dedent`
        
        Let's take a break from talking about course logistics and dive into our first sequence of course material! We'll start with a brief introduction to the nature of C++ as a **compiled** language.

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

                // Task 3: Print out the result of multiplying the variables
                //         to cout. (Use the unqualified name cout, not std::cout.)
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
      title: "Projects and Autograder",
      mk_description: dedent`
        You get to exercise the skills you learn in lecture and lab in six large-scale programming projects throughout the course, designed to solidify your understanding and give you a chance to build some neat applications with real-world appeal!
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/CY21lS9FQtA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_9",
      title: "Collaboration and Honor Code",
      mk_description: dedent`
        We want you to learn with and from each other! Enjoying the class with others and having a network you can reach out to for help is highly encouraged. At the same time, we want to make sure everyone has an opportunity to learn for themselves and that nobody takes credit for someone else's work. We follow the UM CoE Honor Code.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/nxYgqqXjIhc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        The stuff I said in that video all still applies... but that chart is pretty old. Here's a more recent chart from the terms of EECS 280 (and excluding ENGR 101) that I've been involved with. The takeaway is the same - we only report cases to the honor council where there is compelling evidence plagiarism occurred.

        <div style="text-align: center;">
          <img src="assets/hc_resolutions.png" style="width: 600px; border: solid 1px gray;">
        </div>

        <br />

        **Generative AI Policy**  
        Finally, it's worth mentioning our Generative AI Policy. The short version - you're encouraged to use tools like ChatGPT, Copilot, etc. to help you learn, but you aren't allowed to use them to do your work for you. The [full version](https://eecs280.org/syllabus.html#generative-ai-policy) in our syllabus is also worth a read.

        In almost all cases in EECS 280, I highly recommend against using generative AI tools for writing ANY code, regardless of the amount. A huge part of this course is building up your own programming skills.
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_10",
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