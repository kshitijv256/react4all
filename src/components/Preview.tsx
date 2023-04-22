import React, { useState } from "react";
import { MyForm, FormItem } from "../types/data";

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
        {state >= form.fields.length ? (
          <div className="text-lg text-center p-4">That's it for now.</div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold pt-2">
              {form.fields[state].label}
            </label>
            {form.fields[state].kind === "text" ? (
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
            ) : (
              <select>
                {form.fields[state].options.map((option: string) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-4 gap-4">
        <button
          className={`${
            state === 0
              ? "cursor-not-allowed bg-cyan-500/60"
              : "cursor-pointer bg-cyan-500"
          }  text-white p-2 rounded-md w-full`}
          onClick={(_) => {
            if (state > 0) {
              setState(state - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          className={`${
            state >= form.fields.length
              ? "cursor-not-allowed bg-cyan-500/60"
              : "cursor-pointer bg-cyan-500"
          }  text-white p-2 rounded-md w-full`}
          onClick={(_) => {
            if (state < form.fields.length) {
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
