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
import { LECTURE_09 } from "./lecture09/lecture09";
import { LECTURE_10 } from "./lecture10/lecture10";
import { LECTURE_11 } from "./lecture11/lecture11";
import { LECTURE_12 } from "./lecture12/lecture12";
import { LECTURE_13 } from "./lecture13/lecture13";
import { LECTURE_14 } from "./lecture14/lecture14";
import { LECTURE_15 } from "./lecture15/lecture15";


export const LECTURES = [
  LECTURE_01,
  LECTURE_02,
  LECTURE_03,
  LECTURE_04,
  LECTURE_05,
  LECTURE_06,
  LECTURE_07,
  LECTURE_08,
  LECTURE_09,
  LECTURE_10,
  LECTURE_11,
  LECTURE_12,
  LECTURE_13,
  LECTURE_14,
  LECTURE_15,
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

