import React, { useState } from "react";
import InputField from "./InputField";

const formItems = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: 4,
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    id: 5,
    label: "Date of Birth",
    type: "date",
    placeholder: "Enter your date of birth",
  },
];

export default function Form(props: { closeFormCB: () => void }) {
  const [formState, setFormState] = useState(formItems);
  const [fieldValue, setFieldValue] = useState("");

  const addField = () => {
    setFormState([
      ...formState,
      {
        id: Number(new Date()),
        label: fieldValue,
        type: "text",
        placeholder: "",
      },
    ]);
    setFieldValue("");
  };
  const removeField = (id: number) => {
    setFormState(formState.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 p-2 divide-y divide-double divide-gray-300">
      <div className="flex-1">
        {formState.map((item) => (
          <InputField
            removeField={removeField}
            item={item}
            key={item.id}
            id={item.id}
          />
        ))}
      </div>
      <div className="flex gap-2 pt-4">
        <input
          type="text"
          onChange={(e) => {
            setFieldValue(e.target.value);
          }}
          value={fieldValue}
          className="flex-1 border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none"
        />
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
      <div className="flex flex-row gap-2 pt-2">
        <button className="bg-cyan-500 text-white p-2 rounded-md w-fit">
          Submit
        </button>
        <button
          onClick={props.closeFormCB}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          Close Form
        </button>
      </div>
    </div>
  );
}
