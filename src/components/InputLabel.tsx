import React, { useState } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { FormItem } from "../types/data";

export default function InputLabel(props: {
  item: FormItem;
  removeFieldCB: (id: number) => void;
  changedCB: (newForm: FormItem, id: number) => void;
  id: number;
}) {
  const [label, setLabel] = useState(props.item.label);
  const updateLabel = () => {
    const newForm = { ...props.item, label: label };
    props.changedCB(newForm, props.id);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-2">
        <input
          className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
          type="text"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
        />
        <button
          className="bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-md w-fit"
          onClick={(_) => updateLabel()}
        >
          {<img src={editIcon} alt="delete" className="w-8" />}
        </button>
        <button
          className="bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-md w-fit"
          onClick={() => props.removeFieldCB(props.id)}
        >
          {<img src={deleteIcon} alt="delete" className="w-8" />}
        </button>
      </div>
    </div>
  );
}
