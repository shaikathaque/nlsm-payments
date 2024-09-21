// import { renderToString } from 'https://cdn.skypack.dev/react-dom/server';
import React from "npm:react";
import { renderToString } from 'npm:react-dom/server';
import ReactPDF from 'npm:@react-pdf/renderer';
import Report from './report.tsx';
import { MyDocument } from "./report-pdf.tsx";

const handler = async (request: Request): Promise<Response> => {
  const payload = await request.json();

  const { record } = payload;
  const  { 
    athlete_id,
    year,
    quarter,
    passing,
    dribbling,
    shooting,
    discipline,
    awareness,
    attendance,
    comments,
  } = record;

  // get athlete info from the database


  // generate html report
  const html = renderToString(React.createElement(Report, { 
    athlete_id,
    year,
    quarter,
    passing,
    dribbling,
    shooting,
    discipline,
    awareness,
    attendance,
    comments,
   }));

   const pdf = await ReactPDF.render(React.createElement(MyDocument), `./example.pdf`);
   console.log(43, pdf);

  //  Try https://www.npmjs.com/package/@react-pdf/renderer for PDF
  // or html2canvas for image
  
  return new Response(JSON.stringify(html), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

Deno.serve(handler)
