import React, { useReducer } from "react";
import { MyForm, FormItem } from "../types/data";
import DropDown from "./DropDown";
import { Link } from "raviger";
import closeIcon from "../assets/close.svg";
import RadioInput from "./RadioInput";

const saveForm = (newState: FormItem[], id: number) => {
  const forms = localStorage.getItem("forms") || "[]";
  const newForms = JSON.parse(forms).map((form: MyForm) => {
    if (form.id === id) {
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

// Actions
type ChangeAction = {
  type: "CHANGE";
  data: string;
  index: number;
  formId: number;
};

type SelectOption = {
  type: "SELECT_OPTION";
  selected: boolean;
  id: number;
  value: string;
  formId: number;
};

type SelectRadio = {
  type: "SELECT_RADIO";
  id: number;
  value: string;
  formId: number;
};

type Actions = ChangeAction | SelectOption | SelectRadio;

type IncreaseIndex = {
  type: "INCREASE_INDEX";
};

type DecreaseIndex = {
  type: "DECREASE_INDEX";
};

type IndexActions = IncreaseIndex | DecreaseIndex;

const indexReducer = (state: number, action: IndexActions) => {
  switch (action.type) {
    case "INCREASE_INDEX":
      return state + 1;
    case "DECREASE_INDEX":
      return state - 1;
    default:
      return state;
  }
};

const reducer = (state: FormItem[], action: Actions) => {
  switch (action.type) {
    case "CHANGE": {
      const newState = [...state];
      newState[action.index].value = action.data;
      saveForm(newState, action.formId);
      return newState;
    }
    case "SELECT_OPTION": {
      const newState = state.map((field) => {
        if (field.id === action.id && field.kind === "DROPDOWN") {
          return {
            ...field,
            options: field.options.map((option) => {
              if (option.value === action.value) {
                return {
                  ...option,
                  selected: action.selected,
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
      saveForm(newState, action.formId);
      return newState;
    }
    case "SELECT_RADIO": {
      const newState = state.map((field) => {
        if (field.id === action.id && field.kind === "RADIO") {
          return {
            ...field,
            value:
              field.options.find((option) => option === action.value) || "",
          };
        } else {
          return field;
        }
      });
      saveForm(newState, action.formId);
      return newState;
    }
    default:
      return state;
  }
};

export default function Preview(props: { formId: number }) {
  const forms = localStorage.getItem("forms") || "[]";
  const form =
    forms && JSON.parse(forms).find((form: MyForm) => form.id === props.formId);
  const [state, dispatchIndex] = useReducer(indexReducer, 0);
  const [formState, dispatch] = useReducer(reducer, null, () => form.fields);

  const selectOption = (selected: boolean, id: number, value: string) => {
    dispatch({
      type: "SELECT_OPTION",
      selected,
      id,
      value,
      formId: props.formId,
    });
  };

  const selectRadio = (id: number, value: string) => {
    dispatch({
      type: "SELECT_RADIO",
      id,
      value,
      formId: props.formId,
    });
  };

  const handleChange = (value: string) => {
    dispatch({
      type: "CHANGE",
      data: value,
      index: state,
      formId: props.formId,
    });
  };

  const renderField = (field: FormItem) => {
    if (field.kind === "TEXT") {
      return (
        <div>
          <label className="text-sm font-semibold pt-2">
            {form.fields[state].label}
          </label>
          <input
            className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
            type={form.fields[state].type}
            value={formState[state].value}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    }
    if (field.kind === "GENERIC") {
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
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    }
    if (field.kind === "DROPDOWN") {
      return <DropDown field={form.fields[state]} selectCB={selectOption} />;
    }
    if (field.kind === "RADIO") {
      return <RadioInput field={field} selectCB={selectRadio} />;
    }
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">{form.title}</div>
        <Link href="/">
          <img src={closeIcon} alt="close" className="h-8" />
        </Link>
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
              dispatchIndex({ type: "DECREASE_INDEX" });
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
              dispatchIndex({ type: "INCREASE_INDEX" });
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
