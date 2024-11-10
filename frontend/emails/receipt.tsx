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
} from "@react-email/components";
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
  orderId = "",
  email = "",
  date = "",
  amount = "",
  branch = "",
  athlete_name = "",
  method = "",
  bkash_transaction_id = "",
}: Props) => (
  <Html>
    <Head />
    <Preview>NLSM Payment Receipt</Preview>

    <Body style={main}>
      <Container style={container}>

        {/* HEADER */}
        <Section>
          <Row>
            <Column>
              <Img
                src="https://nlsmbd.com/wp-content/uploads/2024/11/nl-academy-logo.png"
                width={200}
                alt="NLSM Logo"
              />
            </Column>
            <Column align="right" style={tableCell}>
              <Text style={heading}>Receipt</Text>
            </Column>
          </Row>
        </Section>

        {/* TITLE */}
        <Section>
          <Text style={cupomText}>
            We have received your payment. Thank you for being with NLSM.
          </Text>
        </Section>

        {/* INFORMATION */}
        <Section style={informationTable}>
          <Row style={informationTableRow}>
            <Column>
              <Section>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Athlete Name</Text>
                    <Text style={informationTableValue}>{athlete_name}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Date</Text>
                    <Text style={informationTableValue}>{date}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Order ID</Text>
                    <Text style={informationTableValue}>{orderId}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Payment Method</Text>
                    <Text style={informationTableValue}>
                      {method}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  {
                    bkash_transaction_id && (
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>BKash Transaction ID</Text>
                        <Text style={informationTableValue}>
                          {bkash_transaction_id}
                        </Text>
                      </Column>
                    )
                  }
                </Row>

              </Section>
            </Column>
          </Row>
        </Section>

        {/* SERVICE */}
        <Section style={productTitleTable}>
          <Text style={productsTitle}>Service</Text>
        </Section>
        <Section>
          <Row>
            <Column style={{ width: "64px" }}>
              <Img
                src="https://nlsmbd.com/wp-content/uploads/2024/11/nl-yellow-logo.png"
                width="64"
                height="64"
                alt="NL Academy Logo"
                style={productIcon}
              />
            </Column>
            <Column style={{ paddingLeft: "22px" }}>
              <Text style={productTitle}>NL Academy Payment</Text>
              <Text style={productDescription}>{branch}</Text>
            </Column>

            <Column style={productPriceWrapper} align="right">
              <Text style={productPrice}>BDT {amount}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>BDT {amount}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLineBottom} />


        <Text style={footerCopyright}>
          Copyright © 2024 Next Level Sports Management<br />{" "}
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NLSMReceiptEmail;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const cupomText = {
  textAlign: "center" as const,
  margin: "36px 12px 40px 12px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#111111",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};
