import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const MACHINE_MODEL_PART_2 : Omit<ExamSpecification, "exam_id"> = {
  title: "Machine Model, Part 2",
  mk_intructions: dedent`

    <div markdown=1 class="alert alert-info">
      This is part two of our exploration of the underlying machine model. A primary focus will be on the way local objects and their underlying memory is managed by the function call stack. We'll also cover different mechanisms for parameter passing and returned results from functions.
      
      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Winter 2025</div>
    </div>

    <div markdown=1 class="alert">
      CSE at UofM is hosting a panel session this Friday, Jan 24 that we think you might be interested in.

      <hr >

      <div style="text-align: center;">
        <img src="assets/pathways_in_computing_w25.jpg" style="width: 650px;">
      </div>
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
      section_id: "section_02_1",
      title: "Intro to Lobster",
      mk_description: dedent`
        Before we start, let me cover a few basics for the Lobster program visualization tool, which we'll use throughout several lecture examples and exercises in the future.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/SyYblfASLlE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        You can find the main Lobster page at [https://lobster.eecs.umich.edu](https://lobster.eecs.umich.edu). **However**, there are also Lobster exercises embedded directly in these asynchronous lectures, and you can just work on them here (your work will be saved along with any other interactive exercises). You don't need to go to the separate Lobster page unless you want to work on other problems outside of these lectures.
      `,
      questions: [ ]
    },
    {
      section_id: "section_02_2",
      title: "Functions and The Call Stack",
      mk_description: dedent`
        
        The memory allocated for each function is generally called an **activation record** or (more commonly) a **stack frame**. Each function takes up a certain amount of memory that depends on how many local variables it may need to store, and this memory is allocated and freed as needed during the program.

        Because of the way that functions call work (i.e. the called function has to finish and return before you can start back up in the original function), it's natural to use a stack to represent the memory frames for each function. Whichever function is called most recently is added to the top of the stack, and will always be removed before any other functions that were already on the stack (this is called the "Last In First Out" or "LIFO" property).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/jT077RVOUgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_stack_frames",
          title: "Exercise: Stack Frames",
          points: 3,
          mk_description: dedent`
            Consider the following code. Trace through the code either manually or using the Lobster simulation and answer the questions below.

            <div style="text-align: center;">
              <iframe class="lobster-iframe" style="height: 625px;" src="assets/call_stack.html"></iframe>
            </div>
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Which function has the largest stack frame (in terms of memory use)? How can you tell? Is this a compile-time property or a runtime property?

              [[BOX
              
              
              ]]

              What is the maximum amount of memory on the (call) stack needed by the program at any one given time? Assume an \`int\` takes up 4 bytes, and that the memory to store local \`int\` objects is the only memory used by the program. 

              [[BOX
              
              
              ]]

              How many different stack frames are created for the \`min()\` function throughout the execution of the program?

              [[BOX
              
              
              ]]
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
                      pattern: /min[ _]*[O0]f[ _]*(3|three|tree)/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /min|main/i,
                      explanation: "The minOf3 function has the most local variables (including parameters), so it needs the largest stack frame.",
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
                      pattern: /40|forty|fourty/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}|\d+/i,
                      explanation: "The maximum memory needed is 40 bytes (10 ints * 4 bytes each). This occurs when main() has called minOf3(), which in turn has called min().",
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
                      pattern: /3|three|tree/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{5,}|\d+/i,
                      explanation: "The min() function is called three times, so three different stack frames are created for it.",
                      points: 0
                    },
                  ]
                },
              ]
            }
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            You're also welcome to check out this **walkthrough** video where I talk through the questions. 

            <div style="text-align: center;">
              <iframe class="lec-video" src="https://www.youtube.com/embed/N6e_IA6GaKo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_02_3",
      title: "Mechanisms for Parameters/Returns",
      mk_description: dedent`
        The two primary mechanisms for parameter passing are pass-by-value and pass-by-reference. A similar choice applies for returning results from a function. Let's take a look at the differences between the two, as well as how they relate to function stack frames.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/tb7-ZC3-PVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_parameter_passing",
          title: "Exercise: Parameter Passing",
          points: 4,
          mk_description: dedent`
            Consider this code that defines a function with both pass-by-value and pass-by-reference parameters.
            
            <div style="text-align: center;">
              <iframe class="lobster-iframe" style="height: 500px;" src="assets/parameter_passing.html"></iframe>
            </div>
            
            What are the values of each variable at the end of the main function? (You can also use the Lobster simulation to check.)

          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              **\`a\`**: _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp; **\`b\`**: _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;**\`c\`**: _BLANK______ &nbsp;&nbsp;&nbsp;&nbsp;**\`d\`**: _BLANK______
            `,
            default_grader: {
              grader_kind: "manual_regex_fill_in_the_blank",
              rubric: [
                {
                  blankIndex: 1,
                  title: "Blank 1",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /1|one/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 2,
                  title: "Blank 2",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /3|three|tree/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /10|ten/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
                {
                  blankIndex: 3,
                  title: "Blank 3",
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
                  blankIndex: 4,
                  title: "Blank 4",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /4|four/i,
                      explanation: "Correct!",
                      points: 1
                    },
                  ]
                },
              ]
            }
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          mk_postscript: dedent`
            <details>
              <summary>Sample solution...</summary>
              <p markdown="1">
              **\`a\`**: 1 &nbsp;&nbsp;&nbsp;&nbsp; **\`b\`**: 3 &nbsp;&nbsp;&nbsp;&nbsp;**\`c\`**: 3 &nbsp;&nbsp;&nbsp;&nbsp;**\`d\`**: 4
              </p>
            </details>
          `,
        }
      ],
    },
    
    {
      section_id: "section_03_4",
      title: "Passing/Returning Pointers",
      mk_description: dedent`
        We can achieve an effect similar to pass-by-reference by using a pointer instead. Here's the basic idea - just like with pass-by-reference, we want to work with the original object (e.g. in a \`main()\` function) without making a copy when we pass it in as a parameter. So, instead of passing the original object, we pass its address as a pointer parameter. That parameter is technically copied (i.e. this is technically a pass-by-value), but who cares! A copy of an address will still get you back to the original object's location.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/c8cDH9ioynw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        It also turns out that the compiler offers pass-by-reference as feature of the C++ language, but it's ultimately turned into pass-by-pointer in the compiled machine code. Here's a brief explanation:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/wH6I4CH-yfo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec_pass_by_pointer",
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
      section_id: "section_03_3",
      title: "Null and Uninitialized Pointers",
      mk_description: dedent`

        A regular pointer contains the address of some other object in your program, and will lead you to that object when you dereference it. But there are a few exceptional cases we should consider:

        <div style="text-align: center;" markdown="1">
          <iframe class="lec-video" src="https://www.youtube.com/embed/BwYQmXUgqbM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <br />
          (Please note a typo near the end of the video - the return type of \`find_by_length()\` should be \`string *\`, not \`int *\`.)
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

        While uninitialized pointers are pretty much always bad, it's useful to have a nullable pointer to represent something "optional". But, to safely use pointer that might be null, you need to check the pointer before dereferencing it. For example:

        \`\`\`cpp

        // Assume we have a pointer called ptr that might be null

        if (ptr != nullptr) {
          // If we get in here, it's safe to dereference and do something with *ptr
        }
        \`\`\`

        You can also shorten that up by replying on an implicit conversion from pointer types to \`bool\`- non-null pointers will convert to \`true\` and null pointers will convert to \`false\`. (Kind of like the way nonzero numbers convert to \`true\` and \`0\` converts to \`false\`, considering a null pointer contains address \`0x0\`.)

        \`\`\`cpp

        // Assume we have a pointer called ptr that might be null

        if (ptr) {
          // If we get in here, it's safe to dereference and do something with *ptr
          // That's because ptr would only turn into true if it wasn't null
        }
        \`\`\`
      `,
      questions: [
        {
          question_id: "lec_null_and_uninitialized_pointers",
          title: "Exercise: Null and Uninitialized Pointers",
          points: 4,
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
      section_id: "section_03_5",
      title: "Dangling Pointers",
      mk_description: dedent`
        Finally, let's take a look at the case of **dangling pointers**, which are pointers that used to point to a valid object, but the object's lifetime has since ended. The pointer still holds the same address and is still pointing at the memory location where it used to be, but the data there is no longer valid to use.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/dmFzzMjVkrw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ]
    },
    
  ],
};