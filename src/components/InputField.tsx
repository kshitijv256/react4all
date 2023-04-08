import React from "react";
import deleteIcon from "../delete.svg";

export default function InputField(props: {
  item: { label: string; type: string; placeholder: string };
  removeField: (id: number) => void;
  id: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">{props.item.label}</label>
      <div className="flex w-full gap-2">
        <input
          className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
          type={props.item.type}
          placeholder={props.item.placeholder}
        />
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
          onClick={(_) => props.removeField(props.id)}
        >
          {<img src={deleteIcon} alt="delete" className="w-8" />}
        </button>
      </div>
    </div>
  );
}
