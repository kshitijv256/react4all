import React, { useState } from "react";
import { MyForm } from "./data";
import { FormItem } from "./data";

export default function Preview(props: { formId: Number }) {
  const forms = localStorage.getItem("forms");
  const form =
    forms && JSON.parse(forms).find((form: MyForm) => form.id === props.formId);
  const [state, setState] = useState(0);
  const [formState, setFormState] = useState<FormItem[]>(form.fields);

  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">{form.title}</div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold pt-2">
            {form.fields[state].label}
          </label>
          <input
            className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
            type={form.fields[state].type}
            value={formState[state].value}
            onChange={(e) => {
              const newState = [...formState];
              newState[state].value = e.target.value;
              setFormState(newState);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 gap-4">
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-full"
          onClick={(_) => {
            if (state > 0) {
              setState(state - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-full"
          onClick={(_) => {
            if (state < form.fields.length - 1) {
              setState(state + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
