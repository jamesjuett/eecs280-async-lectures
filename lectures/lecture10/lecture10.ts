import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_10 : ExamSpecification = {
  exam_id: "lec_10_polymorphism",
  title: "Polymorphism",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      This lecture explores **polymorphism**, which makes our code more flexible and enables even just a single line of code to potentially do many different things in different contexts or situations. It's one of the most powerful concepts in programming.
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
      title: "Function Overloading",
      mk_description: dedent`
        Let's briefly introduce polymorphism and one of its simpler forms: **function overloading**.
        
        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/cOpLOkKZlfE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ],
    },
    {
      section_id: "section_10_2",
      title: "Operator Overloading",
      mk_description: dedent`
        We can also apply the concept of overloading to *operators* as well. For example, the \`+\` operator means one thing when it's used on \`int\`, something else when it's used on \`string\`, and yet another thing when it's used for pointer arithmetic!

        In C++, we can also define what an operator should do if used on our own custom classes. Take a look:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/4ETw1p8brbc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec10_pixel_operator_overloads",
          title: "Exercise: \`Pixel\` Operator Overloads",
          points: 3,
          mk_description: dedent`
            Let's upgrade \`Pixel\` from project 2 to a \`class\` and add some overloaded operators:

            - An overloaded \`<<\` operator that prints a pixel in the format \`rgb(R,G,B)\`
            - An overloaded \`-\` operator that computes the squared difference of two pixels
            
            Implement each operator (as a non-member function) so that the code in main works correctly.
          `,
          response: {
            kind: "iframe",
            src: "assets/pixel_operator_overload.html",
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
              
              class Pixel {
              public:
                const int r;
                const int g;
                const int b;
                
                Pixel(int r, int g, int b)
                  : r(r), g(g), b(b) { }
                
              };
              
              int squared_difference(const Pixel &p1, const Pixel &p2);
              
              // TASK 1: Add an overloaded operator- that
              // returns the squared difference between two
              // pixels (you can just call squared_difference
              // in your implementation)
              
              int operator-(const Pixel &p1, const Pixel &p2) {
                return squared_difference(p1, p2);
              }
              
              // TASK 2: Add an overloaded operator<< that
              // prints out the pixel in this format:
              //   rgb({R},{G},{B})
              ostream &operator<<(ostream &os, const Pixel &p) {
                cout << "rgb(" << p.r << ", " << p.g
                      << ", " << p.b << ")";
                return os;
              }
                
              int main() {
                Pixel p1(174, 129, 255);
                Pixel p2(166, 226, 46);
                
                cout << "p1: " << p1 << endl; // p1: rgb(174,129,255)
                cout << "p2: " << p2 << endl; // p2: rgb(166,226,46)
                
                cout << "sq diff: " << p2 - p1 << endl; // sq diff: 531
              }
              
              // From processing.cpp in P2 starter code
              int squared_difference(const Pixel &p1, const Pixel &p2) {
                int dr = p2.r - p1.r;
                int dg = p2.g - p1.g;
                int db = p2.b - p1.b;
                // Divide by 100 is to avoid possible overflows
                // later on in the algorithm.
                return (dr*dr + dg*dg + db*db) / 100;
              }
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_10_3",
      title: "Subtype Polymorphism",
      mk_description: dedent`

        While function overloading allows us to conveniently reuse a name for many different functions with different signatures, it doesn't fundamentally change our programming - we could have just named the functions differently (e.g. \`max_double\`, \`max_int\`, \`max_Card\`, etc.).

        Subtype polymorphism, on the other hand, is a game-changer. It works hand-in-hand with inheritance and essentially allows us to have a variable of a base type (e.g. \`Bird\`) and then have that same variable potentially refer to any of the different derived types (e.g. \`Chicken\`, \`Duck\`, \`Eagle\`, etc.), often changing which kind it refers to throughout the course of the program!

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/wVdKXkTgrbg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec10_upcasts_and_downcasts",
          title: "Exercise: Upcasts and Downcasts",
          points: 3,
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
              // ok - as a Bird*, b can point to any of the objects
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
      section_id: "section_10_4",
      title: "Virtual Functions",
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

      `,
      questions: [
        {
          question_id: "lec10_virtual_functions",
          title: "Exercise: Virtual vs. Non-Virtual Functions",
          points: 3,
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
      section_id: "section_10_5",
      title: "Polymorphism and Design",
      mk_description: dedent`

        A common pattern for type hierarchies is that the **base class** will define a **virtual** function with the expectation that derived classes may provide their own implementations that **override** the original behavior of that function (since dynamic binding ensures the more specific version is called).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/tuMG7pBZyYU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        If a "default" implementation doesn't make sense for the base class, we can also opt to define the function there as **pure virtual**, meaning that it doesn't have any implementation.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/gzfM9pPR_DA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap the above:
        - When a **base class** defines a function as **virtual**, it means the derived classes **may** provide an overridden version if they want (or if they don't, they just inherit the default implementation from the base class.)
        - When a **base class** defines a function as **pure virtual**, it is an **abstract class** and cannot be instantiated. Derived classes **must** provide an overridden version (or else remain themselves abstract).
        - A **derived class** should always use the \`override\` keyword to indicate that it is providing an implementation of a virtual function from its base class. (This tell the compiler to check that its signature matches correctly.)

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