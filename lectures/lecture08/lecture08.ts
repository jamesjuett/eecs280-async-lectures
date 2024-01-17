import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_08 : ExamSpecification = {
  exam_id: "lec_08_adts_in_cpp",
  title: "Abstract Data Types in C++",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      As we move onward to the C++ style for ADTs, we'll use \`class\` rather than \`struct\` and also use built-in features of the language (i.e. things that C++ adds beyond C) to support good practices in a more robust way. In particular, a \`class\` in C++ gives us:

      1. **Member Functions**  
         Both data (i.e. member variables) and behaviors (i.e. member functions) for an ADT are encapsulated as members of a \`class\`.  

      2. **Access Specifications**  
         Give **\`public\`** access to an ADT's interface, e.g. functions we want other parts of our code to call while at the same time restricting internal details like raw member data to **\`private\`** access.  

      3. **Constructors**  
         Use constructors to ensure ADTs are *always* initialized (rather than having to separately call an \`_Init()\` function).  

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
      section_id: "section_08_1",
      title: "Warm Up Exercise",
      mk_description: dedent`
        Let's start today with a quick exercise that helps motivate the transition we'll make from C-Style to C++ Style ADTs.
      `,
      questions: [
        {
          question_id: "lec08_warm_up",
          title: "Exercise: Warm Up",
          points: 3,
          mk_description: dedent`
            Consider the code here that creates and uses a C-style ADT, specifically the \`Triangle\` ADT from last time:

            \`\`\`cpp
            int main() {
              Triangle t; // line 2
              Triangle_init(&t, 3, 4, 5); // line 3
              cout << Triangle_perimeter(&t) << endl;
              Triangle_scale(&t, 2);
              cout << t.a << endl; // line 6
            }
            \`\`\`
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 200px; padding-right: 15px;">
    <div markdown="1">
      What would happen if the programmer forgot to write line 2?
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
    <td style="width: 200px; padding-right: 15px;">
    <div markdown="1">
      What would happen if the programmer forgot to write line 3?
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
    <td style="width: 200px; padding-right: 15px;">
    <div markdown="1">
      Which parameter do all of the <code>Triangle_</code> functions have in common?
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
    <td style="width: 200px; padding-right: 15px;">
    <div markdown="1">
      What's wrong with line 6? Does the compiler give us an error here?
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/HhA8b7MFySo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_08_2",
      title: "Introduction to Classes and Member Functions",
      mk_description: dedent`
        The C++ builds on the C language by adding language features to formalize several of the patterns for ADTs that we've used so far. We'll call this the "C++ Style" for ADTs and generally switch to using \`class\` rather than \`struct\`.

        Here's an introduction:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Ht1tMUc0OIs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec08_halfPerimeter",
          title: "Exercise: `halfPerimeter()`",
          points: 3,
          mk_description: dedent`
            Consider another member function, \`halfPerimeter()\`, which is intended to return a value that is half of the triangle's perimeter. The (questionable) algorithm we choose for our implementation is to first shrink the triangle in half and then return its perimeter.

            <div style="text-align: center;">
              <iframe class="lobster-iframe" style="height: 650px;" src="assets/halfPerimeter.html"></iframe>
            </div>
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 300px; padding-right: 15px;">
    <div markdown="1">
      The lines <code>shrink(2);</code> and <code>return perimeter();</code> call member functions, but what object are they called on?
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
    <td style="width: 300px; padding-right: 15px;">
    <div markdown="1">
      The compiler says there's some kind of <code>const</code> error with the <code>shrink(2);</code> line. Try adding <code>const</code> to the signature of <code>shrink</code>. Does this fix the problem? (Hint: Nope. But why not?)
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
    <td style="width: 300px; padding-right: 15px;">
    <div markdown="1">
      Try removing the <code>const</code> on <code>halfPerimeter()</code>. Now the code compiles. Are there any situations in which calling <code>halfPerimeter()</code> from <code>main()</code> wouldn't compile now?
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
    <td style="width: 300px; padding-right: 15px;">
    <div markdown="1">
      The original call to <code>t1.halfPerimeter()</code> compiles now, but what's wrong with the code? What does this mean about using <code>const</code> and the algorithm we chose for <code>halfPerimeter()</code> (i.e. shrink then return perimeter)?
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/Bk3y7udPIgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_08_3",
      title: "Member Accessibility and Constructors",
      mk_description: dedent`
        The C++ style also involves separating member declarations into different access levels (**\`public\`** vs. **\`private\`**) and providing **constructors** as a formal mechanism for initialization.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/6zE7z1UNW_k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec08_coffee",
          title: "Exercise: `Coffee` class",
          points: 3,
          mk_description: dedent`
            Consider the \`class\` below, used as an ADT for a cup of coffee. Note that the implementations for the member functions are omitted for brevity.

            \`\`\`cpp
            class Coffee {
            private:
              int creams;
              int sugars;
              bool isDecaf;
            
            public:
              // Construct a coffee with the given details
              Coffee(int creams, int sugars, bool isDecaf);

              // This constructor internally defaults decaf to false
              Coffee(int creams, int sugars);
            
              // Adds one more cream to the coffee
              void addCream();
            
              // Adds one more sugar to the coffee
              void addSugar();
            
              // Prints a description of the coffee
              void print() const;
            };
            \`\`\`
            
            Consider each of the following code snippets that we might write in a \`main\` function to use the \`Coffee\` class? If the compiler would allow the code, write "ok". Otherwise, write "error" and a very brief explanation of the problem.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
Coffee c1;
c1.addCream();
c1.print();
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
Coffee c2(2, 2);
if (c2.isDecaf) {
  c2.print();
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
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
Coffee c3(2, 2, false);
c3.addCream();
c3.print();
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
const Coffee c4(0, 0);
c4.addCream();
c4.print();
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
Coffee c5(true);
c5.addSugar();
c5.print();
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/LzqPCH-gKik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_08_4",
      title: "Composing C++ ADTs (Classes as Members)",
      mk_description: dedent`
        
        As we did for C-style ADTs, let's take a look at composing more complex ADTs in C++ as classes with other classes for member variables. In this case, we need to ensure that the constructor for the outside class calls each of the constructors for its members (and the compiler double checks this for us).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/pH8OPd_adQw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      
      
      questions: [
        {
          question_id: "lec08_professor",
          title: "Exercise: `Professor` Constructors",
          points: 3,
          mk_description: dedent`
            Here again are the classes from the video:

            \`\`\`cpp
            class Coffee {
            public: 
              Coffee(int creams, int sugars);
              Coffee(int creams, int sugars,
                    bool isDecaf);
            };

            class Triangle {
            public:
              Triangle();
              Triangle(double side);
              Triangle(double a_in, double b_in,
                      double c_in);
            };
            
            class Professor {
            private:
              string name;
              vector<string> students;
              Coffee favCoffee;
              Triangle favTriangle;
              ...
            };
            \`\`\`
            
            Consider several possible constructors for the \`Professor\` class. Which compile successfully? For those that don't compile, explain why (including which member is not initialized correctly).
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
Professor(const string &name)
 : name(name) { }
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
Professor(int creams, int sugars)
 : favCoffee(creams, sugars) { }
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
Professor(const string &name, const string &student)
 : name(name) {
  students.push_back(student);
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
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
Professor(const Coffee &coffee)
 : name("Laura"), favCoffee(coffee), favTriangle(3, 5) { }
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/VSLPLyI3LHk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_08_5",
      title: "Default Initialization",
      mk_description: dedent`

        In C++, "default initialization" occurs whenever we declare a variable or otherwise create an object, but don't provide an explicit initialization. The semantics of default initialization are different for different kinds of objects. There are also a few nuances we should consider for classes, which may or may not have a default constructor.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/R7orvELKSVQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      
      questions: [
        {
          question_id: "lec08_default_constructors",
          title: "Exercise: Default Constructors",
          points: 3,
          mk_description: dedent`
            Consider each of the following classes. Are they default-constructible? Why or why not?
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
class Student {
private:
  string name;
  int num_credits;

public:
  Student(const string &name, int num_credits)
    : name(name), num_credits(num_credits) { }
};

int main() {
  // Would this be allowed?
  Student s;
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
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
class Pickle {
private:
  bool is_sweet;
  bool is_sour;
  bool is_spicy;

public:
  Pickle()
    : Pickle(false, false, false) { }

  Pickle(bool is_sweet, bool is_sour, bool is_spicy)
    : is_sweet(is_sweet),
      is_sour(is_sour),
      is_spicy(is_spicy) { }
};

int main() {
  // Would this be allowed?
  Pickle p;
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
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
class Cow {
private:
  string name;
  int num_spots;
};

int main() {
  // Would this be allowed?
  Cow c;
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
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/4c1Ncn7Rw_4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_08_6",
      title: "Best Practices for C++ ADTs",
      mk_description: dedent`
        Finally, let's consider some more miscellaneous topics and best practices for writing well-designed classes, including:
        - The difference between \`struct\` and \`class\` in C++
        - Why you should always use *member initializer lists* in constructors
        - Using assertions to double check representation invariants
        - Separating classes into \`.h\` and \`.cpp\` files
        - Testing C++ style ADTs

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/TnnE_tRlkQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
};