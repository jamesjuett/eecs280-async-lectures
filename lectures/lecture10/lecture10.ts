import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_10 : ExamSpecification = {
  exam_id: "lec_10_polymorphism",
  title: "Polymorphism",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-success">
      To earn participation credit, you'll need to complete the lecture within 2 days of the lecture date.
      For lecture 10 (released Wednesday 2/14), that means completing it by <b>Friday 2/16 at 11:59pm</b>.
    </div>
    
    <div markdown=1 class="alert alert-info">
      This lecture explores **polymorphism**, which makes our code more flexible and enables even just a single line of code to potentially do many different things in different contexts or situations. It's one of the most powerful concepts in programming.

      We'll specifically focus on **subtype polymorphism** today.

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
      section_id: "section_10_1",
      title: "Subtype Polymorphism",
      mk_description: dedent`

        First, a brief intro to the many forms of polymorphism:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/41PpFzEIFg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To enable subtype polymorphism specifically, we'll need a way for a single base class variable to potentially work with any object of any derived class. As usual, the answer is more pointers :).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/wVdKXkTgrbg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec10_upcasts_and_downcasts",
          title: "Exercise: Upcasts and Downcasts",
          points: 4,
          mk_description: dedent`
            Consider the variables \`a\`, \`b\`, and \`c\` below, and assume the \`Duck\` and \`Chicken\` classes are both derived from the \`Bird\` base class.

            \`\`\`cpp
            int main() {
              Bird b("Bonnie");
              Chicken c("Carlos");
              Duck d("Dinesh");
            }
            \`\`\`

            Consider each of the following code snippets. Each involves upcasts or downcasts, some with pointers and some with references (note that the rules for references are the same as for pointers - upcasts are safe but downcasts are not!). If the compiler would allow the code, write "ok". Otherwise, write "error" and a brief explanation of the problem.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
Bird *bPtr = &b;
Chicken *cPtr = bPtr;
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
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
Bird *bPtr = &b;
bPtr = &d;
bPtr = &c;
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
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
Bird &bRef = c;
Chicken &cRef = bRef;
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
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
Bird &bRef = d;
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
                      pattern: /error|illegal|not.*legal|not.*allowed|wrong/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The conversion from `bPtr` to `cPtr` is a downcast, which is not allowed. Answer = \"error\".",
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
                      pattern: /ok|allowed|legal/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "As a `Bird*`, `bPtr` can point to any of the objects. The assignments to `&d` and `&c` are upcasts, which are allowed. Answer = \"ok\".",
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
                      pattern: /error|illegal|not.*legal|not.*allowed|wrong/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "The conversion from `bRef` to `cref` is a downcast, which is not allowed. Answer = \"error\".",
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
                      pattern: /ok|allowed|legal/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /./i,
                      explanation: "Binding a `Bird&` to a `Duck` object requires an upcast, which is allowed. In other words, a `Bird` reference is allowed to refer to a `Duck`. Answer = \"ok\".",
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
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              
              \`\`\`cpp
              Bird *bPtr = &b;
              Chicken *cPtr = bPtr;
              // error - downcast from Bird* to Chicken*
              \`\`\`
                    
              \`\`\`cpp
              Bird *bPtr = &b;
              bPtr = &d;
              bPtr = &c;
              // ok - as a Bird*, bPtr can point to any of the objects
              \`\`\`

              \`\`\`cpp
              Bird &bRef = c;
              Chicken &cRef = bRef;
              // error - downcast from Bird& to Chicken&
              \`\`\`
                    
              \`\`\`cpp
              Bird &bRef = d;
              // ok - a Bird& is allowed to refer to a Duck
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_10_2",
      title: "Static vs. Dynamic Binding",
      mk_description: dedent`

        We've now got a way (i.e. using pointers/references) to have a polymorphic variable that can potentially point to any type derived from a particular base, but there's still something missing.
        
        Let's say we have this code:
        
        \`\`\`cpp
        Bird *b_ptr;
        // some code
        // b_ptr ends up pointing at something
        b_ptr->talk();
        \`\`\`
        
        How do we ensure the correct version of \`talk()\` gets called, depending on the kind of bird that \`b_ptr\` ends up pointing at?

        The answer is to use **virtual functions** to ensure **dynamic binding** of the function call.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/otALFLY4FWI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        A common pattern for type hierarchies is that the **base class** will define a **virtual** function with the expectation that derived classes may provide their own implementations that **override** the original behavior of that function (since dynamic binding ensures the more specific version is called).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/tuMG7pBZyYU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec10_virtual_functions",
          title: "Exercise: Virtual vs. Non-Virtual Functions",
          points: 7,
          mk_description: dedent`
            Shown below are a hierarchy of fruit-based classes and a main function that makes member function calls on a variety of fruit objects and pointers. Note that the \`f1()\` function is non-virtual and the \`f2()\` function is virtual.
            
            What number is printed by each of the following lines in \`main()\`?
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 275px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
class Fruit {
public:
  int f1() { return 1; }
  virtual int f2() { return 2; }
};

class Citrus : public Fruit {
public:
  int f1() { return 3; }
  int f2() override { return 4; }
};

class Lemon : public Citrus {
public:
  int f1() { return 5; }
  int f2() override { return 6; }
};
\`\`\`
    </div>
    </td>
    <td>
    <div markdown="1">
      
\`\`\`cpp
int main() {
  Fruit fruit;
  Citrus citrus;
  Lemon lemon;
  Fruit *fPtr = &lemon;
  Citrus *cPtr = &citrus;

  int result = 0;
  cout << fruit.f2() << endl;  _BLANK______
  cout << citrus.f1() << endl; _BLANK______
  cout << fPtr->f1() << endl;  _BLANK______
  cout << fPtr->f2() << endl;  _BLANK______
  cout << cPtr->f2() << endl;  _BLANK______
  cPtr = &lemon;
  cout << cPtr->f1() << endl;  _BLANK______
  cout << cPtr->f2() << endl;  _BLANK______
}
\`\`\`
    </div>
    </td>
  </tr>
</table>
            `,
            sample_solution: [
              "2",
              "3",
              "1",
              "6",
              "4",
              "3",
              "6",
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
                      pattern: /2/i,
                      explanation: "Correct!",
                      points: 1
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
                      pattern: /3/i,
                      explanation: "Correct!",
                      points: 1
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
                      pattern: /1/i,
                      explanation: "Correct!",
                      points: 1
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
                      pattern: /6/i,
                      explanation: "Correct!",
                      points: 1
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
                      pattern: /4/i,
                      explanation: "Correct!",
                      points: 1
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
                      pattern: /3/i,
                      explanation: "Correct!",
                      points: 1
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
                      pattern: /6/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: `
<hr />
<details>
  <summary>Sample solution...</summary>
  
  <table style="width: 100%; border: none;">
  <tr>
    <td style="width: 275px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
class Fruit {
public:
  int f1() { return 1; }
  virtual int f2() { return 2; }
};

class Citrus : public Fruit {
public:
  int f1() { return 3; }
  int f2() override { return 4; }
};

class Lemon : public Citrus {
public:
  int f1() { return 5; }
  int f2() override { return 6; }
};
\`\`\`
    </div>
    </td>
    <td>
    <div markdown="1">
\`\`\`cpp
int main() {
  Fruit fruit;
  Citrus citrus;
  Lemon lemon;
  Fruit *fPtr = &lemon;
  Citrus *cPtr = &citrus;

  int result = 0;
  cout << fruit.f2() << endl;  // 2 - direct call on a Fruit
  cout << citrus.f1() << endl; // 3 - direct call on a Citrus
  cout << fPtr->f1() << endl;  // 1 - f1 non-virtual, fPtr is declared Fruit*
  cout << fPtr->f2() << endl;  // 6 - f2 virtual, fPtr points to a Lemon
  cout << cPtr->f2() << endl;  // 4 - f2 virtual, cPtr points to a Citrus
  cPtr = &lemon;
  cout << cPtr->f1() << endl;  // 3 - f1 non-virtual, cPtr is declared Citrus*
  cout << cPtr->f2() << endl;  // 6 - f2 virtual, CPtr now points to a Lemon
}
\`\`\`
    </div>
    </td>
  </tr>
</table>
</details>`
        }
      ],
    },
    {
      section_id: "section_10_3",
      title: "Pure Virtual Functions",
      mk_description: dedent`

        If a "default" implementation doesn't make sense for the base class, we can also opt to define the function there as **pure virtual**, meaning that it doesn't have any implementation.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/a7Bm_cfiqqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: []
    },
    {
      section_id: "section_10_4",
      title: "Interface Inheritance",
      mk_description: dedent`

        It turns out that inheriting interfaces is just as important (if not more) than inheriting implementations. Here's why:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/9p-EvfUW6Qk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: []
    },
    {
      section_id: "section_10_5",
      title: "Factory Functions",
      mk_description: dedent`

        The last piece of the puzzle for polymorphic objects is where to create them. Ideally, we don't want client code to have to deal with creating specific derived class objects, so we provide a "factory function" that abstracts away that process.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/PBPDNI1eqto" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: []
    },
    {
      section_id: "section_10_6",
      title: "The Liskov Substitution Principle",
      mk_description: dedent`

        Finally, we'll briefly describe the _Liskov Substitution Principle_, which formally qualifies whether or not a derived type is proper subtype and satifies everything expected of its base type.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/BURIuDmEEK0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec10_liskov_substitution_principle",
          title: "Exercise: Liskov Substitution Principle",
          points: 3,
          mk_description: dedent`
            Consider each pair of base and derived classes below with comments that describe the behavior of a virtual/overridden function. Is the derived class a proper subtype according to the Liskov Substitution Principle? Explain your reasoning.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 400px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
class Player {
  // EFFECTS: Returns a card from player's
  // hand, following the rules of euchre.
  virtual Card play_card();
};

class DerivedPlayer : public Player {
  // EFFECTS: Always returns the ace of clubs
  Card play_card() override;
};
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
    <td style="width: 400px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
class PPMReader {
  // EFFECTS: Reads an image from a stream
  // REQUIRES: The stream must contain
  // image data in PPM format. Pixels must
  // be separated by a single space
  // character.
  virtual Image read_ppm_image(istream &is);
};

class DerivedPPMReader : public PPMReader {
  // EFFECTS: Reads an image from a stream
  // REQUIRES: The stream must contain
  // image data in PPM format. Pixels may be
  // separated by any kind of whitespace.
  Image read_ppm_image(istream &is) override;
};
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
    <td style="width: 400px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
class Unicorn {
  // EFFECTS: The unicorn fires a laser.
  // Returns the power of the laser beam,
  // which is at least 100kw.
  virtual double fire_laser_beam();
};

class DerivedUnicorn : public Unicorn {
  // EFFECTS: The unicorn fires a massive
  // laser. Returns the power of the laser
  // beam, which is over 9000kw.
  double fire_laser_beam() override;
};
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
                      pattern: /./i,
                      explanation: "This is just graded for completion. You can use the walkthrough video to check your answer.",
                      points: 1
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
                      pattern: /./i,
                      explanation: "This is just graded for completion. You can use the walkthrough video to check your answer.",
                      points: 1
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
                      pattern: /./i,
                      explanation: "This is just graded for completion. You can use the walkthrough video to check your answer.",
                      points: 1
                    },
                  ]
                },
              ]
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <hr />
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/sj2ZjMw6jCs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
  ],
};