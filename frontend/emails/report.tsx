import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Font,
} from "@react-email/components";
import { Tailwind, Button } from "@react-email/components";
import * as React from "react";

interface Score {
  category: string;
  score: number;
};

type Props = {
  date: string;
  first_name: string;
  last_name: string;
  scores: Score[]
  comment: string;
}

const testScores: Score[] = [
  {
    category: "Passing",
    score: 10
  },
  {
    category: "Dribbling",
    score: 8
  },
  {
    category: "Attendance",
    score: 5
  },
  {
    category: "Discipline",
    score: 10
  },
]

export const NLSMReceiptEmail = ({
  date = "Oct 5, 2024",
  first_name = "Shaikat",
  last_name = "Haque",
  scores = testScores
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
    <Html>
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
              src="https://nlsmbd.com/wp-content/uploads/2020/12/site-logo-white-background.png"
              height="100"
              alt="NLSM Logo"
            />
          </Column>
        </Row>
      </Section>

      <Hr />

      {/* Title */}
      <Section>
            <Text className="text-center font-semibold">Player Evaluation: <span className="font-normal">Shaikat Haque</span></Text>
            <Text className="text-center font-semibold">Date: <span className="font-normal">{date}</span></Text>
      </Section>

      {/* Scores */}
      <Section className="px-5">
        <Row>
          <Column align="center" className="h-[40px] w-1/3">
            <Text className="font-semibold">Category</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text className="font-semibold">Score <span className="font-normal">(out of 10)</span></Text>
          </Column>
        </Row>
        {scores.map((score, i) => (
          <Row key={i}>
            <Column align="center" className="h-[40px] w-1/3">
              <Text>{score.category}</Text>
            </Column>
            <Column align="center" className="h-[40px] w-1/3">
              <Text>{score.score}</Text>
            </Column>
          </Row>
        ))}
      </Section>

      {/* Comments */}
      <Section className="mt-10 px-32">
        <Text className="font-semibold">Coaches Comments:</Text>
        <Text className="">{lorenIpsum}</Text>
      </Section>



    </Html>
  </Tailwind>
);

export default NLSMReceiptEmail;

const lorenIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
