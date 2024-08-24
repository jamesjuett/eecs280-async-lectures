import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_01 : ExamSpecification = {
  exam_id: "lec_01_intro_and_machine_model",
  title: "Introduction and Machine Model",
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

      To earn participation credit, you'll need to complete the lecture by 11:59pm on the day the lecture is scheduled.
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
        </div>

        **Winter 2024**  
        Please note a key difference for Winter 2024 - starting this term, lecture participation is _optionally_ worth 3% of your overall grade. We'll compute your grade with and without it and take the better.

        You can find full details in our syllabus at [https://eecs280.org/syllabus.html#lecture-participation](https://eecs280.org/syllabus.html#lecture-participation).

        For lectures 2 and beyond, participation credit will be integrated into the aysnc lectures themselves... but I didn't get that finished in time for the term to start, so please fill out this form if you want credit for lecture 1:

        [https://forms.gle/vHzoqmNQnauFe6S28](https://forms.gle/vHzoqmNQnauFe6S28)

        The form will be available until Tuesday, 1/16 at 11:59pm.
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

        TODO

        Lectures are followed up with labs, where you work with a small group of other students to explore and pratice the material further.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/WnKxucMSYDs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Feedback from former students generally indicates that lab is sometimes where the "real" learning happens. We do the best we can in lecture, but often the hands-on experience in lab is what makes things click.
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_5",
      title: "Variables and References",
      mk_description: dedent`
        It's time to dive into our first course material! Let's take a look at the connections between the code we write and what the program does at runtime. In particular:

        - How do variables correspond to data in memory?
        - What is a reference, and how does it differ from a regular variable?

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/mpAO5F1rrlw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        <br />
        <br />
        
        <table style="max-width: 700px; margin-left: auto; margin-right: auto;">
          <tr>
            <td>
            Here's a quick exercise for you. Click the "Memory Diagram" button below and set it to "ON". Then, modify the code in <code>main</code> so that it generates a memory diagram like the one shown here, using variable and/or reference declarations as appropriate.
            </td>
            <td>
              <img src="assets/diagram.png" style="width: 300px;">
            </td>
          </tr>
        </table>

        <br />

        <div style="text-align: center;">
          <iframe class="lobster-iframe" src="assets/test_exercise.html"></iframe>
        </div>
      `,
      questions: [ ],
    },
    {
      section_id: "section_01_6",
      title: "Scope and Lifetimes",
      mk_description: dedent`
        Let's ask some more questions, which all turn out to be related!
         - Why does the compiler have such strict rules on variable scope?
         - How long does the data stored in a variable "hang around" at runtime?
         - What is "memory junk" and where does it come from?
         
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/95KtAgkkHQU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_7",
      title: "Projects and Autograder",
      mk_description: dedent`
        You get to exercise the skills you learn in lecture and lab in five large-scale programming projects throughout the course, designed to solidify your understanding and give you a chance to build some neat applications with real-world appeal!
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/CY21lS9FQtA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_8",
      title: "Collaboration and Honor Code",
      mk_description: dedent`
        We want you to learn with and from each other! Enjoying the class with others and having a network you can reach out to for help is highly encouraged. At the same time, we want to make sure everyone has an opportunity to learn for themselves and that nobody takes credit for someone else's work. We follow the UM CoE Honor Code.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/nxYgqqXjIhc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        The stuff I said in that video all still applies... but that chart is pretty old. Here's a more recent chart from the terms of EECS 280 I've been involved with. The takeaway is the same - we only report cases to the honor council where there is compelling evidence plagiarism occurred.

        <div style="text-align: center;">
          <img src="assets/hc_resolutions.png" style="width: 600px; border: solid 1px gray;">
        </div>

        <br />

        Let's take a look at how this plays out in EECS 280. Linked here is a form with examples of several different scenarios that students might run into - what are your thoughts? How do we evaluate them with dual goals of collaboration and academic integrity?

        <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdCuRr919prkQG1xPKevc62MRYihYp9v9zPciVKJTFqSKNgKg/viewform?usp=sf_link"><b>Honor Code Scenarios</b></a>
        
        After you fill out the form, you can see how others responded here:
        
        <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdCuRr919prkQG1xPKevc62MRYihYp9v9zPciVKJTFqSKNgKg/viewanalytics"><b>Responses</b></a>

        While we encourage students to use their best judgement about what might be "too much" help from someone else, we also don't want to scare you away from helping each other learn! Let me reassure you - the cases we routinely report to the honor council always involve clear, straightforward copying or plagiarism.

        **Generative AI Policy**  
        Finally, it's worth mentioning our Generative AI Policy. The short version - you're encouraged to use tools like ChatGPT, Copilot, etc. to help you learn, but you aren't allowed to use them to do your work for you. The [full version](https://eecs280.org/syllabus.html#generative-ai-policy) in our syllabus is also worth a read.
      `,
      questions: [ ]
    },
    {
      section_id: "section_01_9",
      title: "Wrapping Up",
      mk_description: dedent`
        Just a few parting thoughts.
         
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/TlsM1jxpKDQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        We'd also like to invite you to join a new CSE community event, next Wednesday 1/17:

        <div style="text-align: center;">
          <img src="assets/cse_carnival_flyer_w24.png" style="width: 800px;">
        </div>
      `,
      questions: [ ]
    },
  ],
};