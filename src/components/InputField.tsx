import React from "react";

export default function InputField(props: {
  item: { label: string; type: string; placeholder: string };
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">{props.item.label}</label>
      <input
        className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none"
        type={props.item.type}
        placeholder={props.item.placeholder}
      />
    </div>
  );
}
