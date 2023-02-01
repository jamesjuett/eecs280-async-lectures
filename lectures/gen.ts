import { DocRenderer } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { LECTURE_01 } from "./lecture01/lecture01";
import { LECTURE_02 } from "./lecture02/lecture02";
import { LECTURE_03 } from "./lecture03/lecture03";
import { LECTURE_04 } from "./lecture04/lecture04";
import { LECTURE_05 } from "./lecture05/lecture05";
import { LECTURE_06 } from "./lecture06/lecture06";
import { LECTURE_07 } from "./lecture07/lecture07";
import { LECTURE_08 } from "./lecture08/lecture08";

export const LECTURES = [
  LECTURE_01,
  LECTURE_02,
  LECTURE_03,
  LECTURE_04,
  LECTURE_05,
  LECTURE_06,
  LECTURE_07,
  LECTURE_08,
];


LECTURES.forEach(lec => {
  const generator = new ExamGenerator(lec, {
    uuid_strategy: "plain",
  });
  
  generator.assignExams([
    {name: "eecs280", uniqname: "eecs280"}
  ]),

  generator.writeAll(new DocRenderer());
});

