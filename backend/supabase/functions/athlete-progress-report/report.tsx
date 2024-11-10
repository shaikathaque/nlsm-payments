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
  Tailwind,
  Button
} from "npm:@react-email/components";
import * as React from "npm:react";

type Scores = {
  [key: string]: number;
};

type Props = {
  date: string;
  first_name: string;
  last_name: string;
  scores: Scores;
  comments: string;
}

export const NLSMReportEmail = ({
  date = "",
  first_name = "",
  last_name = "",
  scores = {},
  comments = ""
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
              src="https://nlsmbd.com/wp-content/uploads/2024/11/nl-academy-logo.png"
              height="100"
              alt="NLSM Logo"
            />
          </Column>
        </Row>
      </Section>

      <Hr />

      {/* Title */}
      <Section>
            <Text className="text-center font-semibold">Player Evaluation: <span className="font-normal">{first_name} {last_name}</span></Text>
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
        {Object.entries(scores).map(([key, value], i) => (
          <Row key={i}>
            <Column align="center" className="h-[40px] w-1/3">
              <Text>{key}</Text>
            </Column>
            <Column align="center" className="h-[40px] w-1/3">
              <Text>{value}</Text>
            </Column>
          </Row>
        ))}
      </Section>

      {/* Comments */}
      <Section className="mt-10 px-32">
        <Text className="font-semibold">Coaches Comments:</Text>
        <Text className="">{comments}</Text>
      </Section>



    </Html>
  </Tailwind>
);

export default NLSMReportEmail;
