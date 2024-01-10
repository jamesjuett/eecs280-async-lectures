import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_13 : ExamSpecification = {
  exam_id: "lec_13_dynamic_memory",
  title: "Dynamic Memory",
  mk_intructions: dedent`
    
    <div markdown=1 class="alert alert-info">
      In today's lecture, we'll consider the lifetimes we need for different objects in our program, how lifetime corresponds to the way objects are managed in memory, and how we as the programmer can use a new technique - **dynamic memory** to have more precise control of all this when we need it.
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
      section_id: "section_13_1",
      title: "Memory Model and The Heap",
      mk_description: dedent`
        To start, consider the \`Bird\` class and code in \`main()\` below. \`Bird\` defines a custom constructor (\`Bird()\`) and destructor (\`~Bird()\`) that print out a message when they run. Recall that constructors and destructors are special functions that run at the start/end of an object's lifetime...that means thinking about when these functions run (and print their messages!) is a helpful exercise in thinking precisely about their lifetimes in our code.

        Take a moment to mentally trace through the code and predict what you think will be printed. You can use the simulation to check.

        <div style="text-align: center;">
          <iframe class="lobster-iframe" style="height: 600px;" src="assets/object_lifetimes.html"></iframe>
        </div>

        <br />

        In the video below, I'll walk through the example above and introduce **dynamic memory**, which allows direct control over object lifetimes.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/t7pidvzGGoY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        To recap:
         - Dynamically allocated objects are stored in a separate section of memory called the **heap**.
         - The lifetime of such objects is controlled directly by the code we write (and not automatically managed).
      `,
      questions: [ ],
    },
    {
      section_id: "section_13_2",
      title: "Using \`new\` and \`delete\`",
      mk_description: dedent`

        The general workflow for using dynamic memory is something like this:
        1. Use the \`new\` operator to **create** a dynamically allocated object on the heap.
        2. **Keep track of that object's address using a pointer**. The object isn't restricted to any scope and can be used throughout our program.
        3. Once we're finished with the object, give its address (i.e. the pointer we're using to track it) to the \`delete\` operator, which **destroys** the object and **frees its memory** to be used for something else.

        Here's the details:

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/3yre1os6dg0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec13_mole_lifetimes",
          title: "Exercise: Dynamic Object Lifetimes",
          points: 3,
          mk_description: dedent`
            Let's add dynamic memory with \`new\` and \`delete\` to another example like the warm up exercise from earlier. Here, we're working with a \`Mole\` class rather than \`Bird\`, since the objects popping in and out of existence in dynamic memory remind me of the old "Whac-a-Mole" arcade game.
            
            For each commented line in the \`main()\` function below, write in the blank the number of \`Mole\` objects are currently alive in memory (i.e. their constructor has run, but their destructor has not run yet).
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 275px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
class Mole {
public:
  Mole(int id_in)
    : id(id_in) {
    cout << "Mole ctor: " << id << endl;
  }

  ~Mole() {
    cout << "Mole dtor: " << id << endl;
  }

private:
  int id;
};

Mole * func() {
  Mole m(123);
  return new Mole(456);
}
\`\`\`
    </div>
    </td>
    <td>
    <div markdown="1">
\`\`\`cpp
int main() {
  Mole m1(1);
  Mole *mPtr;
  // Line 1 _BLANK____
  mPtr = func();
  // Line 2 _BLANK____
  delete mPtr;
  // Line 3 _BLANK____
  mPtr = new Mole(2);
  func();
  // Line 4 _BLANK____
  delete mPtr;
  // Line 5 _BLANK____
  cout << "all done!" << endl;
}
// Line 6 - after main returns _BLANK____
\`\`\`
    </div>
    </td>
  </tr>
</table>
            `,
          },
          mk_postscript: dedent`
            <hr />
            
            <details markdown="1">
              <summary>Sample solution...</summary>
              **Line 1**  
              1 Mole alive. Only \`m1\` exists at this point. Note that \`mPtr\` is not an actual \`Mole\`, it's just a pointer.  
              
              **Line 2**  
              2 Moles alive. The \`func()\` function created a local \`Mole\` (with ID 123), but it is destroyed when the function returns. However, it also allocated a new \`Mole\` (with ID 456) on the heap, which persists and is now pointed to by \`mPtr\`.
              
              **Line 3**  
              1 Mole alive. We've just deleted the \`Mole\` with ID 456.
              
              **Line 4**  
              3 Moles alive. We've reassigned \`mPtr\` to point at a new dynamically allocated \`Mole\` (with ID 2). We also called \`func()\` again, which has the side effect of creating another 456 \`Mole\` on the heap. However, we don't do anything with the returned address from \`func()\`, and that is ultimately going to cause problems - there's now no way to ever clean up that \`Mole\`, since we didn't store its address anywhere.
              
              **Line 5**  
              2 Moles alive. We've just deleted the \`Mole\` with ID 2.
              
              **Line 6**  
              1 Mole alive. The local variable \`m1\` went out of scope at the end of main and was destroyed. The 456 \`Mole\` on the heap was never freed. :(
            </details>

            <br />
          `
        },
      ],
    },
    {
      section_id: "section_13_3",
      title: "Memory Leaks",
      mk_description: dedent`

        A memory leak occurs if we allocate an object with \`new\` but neglect to release it with \`delete\`. Why is that problematic? And, how do memory leaks generally show up in code? Let's see...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/cNaN3R8HLJw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec13_memory_leaks",
          title: "Exercise: Memory Leaks",
          points: 3,
          mk_description: dedent`
            Which of the following programs run out of memory and crash? Assume the program has 8KB of stack space and 4MB of heap space. Assume each \`int\` takes up 4 bytes. Describe the memory use of the program and any problems in the box provided.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int *ptr;
  for (int i = 0; i < 1000000000; ++i) {
    ptr = new int(i);
  }
  delete ptr;
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int x = 10000;
  for (int i = 0; i < 10000; ++i) {
    x = i;
  }
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int arr[10000];
  for (int i = 0; i < 10000; ++i) {
    arr[i] = i;
  }
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
void helper() {
  int *ptr = new int(10);
  ptr = new int(20);
  delete ptr;
}

int main() {
  for (int i = 0; i < 1000000000; ++i) {
    helper();
  }
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int *arr = new int[10000];
  for (int i = 0; i < 10000; ++i) {
    arr[i] = i;
  }
  delete[] arr;
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/Fov74Y7KQfA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_13_4",
      title: "Double Frees and Improper Deletes",
      mk_description: dedent`

        While we have to make sure we clean up all the memory that we create with \`new\` by cleaning it up using \`delete\`, we also have to watch out for a few potential errors:

        - Deleting an object twice usually results in a crash.
        - Deleting a non-heap object usually results in a crash.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/qdUyIM2I2lI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        One minor fact that's not covered in the video - if a null pointer is given to \`delete\`, nothing happens (i.e. it doesn't crash or do anything bad!). This is reasonable, if we consider that the behavior of \`delete\` could be specified as "destroy the object **(if any)** that this pointer points to" and that a null pointer indicates that a pointer "isn't pointing at anything right now".
      `,
      questions: [
        {
          question_id: "lec13_double_free",
          title: "Exercise: Double Frees and Improper Deletes",
          points: 3,
          mk_description: dedent`
            Which of the following programs run out of memory and crash? Assume the program has 8KB of stack space and 4MB of heap space. Assume each \`int\` takes up 4 bytes. Describe the memory use of the program and any problems in the box provided.

            Which of the following programs will likely crash due to one of the two \`delete\` errors mentioned above? If there's a problem, describe it in the box provided.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int *ptr1 = new int(1);
  delete ptr1;
  ptr1 = new int(2);
  delete ptr1;
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int *ptr1 = new int(1);
  ptr1 = new int(2);
  delete ptr1;
  delete ptr1;
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int x = 0;
  int *ptr1 = &x;
  delete ptr1;
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int *ptr1 = new int(1);
  delete &ptr1;
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int *ptr1 = new int(1);
  int *ptr2 = ptr1;
  delete ptr1;
  delete ptr2;
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
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
\`\`\`cpp
int main() {
  int *ptr;
  for (int i = 0; i < 10; ++i) {
    ptr = new int(i);
  }
  for (int i = 0; i < 10; ++i) {
    delete ptr;
  }
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/sPudJ2qluCM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        },
      ],
    },
    {
      section_id: "section_13_5",
      title: "Dangling Pointers",
      mk_description: dedent`
        We've encountered **dangling pointers** before, but only in relatively unlikely contexts, like returning the address of a local variable. For example:

        \`\`\`cpp
        int * func() {
          int x = 2;
          return &x; // bad idea!
        }

        int main() {
          int *ptr = func();
          // ptr ends up pointing at the dead object left after x went out of scope
        }
        \`\`\`

        However, dangling pointers naturally arise any time we \`delete\` dynamic memory. That's ok, but we do have to be careful not to accidentally use them.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ce8NcPvXoM4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ],
    },
    {
      section_id: "section_13_6",
      title: "Uses for Dynamic Memory",
      mk_description: dedent`
        Finally, let's briefly discuss some of the many uses of dynamic memory.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/s8vXcgRCrW0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [ ],
    },
  ],
};