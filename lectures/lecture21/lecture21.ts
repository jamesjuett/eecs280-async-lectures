import { Exam, DocRenderer, QuestionSpecification, SectionSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { readFileSync } from "fs";
import dedent from "ts-dedent";

import { MK_DOWNLOAD_MESSAGE, MK_BOTTOM_MESSAGE, MK_SAVER_MESSAGE, MK_QUESTIONS_MESSAGE } from "../../common/messages";





export const LECTURE_21 = Exam.create({
  exam_id: "lec_21_functors",
  title: "Functors and Impostor Syndrome",
  mk_intructions: `
<div markdown=1 class="alert alert-info">
This lecture covers **functors** in C++, including their use in **higher-order functions** as **predicates** and **comparators**.

With functors, we're also fully equipped to consider the implementation of \`Map.h\` from EECS 280 project 5.

Finally, we cover **impostor syndrome** - a concept not directly related to programming but that is nevertheless relevant for many in our community.
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
      section_id: "section_21_1",
      title: "Iterator Review, Motivating Example",
      mk_description: dedent`
        We'll start by briefly reviewing iterators and setting up the motivation for the main content of today's lecture.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/zLEsU8Ja5PM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec21_any_of_even",
          title: "Exercise: \`any_of_even()\`",
          points: 3,
          mk_description: dedent`
            Implement a function template \`any_of_even()\`, which takes in two iterators (of any kind) and determines whether any of the elements in the range they define are even-valued. The function will be very similar to \`any_of_odd()\` from the previous video.
          `,
          
          response: {
            kind: "code_editor",
            codemirror_mime_type: "text/x-c++src",
            code_language: "cpp",
            starter: "",
            sample_solution: dedent`
              template <typename Iter_type>
              bool any_of_even(Iter_type begin, Iter_type end) {
                for (Iter_type it = begin; it != end; ++it) {
                  if (*it % 2 == 0) { return true; }
                }
                return false;
              }
            `
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              
              \`\`\`cpp
              template <typename Iter_type>
              bool any_of_even(Iter_type begin, Iter_type end) {
                for (Iter_type it = begin; it != end; ++it) {
                  if (*it % 2 == 0) { return true; }
                }
                return false;
              }
              \`\`\`
            </details>
          `
        },
      ],
    },
    {
      section_id: "section_21_2",
      title: "Function Pointers",
      mk_description: dedent`
        Building on the previous section and exercise - what if we wanted to check for other criteria besides even and odd numbers?
        
        Instead of writing mostly the same code over and over again, let's come up with a generic \`any_of()\` function and just tell it what we're looking for when we use it.
        
        There are a few different approaches to specify "what we're looking for" - we'll first try using **function pointers**, which are not quite the right answer in C++, but are a reasonable place to start.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/TCVBwKOqLvo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        
        So, we can use a function pointer to specify which function (e.g. \`is_prime()\`)should act as a **predicate** for a **higher-order function** like \`any_of()\`, telling it what to look for. But, there are some limitations to this approach...

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/6Y9bRkjPjlI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec21_function_pointer_ideas",
          title: "Exercise: Function Pointer Limitations",
          points: 3,
          mk_description: dedent`
            Here's a copy of the slide with the question from the video:

            <div style="text-align: center">
              <img src="assets/function_pointer_exercise.png" style="width: 700px;">
            </div>
            <br />
          `,
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              
              What do you think? Are any of these good ideas?

              [[BOX
              
              
              
              
              ]]
            `,
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              
              It turns out none of these will work correctly.

              Option A might work, but would be a bit clunky and error prone. We generally try to avoid global variables. We'll see better options soon...

              Option B doesn't work, because the implementation \`any_of()\` function would need to pass in this extra parameter, but that wouldn't make sense if it was used with other predicates that don't expect a random extra parameter.

              Option C follows from option B, but is flawed for the same reason. A higher-order function like \`any_of()\` should simply take in a predicate that is self-contained and does not require juggling extra parameters.

              If only we could create customized \`greater()\` functions as we needed them, plugging in the specific threshold value we want... see the next section for details!
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_21_3",
      title: "Functors",
      mk_description: dedent`

        Regular functions in C++ are not "first-class objects" - they cannot be created and customized at runtime. This inherently restricts the use of functions and function pointers for generic coding.

        However, we can do something just as good - we can make a regular class-type object act like a function by overloading its \`()\` operator. These "function objects" are often called **functors**. Because functors are also regular C++ objects, they can be created at runtime, can be customized however we want, and can even store data in member variables!

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/FJ_EbApHZyg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [
        {
          question_id: "lec21_in_range",
          title: "Exercise: \`InRange\` Predicate Functor",
          points: 3,
          mk_description: "",
          response: {
            kind: "fill_in_the_blank",
            content: dedent`
              Fill in the implementation of the \`InRange\` functor, which is constructed with two thresholds for lower and upper bounds of a range. Its function call operator takes in a value and returns true if that value is within the range (inclusive). Assume the numbers in question are doubles.

              \`\`\`cpp
              class InRange {
              public:
              
                // Constructor
                [[BOX_______________________________________________________________
                
                
                
                ]]
                
                // Function Call Operator
                [[BOX_______________________________________________________________
                
                
                
                ]]
                
              private:
                // Member Variables
                [[BOX_______________________________________________________________
                
                
                
                ]]
              };
              \`\`\`

              Fill in the blanks to complete the implementation of \`count_if()\`.

              \`\`\`cpp
              // REQUIRES: 'begin' is before or equal to 'end'
              // EFFECTS:  Returns the number of elements in the sequence that satisfy 'pred'.
              template <typename IterType, _BLANK__________________________>
              int count_if(IterType begin, IterType end, _BLANK_________________ pred) {
                [[BOX_______________________________________________________________
                
                
                
                
                
                
                
                
                ]]

              }
              \`\`\`

              Add code to the \`main()\` function below that uses \`InRange\` and \`count_if()\` to determine the number of elements between 5 and 15, inclusive, in the vector \`vec\`. Some comments are provided to guide you.

              \`\`\`cpp
              int main() {

                vector<int> vec = {1, 6, 2, 8, 17, 23, 12};

                // Create an InRange functor with the appropriate thresholds
                [[BOX_______________________________________________________________
                
                
                ]]


                // Call count_if with begin/end iterators from the vector
                // and the InRange functor you created above. (Make sure
                // that you don't call the functor here, just pass it in!)
                [[BOX_______________________________________________________________
                
                
                ]]
              }
              \`\`\`
            `,
          },
          mk_postscript: dedent`
            <hr />
            <details>
              <summary>Sample solution...</summary>
              
              \`\`\`cpp
              class InRange {
              public:
              
                // Constructor
                InRange(double lower_in, double upper_in)
                 : lower(lower_in), upper(upper_in) { }
                
                // Function Call Operator
                bool operator()(double val) const {
                  return lower <= val && val <= upper;
                }
                
              private:
                // Member Variables
                double lower;
                double upper;
              };
              \`\`\`

              Fill in the blanks to complete the implementation of \`count_if()\`.

              \`\`\`cpp
              // REQUIRES: 'begin' is before or equal to 'end'
              // EFFECTS:  Returns the number of elements in the sequence that satisfy 'pred'.
              template <typename IterType, typename Predicate>
              int count_if(IterType begin, IterType end, Predicate pred) {
                int count = 0;
                while(begin != end) {
                  if (pred(*begin)) {
                    ++count;
                  }
                  ++begin;
                }
                return count;

              }
              \`\`\`

              Add code to the \`main()\` function below that uses \`InRange\` and \`count_if()\` to determine the number of elements between 5 and 15, inclusive, in the vector \`vec\`. Some comments are provided to guide you.

              \`\`\`cpp
              int main() {

                vector<int> vec = {1, 6, 2, 8, 17, 23, 12};

                // Create an InRange functor with the appropriate thresholds
                InRange in_range(5, 15);


                // Call count_if with begin/end iterators from the vector
                // and the InRange functor you created above. (Make sure
                // that you don't call the functor here, just pass it in!)
                int n = count_if(vec.begin(), vec.end(), in_range);
              }
              \`\`\`
            </details>
          `
        }
      ],
    },
    {
      section_id: "section_21_4",
      title: "Comparators",
      mk_description: dedent`
        Another common use for functors is to define multiple different ways of comparing objects. The functor overloads the \`()\` to take in two objects, compare them, and return true if the first is less than the second ("less than" is the conventional direction of comparison, at least). Such a functor is called a **comparator**.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/v2ZhdD3DBTU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        Comparators have many uses! Higher-order functions can take in a comparator to determine how they search for the smallest element, sort a particular sequence, or any process that depends on ordering. Or, a data structure like a binary search tree could also allow a custom comparator to be used to determine the ordering of elements it contains. 

      `,
      questions: [],
    },
    {
      section_id: "section_21_5",
      title: "for_each()",
      mk_description: dedent`
        Here's one more example of a higher-order function for you to consider. 

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/FzIGCJir_J4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        The \`for_each()\` function essentially provides a high-level abstraction for using iterators and functors to perform the same tasks we might regularly write out with more verbose code using a loop.

        <br />

      `,
      questions: [],
    },
    {
      section_id: "section_21_6",
      title: "Impostor Syndrome",
      mk_description: dedent`
        Let's take a break from functors to discuss something just as important...
        
        Impostor syndrome is the name given to a feeling of self-doubt, often accompanied by a difficulty accepting one's own accomplishments or a fear of being exposed as a fraud.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/guTZo28LC6E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        I mentioned a poll in the video above - here's a set of results from a previous term.
        
        We asked, _"Have you felt like an impostor in your classes here at UM?"_
        
        <div style="text-align: center">
          <img src="assets/impostor_syndrome_poll.png" style="width: 400px;">
        </div>
        <br />
      `,
      questions: [],
    },
    {
      section_id: "section_21_7",
      title: "`Map.h` Tips for Project 5",
      mk_description: dedent`
        Finally, a few practical tips and tricks for \`Map.h\` from project 5. I saved this until now because an understanding of functors is essential here.

        Let's take a tour of each component in the \`Map\` class, including the BST member variable (i.e. the "has-a" pattern), the template parameters, and a custom comparator to compare key-value pairs in the BST based on the keys only.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/Feou0OEHEPQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />

        
        Here's also an overview of what each of the three main \`Map\` functions (\`find\`, \`insert\`, and \`operator[]\`) should do. You'll use each in various places thoughout the project 5 driver.

        <div style="text-align: center;">
          <iframe class="lec-video" src="https://www.youtube.com/embed/DlBMShisMkQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
      `,
      questions: [],
    },
  ],
});