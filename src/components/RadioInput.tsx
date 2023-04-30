import React from "react";
import { RadioField } from "../types/data";

export default function RadioInput(props: {
  field: RadioField;
  selectCB: (id: number, value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold pt-2">{props.field.label}</label>
      <div className="flex flex-col gap-2">
        <form>
          {props.field.options.map((option) => (
            <div className="flex items-center gap-2 ml-2" key={option}>
              <input
                type="radio"
                name={props.field.label}
                value={option}
                id={option}
                checked={props.field.value === option}
                onChange={(e) => {
                  props.selectCB(props.field.id, option);
                }}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
