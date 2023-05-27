import React from "react";

export default function About() {
  return (
    <div className="flex flex-col gap-4 mt-4 text-gray-700">
      <div className="text-2xl font-bold">About</div>
      <div className="text-lg">
        This is a submission for Level 9 of the React for All course.
      </div>
      <div>
        New in this submission:
        <ul className="list-disc ml-6 list">
          <li className="">
            Integrated sentry for error reporting and performance monitoring
          </li>
          <li>
            Added Location picker from source without installing{" "}
            <b>react-google-map-picker-custom</b> package
          </li>
          <li>Deployed on Netlify</li>
          <li>Made Web app a PWA</li>
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
