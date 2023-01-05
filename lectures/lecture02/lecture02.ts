import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE } from "../../common/messages";





export const LECTURE_02 = Exam.create({
  exam_id: "lec_2_procedural_abstraction_and_the_call_stack",
  title: "Procedural Abstraction and The Call Stack",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      This lecture is all about **functions**. We'll look at two complementary perspectives:

      1. Expanding our conceptual model of program execution and memory to include functions and how they are managed on **the call stack**.
      2. Understanding how functions and **procedural abstraction** contribute to good program design.

      **Note** - if you feel like you've already read this introduction, it's because I accidentally had it at the start of lecture 1 for a bit. Oops!
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
      
      iframe.lobster-iframe.no-checkpoints {
        height: 600px;
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
      section_id: "section_2_1",
      title: "Intro to Lobster",
      mk_description: dedent`
        Before we start, let me cover a few basics for the Lobster program visualization tool, which we'll use throughout several lecture examples and exercises in the future.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/SyYblfASLlE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        You can find Lobster at [https://lobster.eecs.umich.edu](https://lobster.eecs.umich.edu). However, there are also Lobster exercises embedded directly in these asynchronous lecture documents, and you can just work on them here (your work will be saved along with any other interactive exercises).
      `,
      questions: [ ]
    },
    {
      section_id: "section_2_2",
      title: "Functions and The Call Stack",
      mk_description: dedent`
        The memory allocated for each function is generally called an **activation record** or (more commonly) a **stack frame**. Each function takes up a certain amount of memory that depends on how many local variables it may need to store, and this memory is allocated and freed as needed during the program.

        Because of the way that functions call work (i.e. the called function has to finish and return before you can start back up in the original function), it's natural to use a stack to represent the memory frames for each function. Whichever function is called most recently is added to the top of the stack, and will always be removed before any other functions that were already on the stack (this is called the "Last In First Out" or "LIFO" property).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/jT077RVOUgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        TODO REMOVE <img style="width: 80%" src="assets/test.png" />

        **Exercise**

        Consider the following code. Trace through the code either manually or using the Lobster simulation and answer the questions below.

        <div style="text-align: center;">
          <iframe class="lobster-iframe no-checkpoints" style="height: 750px" src="assets/call_stack.html"></iframe>
        </div>
      `,
      questions: [
        {
          question_id: "lec2_stack_frames",
          title: "Exercise: Stack Frames",
          points: 3,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Which function has the largest stack frame (in terms of memory use)? How can you tell? Is this a compile-time property or a runtime property?

              [[BOX
              
              
              ]]

              What is the maximum amount of memory on the (call) stack needed by the program at any one given time? Assume an \`int\` takes up 4 bytes, and that the memory to store local \`int\` objects is the only memory used by the program. 

              [[BOX
              
              
              ]]

              How many different stack frames are created for the \`min()\` function throughout the execution of the program??

              [[BOX
              
              
              ]]
            `,
            sample_solution: [

            ]
          }
        }
      ],
    },
    {
      section_id: "section_2_3",
      title: "Exams and Grading",
      mk_description: dedent`
        It's not terribly exciting, but let's take a bit of time to discuss assignment weights, evaluation, and overall grading in the course.
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/lHyme2D9ZwI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    {
      section_id: "section_2_4",
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
      section_id: "section_2_7",
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
              <img src="diagram.png" style="width: 300px;">
            </td>
          </tr>
        </table>

        <br />

        <div style="text-align: center;">
          <iframe class="lobster-iframe" style="height: 1000px;" src="test_exercise.html"></iframe>
        </div>
      `,
      questions: [ ]
    },
    {
      section_id: "section_2_8",
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
      section_id: "section_2_5",
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
      section_id: "section_2_6",
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
      section_id: "section_2_9",
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