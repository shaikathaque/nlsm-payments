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

type Props = {
  email: string;
  amount: string;
  branch: string;
  athlete_name: string;
  method: string;
  bkash_transaction_id: string;
  orderId: string;
  date: string;
}

export const NLSMReceiptEmail = ({
  date = "",
  athlete_name = "",
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

      <Section>
        <Row>
          <Column>
            <Img
              src="https://nlsmbd.com/wp-content/uploads/2020/12/site-logo-white-background.png"
              height="100"
              alt="NLSM Logo"
            />
          </Column>
          {/* <Column align="right">
            <Text className="text-md">Athlete Progress Report</Text>
          </Column> */}
        </Row>
      </Section>

      <Hr />

      <Section>
            <Text className="text-center">Player Evaluation - October 2024</Text>
      </Section>

      <Section>
            <Text className="text-center">Shaikat Haque</Text>
      </Section>

      <Section>
        <Row>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>Technical Ability</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>Passing</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>4</Text>
          </Column>
        </Row>
        <Row>
          <Column align="center" className="h-[40px] w-1/3">
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>Dribbling</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>3</Text>
          </Column>
        </Row>
        <Row>
          <Column align="center" className="h-[40px] w-1/3">
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>Shooting</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>5</Text>
          </Column>
        </Row>
      </Section>

      <Section>
        <Row>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>Technical Ability</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>Passing</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>4</Text>
          </Column>
        </Row>
        <Row>
          <Column align="center" className="h-[40px] w-1/3">
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>Dribbling</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>3</Text>
          </Column>
        </Row>
        <Row>
          <Column align="center" className="h-[40px] w-1/3">
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>Shooting</Text>
          </Column>
          <Column align="center" className="h-[40px] w-1/3">
            <Text>5</Text>
          </Column>
        </Row>
      </Section>


      


      



    </Html>
  </Tailwind>
);

export default NLSMReceiptEmail;


