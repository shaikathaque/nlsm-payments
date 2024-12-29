import {
  Column,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Font,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

type Scores = {
  [key: string]: number;
};

type Props = {
  date: string;
  first_name: string;
  last_name: string;
  scores: Scores;
  comments: string;
  dob: string;
  branch: string;
}

function getQuarterInfo(date: string): string {
  if (!date) return "Invalid date";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Invalid date";

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth(); // 0-based: Jan = 0, Feb = 1, ..., Dec = 11

  const quarters = [
    { quarter: "Q1", range: "JAN - MAR" },
    { quarter: "Q2", range: "APR - JUN" },
    { quarter: "Q3", range: "JUL - SEP" },
    { quarter: "Q4", range: "OCT - DEC" },
  ];

  const quarterIndex = Math.floor(month / 3);
  const { quarter, range } = quarters[quarterIndex];

  return `${quarter} | ${year} | ${range}`;
}

function getAgeFromDateString(dateString: string): number {
  if (!dateString) return NaN;

  const birthDate = new Date(dateString);
  if (isNaN(birthDate.getTime())) return NaN;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birth date hasn't occurred yet this year
  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

  if (isBeforeBirthday) {
    age--;
  }

  return age;
}


function renderStars(score: number) {
  return "⭐️ ".repeat(score);
}

function getBranchFullName(branchCode: string): string {
  const branchMap: Record<string, string> = {
    UTTARA_IHSB: "Uttara - IHSB",
    BASHUNDHARA_SG: "Bashundhara - Sports Grill",
    "100FT_HGT": "100 Feet - The Hangout",
  };

  return branchMap[branchCode] || branchCode;
}

function getAgeCategory(dob: string): string {
  if (!dob) return "Unknown";

  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return "Unknown";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birth date hasn't occurred yet this year
  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

  if (isBeforeBirthday) {
    age--;
  }

  // Determine category based on age
  if (age <= 7) return "Early Champs";
  if (age > 7 && age <= 14) return "Developmental";
  return "Advanced";
}

export const NLSMReportEmail = ({
  date = "2024-12-29",
  first_name = "First",
  last_name = "Last",
  scores = {techincal : 5, tactical: 4, physical: 3, mental: 5, attendance: 0},
  comments = "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.",
  dob = "1995-08-04",
  branch = "UTTARA_IHSB",
}: Props) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: "#007291",
          },
        },
      },
    }}
  >
    <Html className="my-10 mx-4 md:mx-14">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>NL Academy Athlete Progress Report</Preview>

      {/*  Header */}
      <Section>
        <Row>
          <Column>
            <Img
              src="https://nlsmbd.com/wp-content/uploads/2024/11/nl-academy-logo.png"
              width="300"
              alt="NLSM Logo"
            />
          </Column>
        </Row>
      </Section>


      {/* Title */}
      <Section>
            <Text className="text-3xl md:text-5xl font-extrabold text-[#185f34]">PROGRESS REPORT</Text>
            <Text>{getQuarterInfo(date)}</Text>
      </Section>

      {/* Key Details */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:pr-48">
          {/* Name */}
          <div>
            <Text className="">Name: <span className="font-semibold">{first_name} {last_name}</span></Text>
            <div className="w-full border-solid border-b-2 border-gray-200"/>
          </div>
        
          {/* Age */}
          <div>
            <Text>Age: <span className="font-semibold">{getAgeFromDateString(dob)}</span></Text>
            <div className="w-full border-solid border-b-2 border-gray-200"/>
          </div>

          {/* Category */}
          <div>
            <Text>Category: <span className="font-semibold">{getAgeCategory(dob)}</span></Text>
            <div className="w-full border-solid border-b-2 border-gray-200"/>
          </div>

          {/* Branch */}
          <div>
            <Text>Branch: <span className="font-semibold">{getBranchFullName(branch)}</span></Text>
            <div className="w-full border-solid border-b-2 border-gray-200"/>
          </div>

        </div>

      </Section>

      {/*  Grading Scale */}
      <Section className="mt-10">
        <div className="md:w-1/2">
          <Text className="font-semibold">GRADING SCALE</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>5 ⭐️ - Excellent</div>
            <div>4 ⭐️ - Very Good</div>
            <div>3 ⭐️ - Improving</div>
            <div>2 ⭐️ - Satisfactory</div>
            <div>1 ⭐️ - Needs improvement</div>
            <div>0 ⭐️ - Did not participate</div>
          </div>
        </div>
      </Section>

      {/* Progress */}
      <Section className="mt-20">

        {/* Table */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">

          {/* HEADER */}
          <div className="md:col-span-1 bg-slate-200">
            <Text className="font-semibold text-center">CATEGORY</Text>
          </div>
          <div className="md:col-span-3 bg-slate-200">
            <Text className="font-semibold pl-5">SCORE</Text>
          </div>

          {/* Scores */}
          {Object.entries(scores).map(([key, value], i) => (
            <>
              <div className="md:col-span-1 bg-[#185f34]" key={`category-${i}`}>
                <Text className="text-white font-semibold pl-5">{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              </div>
              <div className="md:col-span-3 bg-slate-100" key={`score-${i}`}>
                <Text className="font-semibold pl-5">{renderStars(value)}</Text>
              </div>
            </>
          ))}

          {/* Comments */}
          <div className="md:col-span-1 bg-slate-200 min-h-[120px]">
            <Text className="font-semibold px-5 md:pl-5 text-wrap">Coach's comments</Text>
          </div>
          <div className="md:col-span-3 bg-slate-100 min-h-[120px]">
            <Text className="px-5">{comments}</Text>
          </div>


        </div>
      </Section>

    </Html>
  </Tailwind>
);

export default NLSMReportEmail;
