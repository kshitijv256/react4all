import React, { useState } from "react";
import deleteIcon from "../assets/delete.svg";
import { DropDownField, FormItem } from "../types/data";
import editIcon from "../assets/edit.svg";
import trashIcon from "../assets/trash.png";
import plusicon from "../assets/plus.png";

export default function DropDownLabel(props: {
  item: DropDownField;
  removeFieldCB: (id: number) => void;
  changedCB: (newForm: FormItem, id: number) => void;
  id: number;
}) {
  const [label, setLabel] = useState(props.item.label);
  const [opText, setOpText] = useState("");
  const addOption = (value: string) => {
    if (value === "") return;
    const newForm = {
      ...props.item,
      options: [...props.item.options, { selected: false, value: value }],
    };
    props.changedCB(newForm, props.id);
    setOpText("");
  };
  const removeOption = (index: number) => {
    if (props.item.options.length === 1) return;
    const newForm = {
      ...props.item,
      options: props.item.options.filter((_, i) => i !== index),
    };
    props.changedCB(newForm, props.id);
  };

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
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
          onClick={(_) => updateLabel()}
        >
          {<img src={editIcon} alt="delete" className="w-8" />}
        </button>
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          {<img src={deleteIcon} alt="delete" className="w-8" />}
        </button>
      </div>
      <div>
        {props.item.options.length === 0 ? (
          <div className="bg-red-400 text-white rounded p-2">
            Must have at least one option to be visible
          </div>
        ) : null}
      </div>
      {props.item.options.map((option, index) => (
        <div className="ml-4 flex w-4/5 gap-2 items-center" key={index}>
          #{" "}
          <div className="rounded-lg p-2 bg-gray-200 hover:bg-gray-300 w-full">
            {option.value}
          </div>
          <button
            className="bg-cyan-500 text-white p-2 rounded-md w-fit"
            onClick={(_) => removeOption(index)}
          >
            {<img src={trashIcon} alt="delete" className="w-8" />}
          </button>
        </div>
      ))}
      <div className="ml-4 flex gap-2 items-center w-4/5">
        <input
          className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
          type="text"
          value={opText}
          onChange={(e) => {
            setOpText(e.target.value);
          }}
        />
        <button
          className="bg-cyan-500 text-white p-2 rounded-md"
          onClick={(_) => addOption(opText)}
        >
          {<img src={plusicon} alt="delete" className="w-8" />}
        </button>
      </div>
    </div>
  );
}
