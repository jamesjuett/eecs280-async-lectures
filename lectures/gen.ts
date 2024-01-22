import { CUSTOMIZE, DocRenderer, Exam, ExamSpecification } from "examma-ray";
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
import { LECTURE_16 } from "./lecture16/lecture16";
import { LECTURE_17 } from "./lecture17/lecture17";
import { LECTURE_18 } from "./lecture18/lecture18";
import { LECTURE_19 } from "./lecture19/lecture19";
import { LECTURE_20 } from "./lecture20/lecture20";
import { LECTURE_21 } from "./lecture21/lecture21";
import { LECTURE_22 } from "./lecture22/lecture22";
import dedent from "ts-dedent";

function addW24Warning(spec: ExamSpecification) {
  return CUSTOMIZE(spec, {
    mk_intructions: dedent`
      <div markdown="1" class="alert alert-danger">
        <p>Please note that this lecture has not yet been updated for Winter 2024. If you are working through this lecture early, you'll need to come back once it is updated in order to earn participation credit.</p>
      </div>` +
    spec.mk_intructions
  });
}

export const LECTURE_SPECS = [
  LECTURE_01,
  LECTURE_02,
  LECTURE_03,
  LECTURE_04,
  addW24Warning(LECTURE_05),
  addW24Warning(LECTURE_06),
  addW24Warning(LECTURE_07),
  addW24Warning(LECTURE_08),
  addW24Warning(LECTURE_09),
  addW24Warning(LECTURE_10),
  addW24Warning(LECTURE_11),
  addW24Warning(LECTURE_12),
  addW24Warning(LECTURE_13),
  addW24Warning(LECTURE_14),
  addW24Warning(LECTURE_15),
  addW24Warning(LECTURE_16),
  addW24Warning(LECTURE_17),
  addW24Warning(LECTURE_18),
  addW24Warning(LECTURE_19),
  addW24Warning(LECTURE_20),
  addW24Warning(LECTURE_21),
  addW24Warning(LECTURE_22),
];


LECTURE_SPECS.forEach(lec => {

  const generator = new ExamGenerator(Exam.create(lec), {
    uuid_strategy: "plain",
  });
  
  generator.assignExams([
    {name: "eecs280", uniqname: "eecs280"}
  ]),

  generator.writeAll(new DocRenderer());
});

