import { CUSTOMIZE, DocRenderer, Exam, ExamSpecification } from "examma-ray";
import { ExamGenerator } from "examma-ray/dist/ExamGenerator";
import { DateTime } from "luxon";
import { INTRO } from "./lecture01/lecture01";
import { TYPES_CONTROL_STRUCTURES_AND_PROCEDURAL_ABSTRACTION } from "./lecture02/lecture02";
import { MACHINE_MODEL_PART_1 } from "./lecture03/lecture03";
import { MACHINE_MODEL_PART_2 } from "./lecture04/lecture04";
import { CONST_STRUCTS_AND_C_STYLE_ADTS } from "./lecture05/lecture05";
import { STREAMS_AND_IO } from "./lecture06/lecture06";
import { PROGRAM_DESIGN_AND_DEBUGGING } from "./lecture07/lecture07";
import { ADTS_IN_CPP } from "./lecture08/lecture08";
import { OPERATOR_OVERLOADING_AND_INHERITANCE } from "./lecture09/lecture09";
import { POLYMORPHISM } from "./lecture10/lecture10";
import { CONTAINERS_AND_ITERATORS } from "./lecture13_5/lecture13_5";
import { ARRAYS_POINTER_ARITHMETIC_C_STRINGS } from "./lecture11/lecture11";
import { ARRAY_BASED_DATA_STRUCTURES } from "./lecture12/lec";
import { SORTED_VS_UNSORTED_DATA_STRUCTURES } from "./lecture13/lec";
import { DYNAMIC_MEMORY } from "./lecture14/lec";
import { RAII_AND_GROWABLE_CONTAINERS } from "./lecture15/lec";
import { DEEP_COPIES_AND_THE_BIG_THREE } from "./lecture16/lec";
import { LINKED_LISTS } from "./lecture17/lec";
import { LINKED_LIST_ITERATORS } from "./lecture18/lec";
import { FUNCTORS_AND_IMPOSTOR_SYNDROME } from "./lecture19/lec";
import { RECURSION } from "./lecture20/lec";
import { STRUCTURAL_RECURSION } from "./lecture21/lec";
import { BINARY_SEARCH_TREES } from "./lecture22/lec";
import { EXCEPTIONS } from "./lecture23/lec";
import dedent from "ts-dedent";
import { MK_BOTTOM_MESSAGE, MK_DOWNLOAD_MESSAGE, MK_QUESTIONS_MESSAGE, MK_SAVER_MESSAGE } from "../common/messages";

function addW24Warning(spec: ExamSpecification) {
  return CUSTOMIZE(spec, {
    mk_intructions: dedent`
      <div markdown="1" class="alert alert-danger">
        <p>Please note that this lecture has not yet been updated for Fall 2024. The sequence and content of several lectures will change significantly, so we recommend you do NOT work through them before they are updated. I'll try to get a few lectures ahead once the term starts.</p>
      </div>` +
    spec.mk_intructions
  });
}

const FAVICON_LINKS = `
<link rel="icon" type="image/png" href="/eecs280-async-lectures/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/eecs280-async-lectures/favicon.svg" />
<link rel="shortcut icon" href="/eecs280-async-lectures/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/eecs280-async-lectures/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Async Lecs" />
<link rel="manifest" href="/eecs280-async-lectures/site.webmanifest" />
`;

