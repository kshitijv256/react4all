import React, { useState } from "react";
import { DropDownField } from "../types/data";
import downIcon from "../assets/down.svg";
import upIcon from "../assets/up.svg";

export default function DropDown(props: {
  field: DropDownField;
  selectCB: (selected: boolean, id: number, value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div
        className="w-full flex justify-between p-2 rounded-md bg-gray-200 cursor-pointer font-semibold"
        onClick={toggle}
      >
        {props.field.label}
        {open ? (
          <img src={upIcon} alt="up" className="w-4 inline-block ml-2" />
        ) : (
          <img src={downIcon} alt="down" className="w-4 inline-block ml-2" />
        )}
      </div>
      {props.field.options.map(
        (option: { selected: boolean; value: string }) => (
          <div
            className="ml-4 gap-2 py-1"
            style={open ? { display: "flex" } : { display: "none" }}
            key={option.value}
          >
            <input
              type="checkbox"
              id={option.value}
              checked={option.selected}
              onChange={(e) => {
                props.selectCB(e.target.checked, props.field.id, option.value);
              }}
            />
            <label htmlFor={option.value}>{option.value}</label>
          </div>
        )
      )}
    </div>
  );
}
