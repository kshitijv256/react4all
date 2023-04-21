import React from "react";
import deleteIcon from "../assets/delete.svg";
import { FormItem } from "../types/data";

export default function InputLabel(props: {
  item: FormItem;
  removeFieldCB: (id: number) => void;
  changedCB: (value: any, id: number) => void;
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
            props.changedCB(e.target.value, props.id);
          }}
          placeholder={props.item.placeholder}
        />
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          {<img src={deleteIcon} alt="delete" className="w-8" />}
        </button>
      </div>
    </div>
  );
}