export const LECTURE_SPECS = [
  { spec: INTRO                                                 , updated: true, deadline: DateTime.fromISO("2025-01-08", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: TYPES_CONTROL_STRUCTURES_AND_PROCEDURAL_ABSTRACTION   , updated: true, deadline: DateTime.fromISO("2025-01-13", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: MACHINE_MODEL_PART_1                                  , updated: true, deadline: DateTime.fromISO("2025-01-15", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: MACHINE_MODEL_PART_2                                  , updated: true, deadline: DateTime.fromISO("2025-01-22", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: CONST_STRUCTS_AND_C_STYLE_ADTS                        , updated: true, deadline: DateTime.fromISO("2025-01-27", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: STREAMS_AND_IO                                        , updated: true, deadline: DateTime.fromISO("2025-01-29", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: PROGRAM_DESIGN_AND_DEBUGGING                          , updated: true, deadline: DateTime.fromISO("2025-02-03", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: ADTS_IN_CPP                                           , updated: true, deadline: DateTime.fromISO("2025-02-05", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: OPERATOR_OVERLOADING_AND_INHERITANCE                  , updated: true, deadline: DateTime.fromISO("2025-02-10", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: POLYMORPHISM                                          , updated: true, deadline: DateTime.fromISO("2025-02-12", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: ARRAYS_POINTER_ARITHMETIC_C_STRINGS                   , updated: true, deadline: DateTime.fromISO("2025-02-17", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: ARRAY_BASED_DATA_STRUCTURES                           , updated: true, deadline: DateTime.fromISO("2025-02-19", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: SORTED_VS_UNSORTED_DATA_STRUCTURES                    , updated: true, deadline: DateTime.fromISO("2025-02-24", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  { spec: CONTAINERS_AND_ITERATORS                              , updated: true, deadline: DateTime.fromISO("2025-02-27", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: DYNAMIC_MEMORY                                     , updated: true, deadline: DateTime.fromISO("2025-03-10", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: RAII_AND_GROWABLE_CONTAINERS                       , updated: true, deadline: DateTime.fromISO("2025-03-12", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: DEEP_COPIES_AND_THE_BIG_THREE                      , updated: true, deadline: DateTime.fromISO("2025-03-19", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: LINKED_LISTS                                       , updated: true, deadline: DateTime.fromISO("2025-03-24", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: LINKED_LIST_ITERATORS                              , updated: true, deadline: DateTime.fromISO("2025-03-26", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: FUNCTORS_AND_IMPOSTOR_SYNDROME                     , updated: true, deadline: DateTime.fromISO("2025-03-31", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: RECURSION                                          , updated: true, deadline: DateTime.fromISO("2025-04-02", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: STRUCTURAL_RECURSION                               , updated: true, deadline: DateTime.fromISO("2025-04-07", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: BINARY_SEARCH_TREES                                , updated: true, deadline: DateTime.fromISO("2025-04-09", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: EXCEPTIONS                                         , updated: true, deadline: DateTime.fromISO("2025-04-14", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
  // { spec: EXCEPTIONS                                         , updated: true, deadline: DateTime.fromISO("2025-04-16", {zone: "America/Detroit"}).plus({hours: 23, minutes: 59, seconds: 59}) },
].map((lec, i) => {
  let spec = CUSTOMIZE(lec.spec, {
    // mk_intructions: dedent`
    //   <div markdown="1" class="alert alert-danger">
    //     <p>Due to electrical work affecting a North Campus server room, the participation server is temporarily down. Once it comes back up you'll be able to see your participation credit again.</p>
    //   </div>` +
    //   lec.spec.mk_intructions,
    exam_id: `w25_lec_${String(i + 1).padStart(2, "0")}`,
    mk_intructions: FAVICON_LINKS + lec.spec.mk_intructions,
    mk_questions_message: MK_QUESTIONS_MESSAGE,
    mk_bottom_message: MK_BOTTOM_MESSAGE,
    mk_download_message: MK_DOWNLOAD_MESSAGE,
    mk_saver_message: MK_SAVER_MESSAGE,
    allow_clientside_content: true,
  });

  if (lec.updated) {
    spec = CUSTOMIZE(spec, {
      credentials_strategy: {
        strategy: "google_local",
        client_id: "444801118749-m2g9gl3gvvkh5ru959dmka0lsk94d9uq.apps.googleusercontent.com",
        // client_id: "444801118749-099920plmkl1s5n5u563pbmu71lo4bot.apps.googleusercontent.com",
        auth_endpoint: "https://examma-ray.eecs.umich.edu/public_api/participation/auth/",
        message: "Sign in with your @umich.edu Google account to earn participation credit for completing embedded exercises."
      },
      completion: {
        threshold: 1,
        tooltip: "",
        endpoints: {
          check: "https://examma-ray.eecs.umich.edu/public_api/participation/me/",
          submit: "https://examma-ray.eecs.umich.edu/public_api/participation/me/",
          // check: "https://localhost/public_api/participation/me/",
          // submit: "https://localhost/public_api/participation/me/",
        },
        local_deadline: lec.deadline && {
          when: lec.deadline,
          grace_minutes: 5
        }
      }
    });
  }
  else {
    spec = addW24Warning(spec);
  }


  return spec;
});


LECTURE_SPECS.forEach(lec => {

  const generator = new ExamGenerator(Exam.create(lec), {
    uuid_strategy: "plain",
  });
  
  generator.assignExams([
    {name: "eecs280", uniqname: "eecs280"}
  ]),

  generator.writeAll(new DocRenderer());
});

