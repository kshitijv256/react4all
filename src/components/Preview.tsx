import React, { useState } from "react";
import { MyForm, FormItem } from "../types/data";
import DropDown from "./DropDown";

export default function Preview(props: { formId: number }) {
  const forms = localStorage.getItem("forms") || "[]";
  const form =
    forms && JSON.parse(forms).find((form: MyForm) => form.id === props.formId);
  const [state, setState] = useState(0);
  const [formState, setFormState] = useState<FormItem[]>(form.fields);

  const saveForm = (newState: FormItem[]) => {
    const newForms = JSON.parse(forms).map((form: MyForm) => {
      if (form.id === props.formId) {
        return {
          ...form,
          fields: newState,
        };
      } else {
        return form;
      }
    });
    localStorage.setItem("forms", JSON.stringify(newForms));
  };

  const selectOption = (selected: boolean, id: number, value: string) => {
    const newState = formState.map((field) => {
      if (field.id === id && field.kind === "dropdown") {
        return {
          ...field,
          options: field.options.map((option) => {
            if (option.value === value) {
              return {
                ...option,
                selected,
              };
            } else {
              return option;
            }
          }),
        };
      } else {
        return field;
      }
    });
    setFormState(newState);
    saveForm(newState);
  };

  const renderField = (field: FormItem) => {
    if (field.kind === "text") {
      return (
        <div>
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
      );
    }
    if (field.kind === "textarea") {
      return (
        <div>
          <label className="text-sm font-semibold pt-2">
            {form.fields[state].label}
          </label>
          <textarea
            className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
            value={formState[state].value}
            cols={30}
            rows={5}
            onChange={(e) => {
              const newState = [...formState];
              newState[state].value = e.target.value;
              setFormState(newState);
            }}
          />
        </div>
      );
    }
    if (field.kind === "dropdown") {
      return <DropDown field={form.fields[state]} selectCB={selectOption} />;
    }
  };

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
            {renderField(form.fields[state])}
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
