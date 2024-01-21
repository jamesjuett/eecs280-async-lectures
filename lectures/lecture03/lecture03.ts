import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_03 : ExamSpecification = {
  exam_id: "lec_03_pointers",
  title: "Pointers",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      The fundamental idea of **pointers** is that we might like to work with **addresses** of objects in our programs as well as just their **values/data**.
      
      Why? Pretty much the same reason we use addresses anywhere else - sometimes we need to work **indirectly**. For example, in the "real world", an address book refers to the places that people live, but it doesn't literally contain those places! (That wouldn't even make sense.)
      
      Likewise, in a program we might want several different parts of our code to refer to the same data structure, but we don't want them all to literally have a local copy of that data. It would be better to know the address of the data and just go look it up when we need to.
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
  completion: {
    threshold: 1,
    tooltip: "",
    endpoints: {
      check: "https://examma-ray.eecs.umich.edu/public_api/participation/me/",
      submit: "https://examma-ray.eecs.umich.edu/public_api/participation/me/",
    }
  },
  credentials_strategy: {
    strategy: "google_local",
    client_id: "444801118749-m2g9gl3gvvkh5ru959dmka0lsk94d9uq.apps.googleusercontent.com",
    message: "Sign in with your @umich.edu Google account to earn participation credit for completing embedded exercises.",
  },
  sections: [
    {
      section_id: "section_03_1",
      title: "Addresses and Pointers",
      mk_description: dedent`
        First, let's take a look at how we can find out the address of variables/objects in our program using the \`&\` operator.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/e364_zq4nxU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <br />
      `,
      questions: [
        {
          question_id: "lec03_addresses_and_pointers",
          title: "Exercise: Addresses and Pointers",
          points: 4,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="border: none;">
  <tr>
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
      Consider the program below and answer a few questions.
      
\`\`\`cpp
int main() {
  int x = 4;
  int y = 7;
  double z = 1.5;
  
  int *ptr1 = &x;
  int *ptr2 = &y;
}
\`\`\`
    </div>
    </td>
    <td>
    <div>
      If you added the line <code>cout << ptr2 << endl;</code> to the end of <code>main()</code>, what would be printed?
      
      [[BOX
      
      
      ]]

      Suppose you added the line <code>ptr1 = &ptr2;</code> to the end of <code>main()</code>. Would the compiler allow this? If so, what would the effect of that line be?
      
      [[BOX
      
      
      ]]

      Suppose you added the line <code>ptr1 = ptr2;</code> to the end of <code>main()</code>. Would the compiler allow this? If so, what would the effect of that line be?
      
      [[BOX
      
      
      ]]
      
      Would it be possible to change the value of <code>z</code> using either of the two pointers declared in <code>main()</code>? If so, how? If not, why not?
      
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
                      pattern: /addr.*y/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /\&\s*y/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "The address of y is printed (i.e. &y).",
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
                      pattern: /no|error|not|bad|wrong/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{10,}/i,
                      explanation: "The compiler will not allow it. (Your answer should contain the word \"no\".)",
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
                      pattern: /yes|allow|ok|fine/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{10,}/i,
                      explanation: "The compiler will allow it - it repoints the pointer. (Your answer should contain the word \"yes\" or \"allowed\".)",
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
                      pattern: /no|not|impossible|can't|cant|mismatch|double|error|type/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{10,}/i,
                      explanation: "It is not possible. (Your answer should contain words such as \"not possible\" or \"impossible\".)",
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
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/1isxB18kdlY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_03_2",
      title: "Using Pointers and The Dereference Operator",
      mk_description: dedent`
        Now that we've got addresses, let's take a look at how to use those addresses to get back to the original object. This is called "dereferencing" a pointer - if we imagine a pointer as an arrow pointing to an object, dereferencing is just following the arrow.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Kpotc1G6lkQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        A reminder on terminology: when working with pointers and addresses instead of objects themselves, we can say we are working with those objects *indirectly* or using *indirection*.

        - The \`&\` operator takes the address of an object, adding a layer of indirection to obtain a pointer.
        - The \`*\` operator peels away a layer of indirection, following a pointer to the object it points to.
      `,
      questions: [
        {
          question_id: "lec03_using_pointers",
          title: "Exercise: Using Pointers",
          points: 8,
          mk_description: dedent`
          
            <div class="alert alert-info">
            <strong>Tip</strong>: Drawing memory diagrams is a great way to reason about code. Let's get some practice in now! You'll thank yourself later on some of the more complex projects, and it's also a great way to prep for exams.
            </div>

            Mentally trace this code and draw a memory diagram as you go. Once you're finished, use your diagram to answer the question below. You could also run the lobster simulation to check your work.

            <div style="text-align: center;">
              <iframe class="lobster-iframe" style="height: 725px;" src="assets/using_pointers.html"></iframe>
            </div>
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              What values are printed for each of the expressions sent to \`cout\` at the end of the program?

              \`x\` _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;  \`ptr\` _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`&x\` _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`*&x\` _BLANK______ &nbsp;&nbsp;&nbsp;

              \`y\` _BLANK______ &nbsp;&nbsp;&nbsp;  \`*ptr\` _BLANK______ &nbsp;&nbsp;&nbsp;  \`&ptr\` _BLANK______ &nbsp;&nbsp;&nbsp;  \`&*ptr\` _BLANK______ &nbsp;&nbsp;&nbsp;
            `,
            sample_solution: [
              "3",
              "0x2714",
              "0x2710",
              "3",
              "4",
              "4",
              "0x2718",
              "0x2714",
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
                      pattern: /3|three|tree/i,
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
                      pattern: /2714|&\s*y/i,
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
                      pattern: /2710|&\s*x/i,
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
                      pattern: /3|three|tree/i,
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
                      pattern: /4|four|for|fore/i,
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
                      pattern: /4|four|for|fore/i,
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
                      pattern: /2718|&\s*ptr/i,
                      explanation: "Correct!",
                      points: 1
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
                      pattern: /2714|&\s*y/i,
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
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>
              \`x\` <input type="text" size="5" value="3" readonly</input> &nbsp;&nbsp;&nbsp;&nbsp;  \`ptr\` <input type="text" size="5" value="0x2714" readonly</input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`&x\` <input type="text" size="5" value="0x2710" readonly</input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  \`*&x\` <input type="text" size="5" value="3" readonly</input> &nbsp;&nbsp;&nbsp;

              \`y\` <input type="text" size="5" value="4" readonly</input> &nbsp;&nbsp;&nbsp;  \`*ptr\` <input type="text" size="5" value="4" readonly</input> &nbsp;&nbsp;&nbsp;  \`&ptr\` <input type="text" size="5" value="0x2718" readonly</input> &nbsp;&nbsp;&nbsp;  \`&*ptr\` <input type="text" size="5" value="0x2714" readonly</input> &nbsp;&nbsp;&nbsp;
            </details>
          `,
        }
      ],
    },
    {
      section_id: "section_03_3",
      title: "Null and Uninitialized Pointers",
      mk_description: dedent`
        A regular pointer contains the address of some other object in your program, and will lead you to that object when you dereference it. But there are a few exceptional cases we should consider:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/s7BuhZjdYSY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap:
          - **Uninitialized pointers**: Just like with any other (primitive) variable, if you don't initialize a pointer, it's value is determined by memory junk. That means it's pointing randomly off into space.  

          - **Null pointers**: Sometimes we want to definitively say "this pointer isn't pointing to anything right now", and the way to do that is point it at address \`0\`.

        Some more examples:

        \`\`\`cpp

        int x = 3;

        int *ptr1 = &x; // Initialized with the address of x, this pointer points to x
        *ptr1 = 10;     // Follows ptr1 to x and sets x to 10

        int *ptr2;      // Uninitialized pointer, points at some random address (eeeewww)
        *ptr2 = 10;     // Follows ptr2 off to some random part of memory and slaps down a 10
                        // causing undefined behavior depending on how important that memory was

        int *ptr2 = nullptr; // Null pointer, "not pointing at anything right now"
        *ptr2 = 10;          // Tries to write a 10 to address 0 in memory, which will almost
                             // certainly crash (easier to debug than undefined behavior though!)
        \`\`\`

        Something else to consider - how do we safely use null pointers? Basically, if a pointer in our program might be null (i.e. sometimes it might not be pointing at anything), we'll often need to check for that in our control flow logic. For example:

        \`\`\`cpp

        // Assume we have a pointer called ptr that might be null

        if (ptr != nullptr) {
          // If we get in here, it's safe to dereference and do something with *ptr
        }
        \`\`\`

        There's also a cute way to check whether a pointer is null - just throw the pointer itself in the \`if\` condition. This works because the \`if\` will try to conver it to a \`bool\`, and it just so happens that non-null pointers will convert to \`true\` and null pointers will convert to \`false\`. (Kind of like the way nonzero numbers convert to \`true\` and \`0\` converts to \`false\`.)

        \`\`\`cpp

        // Assume we have a pointer called ptr that might be null

        if (ptr) { // How cute! :D
          // If we get in here, it's safe to dereference and do something with *ptr
          // That's because ptr would only turn into a true if it wasn't null
        }
        \`\`\`
      `,
      questions: [
        {
          question_id: "lec03_null_and_uninitialized_pointers",
          title: "Exercise: Null and Uninitialized Pointers",
          points: 3,
          mk_description: dedent`
            For each of the following code snippets, briefly describe what the **last** line of code does. (For example, "sets the value of a to 3" or "dereferences a null pointer - program crashes".)
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 250px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
int main() {
  int a = 2;
  int *ptr1 = nullptr;
  int *ptr2;

  *ptr1 = 4; // What does this line do?
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
int main() {
  int a = 2;
  int *ptr1 = nullptr;
  int *ptr2;

  ++*ptr2; // What does this line do?
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
int main() {
  int a = 2;
  int *ptr1 = nullptr;
  int *ptr2;

  *ptr2 = a; // What does this line do?
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
int main() {
  int a = 2;
  int *ptr1 = nullptr;
  int *ptr2;

  ptr2 = &a; // What does this line do?
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
                      pattern: /null|nil|undefined|crash|error|exist/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "It dereferences a null pointer (`ptr1`) and crashes.",
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
                      pattern: /undef|error|crash|junk|random|uninitialized|unknown|unpredictable|nowhere/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "It increments (adds 1 to) an undefined address, since `ptr2` was not initialized to point to anything.",
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
                      pattern: /undef|error|crash|junk|random|uninitialized|unknown|unpredictable|nowhere/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "It writes the value of `a` (which is `2`) to an undefined address, since `ptr2` was not initialized to point to anything.",
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
                      pattern: /point|sets|addr|refer|ptr2.*a/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}/i,
                      explanation: "It points `ptr2` at `a`. Or, equivalently, sets the value of `ptr2` to the address of `a`.",
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
            You're welcome to check your solution with this **walkthrough** video:

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/3PDShlC7wr4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_03_4",
      title: "Pass-by-Pointer Parameters",
      mk_description: dedent`
        We can achieve an effect similar to pass-by-reference by using a pointer instead. Here's the basic idea - just like with pass-by-reference, we want to work with the original object (e.g. in a \`main()\` function) without making a copy when we pass it in as a parameter. So, instead of passing the original object, we pass its address as a pointer parameter. That parameter is technically copied, but who cares! A copy of an address will still get you back to the original location.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/T0SN1PxaIVk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec04_pass_by_pointer",
          title: "Exercise: Pass-by-Pointer",
          points: 1,
          mk_description: dedent`
            The code below contains a broken \`swap\` function that doesn't actually do anything. Fix it by modifying the function to use pass-by-pointer, so that you can swap the original objects through pointer parameters. Once you're done, the values of the original variables in main should be swapped correctly! (Note that Lobster will show a completed checkpoint once you've got the right output, and may also try to give you some hints along the way if you run into any bugs.)
          `,
          response: {
            kind: "iframe",
            src: "assets/pass_by_pointer.html",
            element_class: "lobster-iframe",
            element_style: "height: 750px;",
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
          }
        }
      ],
    },
    {
      section_id: "section_03_5",
      title: "Pointer Mischief",
      mk_description: dedent`
        Take a look at the code below. It uses a dubious function to get the address of the variable \`a\`, calls a random function to print \`42\` (this is definitely not a trick :D ), and then prints out \`a\` through the address we got earlier. But all is not as it seems! What happens?
        


        <div style="text-align: center;">
          <iframe class="lobster-iframe" style="height: 550px;" src="assets/pointer_mischief.html"></iframe>
        </div>

        Take a moment to see if you can figure out the problem. Don't worry if you're not sure. I explain what's going in in the video below.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/v6ovLP_EOgM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
  ],
};