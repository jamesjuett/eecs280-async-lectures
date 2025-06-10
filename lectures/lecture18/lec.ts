import { ExamSpecification, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LINKED_LIST_ITERATORS : Omit<ExamSpecification, "exam_id"> = {
  title: "Iterators",
  mk_intructions: `
<div markdown=1 class="alert alert-info">
Abstraction is quite likely the most powerful tool in programming. We've seen it applied as "procedural abstraction" (i.e. functions) and in "abstract data types" (i.e. classes), and we'll add another today - abstracting the process of "iteration" or "traversal" over a sequence or a container.

To do this, we'll first define a common *interface* for iteration. But not all containers will naturally conform to this interface - traversing over an array looks a whole lot different than traversing over a linked list. So, we'll define custom objects called "**iterators**" for each different kind of sequence or container that act as the "tour guide" that conforms to our common interface but handles the container-specific details behind the scenes.
<div style="position: absolute; bottom: 5px; right: 10px; font-weight: bold;">Updated Spring 2025</div>
</div>
<div class="alert alert-secondary" role="alert" markdown="1">
<h5><span class="badge badge-success">Spring 2025</span></h5>
<p>We briefly covered the use of iterators from the standard library in a previous lecture. We hadn't done that in previous terms, so in some of the older videos here it will seem like I'm introducing them for the first time. That said, it's been a while, and the review is probably useful anyway. Plus, much of the material here is new, since it concerns actually implementing our own iterators, not just using provided ones. 
</p>
<p>In some of the videos, I might refer to implementing a linked list and its iterators on project 4. That's project 5 this term.</p>
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
      section_id: "section_17_1",
      title: "Warm Up Exercise",
      mk_description: "",
      questions: [
        {
          question_id: "lec17_warm_up",
          title: "Exercise: Warm Up",
          points: 10,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Let's take a look at two functions that traverse and print out different kinds of containers:

              <table style="border: none; margin-left: auto; margin-right: auto;">
              <tr>
              <td markdown="1">
              \`\`\`cpp
              // Array traversal by pointer
              void print(int *begin, int size) {
                int *end = begin + size;
                for (int *p = begin; p != end; ++p) {
                  cout << *p;
                }
              }
              \`\`\`
              </td>
              <td style="width: 15px;"></td>
              <td>
              \`\`\`cpp
              // Linked list traversal via next pointers
              void print (Node *begin) {
                for (Node *p = begin; p; p = p->next) {
                   cout << p->datum;
                }
              }
              \`\`\`
              </td>
              </tr>
              </table>
              
              Briefly answer the following questions. (A word or short phrase is sufficient!)

              <table>
              <tr>
                <th style="width: 50%"></th>
                <th style="width: 25%">Array Traversal</th>
                <th style="width: 25%">Linked List Traversal</th>
              </tr>
              <tr>
                <td>Which variable tracks the current position in the container?</td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
              </tr>
              <tr>
                <td>How is it initialized?</td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
              </tr>
              <tr>
                <td>How do we move it to the next item in the container? </td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
              </tr>
              <tr>
                <td>How do we know we have reached the last item in the container?</td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
              </tr>
              <tr>
                <td>How do we access the value of the current item in the container?</td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
                <td>
                  [[BOX
                  
                  ]]
                </td>
              </tr>
            </table>
            `,
            default_grader: {
              grader_kind: "manual_regex_fill_in_the_blank",
              rubric: Array(10).fill(0).map((_,i)=> ({
                blankIndex: i+1,
                title: `Box ${i+1}`,
                points: 1,
                description: "",
                patterns: [
                  {
                    pattern: /./i,
                    explanation: "This is just graded for completion.",
                    points: 1
                  },
                ]
              }))
            },
          },
          verifier: {
            verifier_kind: "full_credit",
          },
          // mk_postscript: dedent`
          //   <hr />
          //   You're welcome to check your solution with this **walkthrough** video:

          //   <div style="text-align: center;">
          //     <iframe class="lec-video" src="https://www.youtube.com/embed/TODO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          //   </div>
          //   <br />
          // `
        }
      ],
    },
    {
      section_id: "section_17_2",
      title: "Iterators: The Big Idea",
      mk_description: dedent`
        It would be nicer if we could write a **single** version of \`print()\` that could operate on both arrays and linked lists (and vectors and sets and other containers!). As we alluded to above - we'll need a common abstraction for iteration, which can be used by \`print()\` regardless of the container type. As a preview, here's what that function will look like:

        \`\`\`cpp
        template <typename IterType>
        void print(IterType begin, IterType end) {
          for (IterType it = begin; it != end; ++it) {
            cout << *it;
          }
        }
        \`\`\`

        What is this doing? At a high level, we've got a function template that can be flexible to accommodate different \`IterType\` types. When used with a specific container, \`IterType\` will match to the type of **iterator** that container provides. Recall that an iterator is supposed to act like a "tour guide" for a container. With that in mind, we can roughly interpret the rest of the code - we've peforming different operations on the iterator, expecting it to take us through the container's elements. \`*it\` should give us access to the current element. \`++it\` should move the iterator onward to the next one.

        The last piece of the puzzle is how we get the \`begin\` and \`end\` iterators to pass into the function. Basically, we ask the container to provide them for us by calling member functions. Here's an example using STL containers, which define these and iterator types, combined with the \`print()\` function defined above:

        \`\`\`cpp
        int main() {
          std::vector<int> vec;
          std::list<double> list;
          std::set<string> set;

          // Assume some elements are added to the containers above.
          // The code below will then print out the elements for each!
          print(vec.begin(), vec.end());
          print(list.begin(), list.end());
          print(set.begin(), set.end());
        }
        \`\`\`

        In essence, we presume that containers have objects called **iterators** that we can get by calling \`.begin()\` and \`.end()\` functions, and that those iterators will support operations like \`*\`, \`++\`, etc. to take us on a tour through the element's containers.
      `,
      questions: [],
    },
    {
      section_id: "section_17_3",
      title: "Linked List Iterators",
      mk_description: dedent`

        Let's fill in some more details and work through an example of actually creating an iterator for our linked list class...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/ta7xGM47uV8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        In the previous video, we implemented the prefix increment operator, i.e. \`++it\`. What's the difference between this and the postfix increment with \`it++\`? Let's take a look and also define the latter for our linked list iterators.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/i8JRfK6PVfM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        Okay, what about the \`--\` operators?

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/U0UYAm5XvKg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        Now that we've covered the data representation and operator implmentation, we'll look at constructing iterators and how the linked list provides them via the \`list.begin()\` and \`list.end()\` member functions.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/qBdNWgrckXo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        Finally, writing out the type of an iterator like \`List<int>::Iterator\` can be a bit obnoxious. But, the C++ \`auto\` keyword can make our lives easier here! Let's take a look...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/bf6Dny8JKME" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec17_linked_list_memory_management",
          title: "Exercise: Linked List Memory Management",
          points: 2,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              As we finish building the \`Iterator\` class, a reasonable question is whether we need to define custom versions of the "Big Three" functions (i.e. copy constructor, assignment operator, and destructor). After all, the iterator does contain a pointer to a dynamically allocated \`Node\`, which is one of the "hints" that a class *might* need custom Big Three implementations.

              Let's work through a couple exercises to assess the situation. First, let's think about shallow vs. deep copies. Consider the code below, and draw out a memory diagram, tracing through the code to the final state of memory (assuming the built-in implementation of the copy constructor for \`Iterator\`, which will use a shallow copy).

              \`\`\`cpp
              int main() {
                List<int> list;
                list.push_back(1);
                list.push_back(2);
                list.push_back(3);
                
                List<int>::Iterator it1 = list.begin();
                ++it1;
                
                List<int>::Iterator it2 = it1;
                ++it2;
                
                // Draw memory at this point
              }
              \`\`\`

              Consider your diagram...does everything look as it should, even though the copy of the iterator did not also result in a deep copy of the node it was pointing to? Explain your reasoning.

              [[BOX
              
              
              ]]

              We can also consider whether \`Iterator\` needs a custom implementation of the destructor, perhaps something like shown below:
              
              \`\`\`cpp
              class Iterator {
                friend class List;
              public:
                // Public default constructor
                Iterator()
                : node_ptr(nullptr) { }
                
                // Potential custom destructor - should we add this???
                ~Iterator() {
                  delete node_ptr;
                }
              private:
                // private constructor
                Iterator(Node *np) : node_ptr(np) { }
                
                // Member variable - pointer to the current node
                Node *node_ptr;
              };
              \`\`\`

              Consider the same \`main()\` program from earlier, referring back to your diagram. If we were to add a custom destructor that also deletes the \`Node\` the iterator is pointing to, what would happen at the end of this main function when destructors run for \`it1\`, \`it2\`, and \`list\`? (i.e. Would we get any memory errors? If so, what kind?)
              
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
                      pattern: /(.|\n){20,}/i,
                      explanation: "This is just graded for completion. Make sure to check the walkthrough video if you're not sure about your answer.",
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
                      pattern: /(.|\n){20,}/i,
                      explanation: "This is just graded for completion. Make sure to check the walkthrough video if you're not sure about your answer.",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/7Rz6HG0Gzyc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_17_4",
      title: "Generalizable Function Templates Using Iterators",
      mk_description: dedent`

        Finally, we'll take a look back at our original goal - write flexible functions that treat iteration via iterators as an abstraction so that they aren't fixed to work with only a single kind of container.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/nhJD-ilWD-o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: [
        {
          question_id: "lec17_generic_length",
          title: "Exercise: Generic \`length()\` Function Template with Iterators",
          points: 4,
          mk_description: dedent`
            Consider a generic \`length()\` function that takes in begin/end iterators and computes the length of the sequence they point to (using traversal by iterator and counting the number of steps). We would like the \`length()\` function to be useable with any container that supports an iterator interface.
            
            For example, we could use it like this:

            \`\`\`cpp
            int main() {
              List<int> list; // assume it's filled with some numbers
              cout << length(list.begin(), list.end()) << endl;
            }
            \`\`\`
            
            Or like this!

            \`\`\`cpp
            int main() {
              std::vector<Card> cards; // assume it's filled with some cards
              cout << length(cards.begin(), cards.end()) << endl;
            }
            \`\`\`
          `,
          response: {
            kind: "fill_in_the_blank",
            content: `
Determine which of the following potential implementations of \`length()\` are correct. Write **"correct"** or **"incorrect"**. If they are not correct, additionally describe what's wrong with them.

<table style="width: 100%; border: none;">
  <tr>
    <td style="width: 350px; padding-right: 15px;">
    <div markdown="1">
      
\`\`\`cpp
// Implementation A
template <typename Iter_type>
int length(Iter_type begin, Iter_type end) {
  int count = 0;
  List<int>::iterator it = begin;
  while(it != end) {
    ++count;
    ++it;
  }
  return count;
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
// Implementation B
template <typename Iter_type>
int length(Iter_type begin, Iter_type end) {
  int count = 0;
  for(Iter_type it = begin; it < end; ++it) {
    ++count;
  }
  return count;
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
// Implementation C
template <typename Iter_type>
int length(Iter_type begin, Iter_type end) {
  int count = 0;
  while(begin != end) {
    ++count;
    ++begin;
  }
  return count;
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
// Implementation D
template <typename Iter_type>
int length(Iter_type begin, Iter_type end) {
  return end - begin;
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
</table>`,
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
                      pattern: /incorrect|not\s*correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
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
                      pattern: /incorrect|not\s*correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
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
                      pattern: /incorrect|not\s*correct/i,
                      explanation: "The implementation is correct. Check the walkthrough video for more details.",
                      points: 0
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is correct. Check the walkthrough video for more details.",
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
                      pattern: /incorrect|not\s*correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
                      points: 1
                    },
                    {
                      pattern: /correct/i,
                      explanation: "The implementation is incorrect. Check the walkthrough video for more details.",
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
              <iframe class="lec-video" src="https://www.youtube.com/embed/BWCJpKM-fD8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <br />
          `
        }
      ],
    },
    {
      section_id: "section_17_5",
      title: "Iterator Validity",
      mk_description: dedent`

        One last thing... Iterators are kind of like "fancy pointers", and we've got the concept of a "dangling pointer" (a pointer to an object that's no longer safe to use). We have a parallel concept for iterators, referred to as an "invalid", "invalidated", or "dangling" iterator.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/BLqkNZEMjEs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

      `,
      questions: []
    },
  ],
};