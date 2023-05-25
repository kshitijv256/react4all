import React from "react";

export default function About() {
  return (
    <div className="flex flex-col gap-4 mt-4 text-gray-700">
      <div className="text-2xl font-bold">About</div>
      <div className="text-lg">
        This is a submission for Level 8 of the React for All course.
      </div>
      <div>
        New in this submission:
        <ul className="list-disc ml-6 list">
          <li className="">Checked keyboard accessibilty of app</li>
          <li className="">
            Added shareable link using <b>react-copy-to-clipboard</b> package
          </li>
          <li>
            Added <b>react-qr-code</b> package to generate QR code for link
          </li>
        </ul>
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
