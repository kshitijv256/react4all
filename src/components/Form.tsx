import React from "react";
import Header from "./Header";
import InputField from "./InputField";

const formItems = [
  {
    key: "1",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
  },
  {
    key: "2",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
  },
  {
    key: "3",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    key: "4",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    key: "5",
    label: "Date of Birth",
    type: "date",
    placeholder: "Enter your date of birth",
  },
];

export default function Form() {
  return (
    <div className="w-3/5 lg:w-2/5 p-4 my-10 mx-auto bg-white shadow-lg rounded-xl flex flex-col">
      <Header title="Level 1 Submission" />
      <form className="flex flex-col gap-4 p-2">
        {formItems.map((item) => (
          <InputField item={item} key={item.key} />
        ))}
        <button className="bg-cyan-500 text-white p-2 rounded-md w-fit">
          Submit
        </button>
      </form>
    </div>
  );
}
