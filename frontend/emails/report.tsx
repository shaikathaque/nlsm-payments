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
  return (
    <div>
      {
        Array.from({ length: score }, (_, i) => (
          <StarIcon key={i} />
        ))
      }
    </div>
  )
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

interface StarIconProps {
  size?: number;
  color?: string;
  className? :string;
}

const StarIcon: React.FC<StarIconProps> = ({ size = 16, color = 'gold', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="none"
      className={className}
      style={
        { 
          display: 'inline-block', 
          verticalAlign: 'middle',
          // marginBottom: '0.1em' 
        }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

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
    <Html className="my-10 mx-10">
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
            <Text className="text-5xl font-extrabold text-[#185f34]">PROGRESS REPORT</Text>
            <Text>{getQuarterInfo(date)}</Text>
      </Section>

      {/* Key Details */}
      <Section>
        <div className="grid grid-cols-2 gap-5">
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
      <Section className="mt-5">
        <div className="w-2/3">
          <Text className="font-semibold">GRADING SCALE</Text>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex items-center gap-1">5 <StarIcon size={18} className="mr-2"/>Excellent</div>
            <div className="flex items-center gap-1">4 <StarIcon size={18} className="mr-2"/>Very Good</div>
            <div className="flex items-center gap-1">3 <StarIcon size={18} className="mr-2"/>Improving</div>
            <div className="flex items-center gap-1">2 <StarIcon size={18} className="mr-2"/>Satisfactory</div>
            <div className="flex items-center gap-1">1 <StarIcon size={18} className="mr-2"/>Needs improvement</div>
            <div className="flex items-center gap-1">0 <StarIcon size={18} className="mr-2"/>Did not participate</div>
          </div>
        </div>
      </Section>

      {/* Progress */}
      <Section className="mt-5">

        {/* Table */}
        <div className="grid grid-cols-4 gap-2">

          {/* HEADER */}
          <div className="col-span-1 bg-slate-200">
            <Text className="font-semibold text-center">CATEGORY</Text>
          </div>
          <div className="col-span-3 bg-slate-200">
            <Text className="font-semibold pl-5">SCORE</Text>
          </div>

          {/* Scores */}
          {Object.entries(scores).map(([key, value], i) => (
            <>
              <div className="col-span-1 bg-[#185f34]" key={`category-${i}`}>
                <Text className="text-white font-semibold pl-5">{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              </div>
              <div className="pl-4 col-span-3 bg-slate-100 flex items-center" key={`score-${i}`}>
                {renderStars(value)}
              </div>
            </>
          ))}

          {/* Comments */}
          <div className="col-span-1 bg-slate-200 min-h-[120px]">
            <Text className="font-semibold px-5 pl-5 text-wrap">Coach's comments</Text>
          </div>
          <div className="col-span-3 bg-slate-100 min-h-[120px]">
            <Text className="px-5">{comments}</Text>
          </div>


        </div>
      </Section>

    </Html>
  </Tailwind>
);

export default NLSMReportEmail;
