import React from "react";
import deleteIcon from "../assets/delete.svg";
import { FormItem, RadioField } from "../types/data";

export default function RadioLabel(props: {
  item: RadioField;
  removeFieldCB: (id: number) => void;
  changedCB: (newForm: FormItem, id: number) => void;
  id: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-2">
        <input
          className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
          type="text"
          value={props.item.label}
          onChange={(e) => {
            const newForm = { ...props.item, label: e.target.value };
            props.changedCB(newForm, props.id);
          }}
        />
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          {<img src={deleteIcon} alt="delete" className="w-8" />}
        </button>
      </div>
      {props.item.options.map((option, index) => (
        <div className="ml-4 flex w-4/5 gap-2" key={index}>
          *{" "}
          <input
            className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
            type="text"
            value={option}
            onChange={(e) => {
              const newForm = {
                ...props.item,
                options: props.item.options.map((option, i) => {
                  if (i === index) {
                    return e.target.value;
                  }
                  return option;
                }),
              };
              props.changedCB(newForm, props.id);
            }}
          />
          <button
            className="bg-cyan-500 text-white p-2 rounded-md w-fit"
            onClick={(_) => {
              const newForm = {
                ...props.item,
                options: props.item.options.filter((_, i) => i !== index),
              };
              props.changedCB(newForm, props.id);
            }}
          >
            Del
          </button>
        </div>
      ))}
      <button
        className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        onClick={(_) => {
          const newForm = {
            ...props.item,
            options: [...props.item.options, ""],
          };
          props.changedCB(newForm, props.id);
        }}
      >
        Add option
      </button>
    </div>
  );
}
