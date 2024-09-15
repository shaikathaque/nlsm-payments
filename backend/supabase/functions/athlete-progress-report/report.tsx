import * as React from "npm:react";

type Props = {
  athlete_id: string;
  year: number;
  quarter: number;
  passing: number;
  dribbling: number;
  shooting: number;
  discipline: number;
  awareness: number;
  attendance: number;
  comments: string;
}

export default function Report({ 
  athlete_id,
  year,
  quarter, 
  passing, 
  dribbling, 
  shooting, 
  discipline,
  awareness,
  comments
}: Props) {
  return (
    <div>
      <h1>Athlete Progress report for {athlete_id}</h1>
      <h2>Quarter: {quarter}</h2>
      <h2>Year: {year}</h2>

      <p>passing: {passing}</p>
      <p>dribbling: {dribbling}</p>
      <p>shooting: {shooting}</p>
      <p>discipline: {discipline}</p>
      <p>awareness: {awareness}</p>
      <p>awareness: {awareness}</p>

      <p>comments: {comments}</p>
    </div>
  )
}