import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_09 = Exam.create({
  exam_id: "lec_09_inheritance",
  title: "Inheritance",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      Today we'll consider **inheritance**, a fundamental feature found in many programming languages that allows us to derive one \`class\` from another, such that the **derived class** inherits member variables and functions from its **base class**. This is helpful both to save us work (i.e. we avoid duplicating common implementation details by putting them in a base class) and to set up the foundation for meaningful hierarchies of objects (we'll complete this point next time).
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
      section_id: "section_09_1",
      title: "Delegating Constructors",
      mk_description: dedent`
        First, a miscellaneous topic that we didn't get to last time. **Delegating constructors** allow one constructor to call another to promote code reuse and overall elegant design.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/3ZjP0D6J4K4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec09_rectangle",
          title: "Exercise: \`Rectangle\` Constructors",
          points: 3,
          mk_description: dedent`
            Add two additional constructors to the \`Rectangle\` class. They should use delegation to call the constructor already provided in the starter code.
            - A default constructor that takes no arguments and initializes a \`1\`x\`1\` rectangle.
            - A constructor that takes in one side length \`s\` and then creates an \`s\`x\`s\` rectangle.
          `,
          response: {
            kind: "iframe",
            src: "assets/rectangle.html",
            element_class: "lobster-iframe",
            element_style: "height: 675px;",
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              
              \`\`\`cpp
              #include <iostream>
              using namespace std;

              class Rectangle {
              private:
                double width;
                double height;
                
              public:
                Rectangle(double w, double h)
                : width(w), height(h) { }
                
                Rectangle(double s) : Rectangle(s,s) { }
                
                Rectangle() : Rectangle(1,1) { }

                double area() const { return width * height; }
                double perimeter() const { return 2 * (width + height); }
                void scale(double s) { width *= s; height *= s; }
              };
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_09_2",
      title: "Introduction to Inheritance",
      mk_description: dedent`
        Let's start with a bit of motivation for inheritance and a brief introduction to the way it's available as a fundamental language feature in C++.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/fMMKT-LlREA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap:
        - A derived class contains the **member variables** from the base class and may define additional ones.
        - You can call **member functions** of the base class on any derived class instances.
        - A derived class may **"hide"** a member function from the base class by defining its own version with the same signature.
        - A **derived class constructor** must call some version of the base class constructor in its constructor-initializer-list. (Unless there's a default constructor for the base class.)

        Let's return to apply inheritance to our \`Bird\`, \`Chicken\`, and \`Duck\` classes as well...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/J75zMbO3eV0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_09_3",
      title: "Inheritance Details",
      mk_description: dedent`

        Finally, let's investigate some "behind-the-scenes" details on how inheritance works.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/8jULLGraPN0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [],
    },
  ],
});