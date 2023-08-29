import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_01 = Exam.create({
  exam_id: "lec_1_intro_and_machine_model",
  title: "Introduction and Machine Model",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      Welcome to **EECS 280**! This lecture presents our motivations and big-picture goals, some course logistics, and an initial conceptual model of C++ programs.
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
      section_id: "section_1_1",
      title: "The Big Picture",
      mk_description: dedent`
        What's EECS 280 all about? Why are we here? Why do we care?

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/d_aE2QjQyAI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_1_2",
      title: "Course Essentials and Grading",
      mk_description: dedent`
        Let's take a look at the major parts of the course, including resources and websites you'll use to engage with the course and how the overall course is graded.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/tAE1kGzAwPI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Don't worry if this all seems a bit overwhelming. There are a lot of different components to the course and a bunch of different resources to get used to. You can find everything from [eecs280.org](https://eecs280.org), and we'll try to keep you up-to-date with the most relevant material. I also highly encourage that you ask questions if you're feeling lost - on Piazza, Discord, in office hours, in lab, etc.
      `,
      questions: [ ]
    },
    {
      section_id: "section_1_3",
      title: "Evaluation and Grading",
      mk_description: dedent`
        It's not terribly exciting, but let's take a bit of time to discuss assignment weights, exams, and overall grading in the course.
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/9q_tGX4h2XY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_1_4",
      title: "Lab Groups and Exercises",
      mk_description: dedent`
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
      section_id: "section_1_5",
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
      section_id: "section_1_6",
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
      section_id: "section_1_7",
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
      section_id: "section_1_8",
      title: "Collaboration and Honor Code",
      mk_description: dedent`
        We want you to learn with and from each other! Enjoying the class with others and having a network you can reach out to for help is highly encouraged. At the same time, we want to make sure everyone has an opportunity to learn for themselves and that nobody takes credit for someone else's work. We follow the UM CoE Honor Code.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/nxYgqqXjIhc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Let's have a conversation about how all this applies in 280. Linked here is a form with examples of several different scenarios that students might run into - what are your thoughts? How do we evaluate them with dual goals of collaboration and academic integrity?

        <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdCuRr919prkQG1xPKevc62MRYihYp9v9zPciVKJTFqSKNgKg/viewform?usp=sf_link"><b>Honor Code Scenarios</b></a>
        
        After you fill out the form, you can see how others responded here:
        
        <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdCuRr919prkQG1xPKevc62MRYihYp9v9zPciVKJTFqSKNgKg/viewanalytics"><b>Responses</b></a>

        While we encourage students to use their best judgement about what might be "too much" help from someone else, we also don't want to scare you away from helping each other learn! Let me reassure you - the cases we routinely report to the honor council always involve clear, straightforward copying or plagiarism.
      `,
      questions: [ ]
    },
    {
      section_id: "section_1_9",
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
});