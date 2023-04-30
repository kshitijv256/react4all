import React from "react";

export default function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold">About</div>
      <div className="text-lg">
        This is a submission for Level 6 of the React for All course.
      </div>
      <div className="text-lg">
        This project is made by{" "}
        <a href="https://github.com/kshitijv256">
          <b>Kshitij Verma</b>
        </a>
      </div>
    </div>
  );
}
