import React, { useEffect, useState } from "react";
import InputField from "./InputField";

interface FormItem {
  id: number;
  label: string;
  type: string;
  value: any;
  placeholder: string;
}

const formItems: FormItem[] = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    value: "",
    placeholder: "Enter your first name",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    value: "",
    placeholder: "Enter your last name",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    value: "",
    placeholder: "Enter your email",
  },
  {
    id: 4,
    label: "Phone Number",
    type: "tel",
    value: "",
    placeholder: "Enter your phone number",
  },
  {
    id: 5,
    label: "Date of Birth",
    type: "date",
    value: "",
    placeholder: "Enter your date of birth",
  },
];

const saveFormData = (data: any) => {
  localStorage.setItem("forms", JSON.stringify(data));
};

const getFormData: () => FormItem[] = () => {
  const data = localStorage.getItem("forms");
  if (data) {
    return JSON.parse(data);
  }
  return formItems;
};

export default function Form(props: { closeFormCB: () => void }) {
  const [formState, setFormState] = useState(() => getFormData());
  const [fieldValue, setFieldValue] = useState("");
  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Builder";
    return () => {
      document.title = oldTitle;
    };
  }, []);

  const addField = () => {
    setFormState([
      ...formState,
      {
        id: Number(new Date()),
        label: fieldValue,
        type: "text",
        value: "",
        placeholder: "",
      },
    ]);
    setFieldValue("");
  };
  const removeField = (id: number) => {
    setFormState(formState.filter((item) => item.id !== id));
  };
  const changedCB = (value: any, id: number) => {
    setFormState(
      formState.map((item) => {
        if (item.id === id) {
          return { ...item, value };
        }
        return item;
      })
    );
  };
  const resetForm = () => {
    setFormState(formItems);
  };

  return (
    <div className="flex flex-col gap-4 p-2 divide-y divide-double divide-gray-300">
      <div className="flex-1">
        {formState.map((item) => (
          <InputField
            removeField={removeField}
            changedCB={changedCB}
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
        <button
          onClick={() => {
            saveFormData(formState);
          }}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          Save Form
        </button>
        <button
          onClick={props.closeFormCB}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          Close Form
        </button>
        <button
          onClick={resetForm}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
}
