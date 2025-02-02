import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const PROGRAM_DESIGN_AND_DEBUGGING : Omit<ExamSpecification, "exam_id"> = {
  title: "Program Design and Debugging",
  mk_intructions: dedent`
    <div markdown=1 class="alert alert-info">

      This lecture presents a sample program that implements a "Pirate Treasure" game using C-Style ADTs and many of the programming techniques we've seen in the course so far. We also cover several debugging strategies to track down bugs in the program.
      
      <div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Winter 2025</div>
      
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
      section_id: "section_07_1",
      title: "Program Overview",
      mk_description: dedent`
        
        Here's an overview of where things are in the "Pirate Treasure" program with a few comments on overall program design. I go through things pretty quickly and without all the details, but the intent is primarily to orient you to what parts exist so that the debugging strategies below make more sense (don't worry if you're not quite sure about how everything works).

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/A0CKtLYfHcc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec07_module_responsibilities",
          title: "Exercise: Module Responsibilities",
          points: 6,
          mk_description: dedent`
            Based on the overview above (or taking a look through the code in the [GitHub repository](https://github.com/jamesjuett/pirate-treasure)), which file is responsible for the following tasks? Write either "Game.cpp", "Game.hpp", "CommandUI.cpp", or "pirate.cpp" in each of the blanks.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              _BLANK__________________ Updating the number of treasures/traps that have been revealed after each move.

              _BLANK__________________ Reading input from the user to determine the next move.
              
              _BLANK__________________ Determining whether any neighboring cells are revealed if the user chose to reveal an empty cell.
              
              _BLANK__________________ Extracting the desired size of the game board from command-line arguments.
              
              _BLANK__________________ Providing function prototypes that define the public interface of the \`Game\` ADT.
              
              _BLANK__________________ Defining the \`main()\` function that starts the Pirate Treasure game.
            `,
            sample_solution: [
              "Game.cpp",
              "CommandUI.cpp",
              "Game.cpp",
              "pirate.cpp",
              "Game.hpp",
              "pirate.cpp",
            ],
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
                      pattern: /Game\.cpp/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{4,}/i,
                      explanation: "Updating the number of treasures/traps that are found is part of the internal implementation of the \`Game\` ADT and thus goes in \`Game.cpp\`.",
                      points: 0
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
                      pattern: /CommandUI\.cpp/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{4,}/i,
                      explanation: "User input is handled by the \`CommandUI.cpp\` file, which then calls functions on the \`Game\` ADT.",
                      points: 0
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
                      pattern: /Game\.cpp/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{4,}/i,
                      explanation: "Processing the effects of each move is within the purview of the \`Game.cpp\` implementation.",
                      points: 0
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
                      pattern: /pirate\.cpp/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{4,}/i,
                      explanation: "Command-line arguments are often handled by the \`main()\` function, which in this case lives in \`pirate.cpp\`.",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 5,
                  title: "Blank 5",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /Game\.hpp/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{4,}/i,
                      explanation: "Header files are used to declare an ADT interface. In this case, \`Game.hpp\`.",
                      points: 0
                    },
                  ]
                },
                {
                  blankIndex: 6,
                  title: "Blank 6",
                  points: 1,
                  description: "",
                  patterns: [
                    {
                      pattern: /pirate\.cpp/i,
                      explanation: "Correct!",
                      points: 1
                    },
                    {
                      pattern: /.{4,}/i,
                      explanation: "The \`main()\` function lives in \`pirate.cpp\`, corresponding to the fact that we're compiling and running \`pirate.exe\`.",
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
            <details>
              <summary>Sample solution...</summary>
              <p><input type="text" value="interface" readonly</input> Function declaration in <code>.h</code> file</p>
              <p><input type="text" value="implementation" readonly</input> Function definition in <code>.cpp</code> file</p>
              <p><input type="text" value="implementation" readonly</input> Code inside the function's curly braces</p>
              <p><input type="text" value="interface" readonly</input> Which input values are valid or invalid for the function</p>
              <p><input type="text" value="implementation" readonly</input> Comments inside the function to clarify tricky lines of code</p>
              <p><input type="text" value="interface" readonly</input> RME comment before the function declaration in <code>.h</code> file</p>
            </details>
          `,
        }
      ],
    },
    {
      section_id: "section_07_2",
      title: "Scavenger Hunt",
      mk_description: dedent`
        
        In addition to writing new code from scratch, it's also valuable to practice reading through a new codebase, understanding the way it's organized, and figuring out how to change it.

        For this section, first get your own copy of the code. It lives in a public repository at [https://github.com/jamesjuett/pirate-treasure](https://github.com/jamesjuett/pirate-treasure). From the terminal, you can create local clone of this repository in your EECS 280 folder. Run the commands indicated by the \`$\` below (don't type/copy the \`$\` itself).

        \`\`\`console
        $ cd ~/eecs280
        $ pwd
        /home/jjuett/eecs280
        $ git clone https://github.com/jamesjuett/pirate-treasure.git
        Cloning into 'pirate-treasure'...
        remote: Enumerating objects: 157, done.
        remote: Counting objects: 100% (157/157), done.
        remote: Compressing objects: 100% (98/98), done.
        remote: Total 157 (delta 94), reused 117 (delta 57), pack-reused 0 (from 0)
        Receiving objects: 100% (157/157), 80.20 KiB | 1.15 MiB/s, done.
        Resolving deltas: 100% (94/94), done.
        \`\`\`

        (Note that some of your output may be different, e.g. your username in the home directory.)

        This command will create a new folder called \`pirate-treasure\`. If you're using VS Code, you can open it by running:

        \`\`\`console
        code pirate-treasure
        \`\`\`

        You're welcome to browse through the code as much as you like. The organization ends up similar to EECS 280 project 2 in many places, and there are some areas you might find helpful as examples. At a minimum, consider the exercise below.
      `,
      questions: [
        {
          question_id: "lec_pirate_treasure_modifications",
          title: "Exercise: Scavenger Hunt",
          points: 2,
          mk_description: dedent`
            Consider the scenarios below. Please note that you don't actually need to implement and/or test anything in the code, just consider where these changes would need to be made.
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              In a well-designed program, there should often be a clear, specific place where you need to add or modify code to change a particular behavior. Let's say you wanted to modify the program so that a new game will never contain traps or treasures on the boundary of the game board. Which function(s) would you need to modify to implement this?

              [[BOX
              
              
              
              ]]


              On the other hand, some changes might need to affect multiple parts of the program. Consider implementing a "lives" system where a player starts with e.g. 3 lives and it takes 3 traps revealed to end the game. In this case, the \`Game.hpp\` file would need to change as well - why is this (and why wouldn't it be necessary for the change above?

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
                      pattern: /.{10,}/i,
                      explanation: "This is just graded for completion. The comments in the sample solution describe the problem with each.",
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
                      pattern: /.{10,}/i,
                      explanation: "This is just graded for completion. The comments in the sample solution describe the problem with each.",
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
            <details>
              <summary>Sample solution...</summary>
              
              Part 1: The first \`Game_init()\` function as well as the internal \`place_items()\` function would potentially need to change. Either \`place_items()\` could be modified to avoid the borders, or additional parameters could be added so that an acceptable region for placing the items could be specified when it was called by \`Game_init()\`.

              Part 2: In this case, the \`Game\` ADT would be responsible for keeping track of the number of lives, and the implementations of several functions in \`Game.cpp\` would need to change to initialize and update the lives, as well as to consider lives when determining if the game is over. The \`Game.hpp\` file would also need to contain changes to the \`Game\` struct definition to store the current number of lives and to add a public interface function so that other ADTs like \`CommandUI\` could check the current number of lives.
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_07_3",
      title: "Debugging",
      mk_description: dedent`
        Now, let's look at several debugging strategies applied to the "Pirate Treasure" program.
        
        First, we'll take a look at running the overall \`pirate.exe\` program and \`Game_tests.exe\` unit tests. We encounter and track down a segmentation fault using a visual debugger.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Sw0Ax1ija0g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Next, we'll take a look at some defensive programming techniques, including using assertions, to detect bugs earlier and make them easier to fix.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/hmNOgj1W9co" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Finally, we'll get more information about what exactly the program is doing by adding breakpoints and using print statements so that we can figure out what is happening to cause the last few bugs.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/-tEYLW-THiY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
};