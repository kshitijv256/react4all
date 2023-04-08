import React from "react";

export default function InputField(props: {
  item: { label: string; type: string; placeholder: string };
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">{props.item.label}</label>
      <input type={props.item.type} placeholder={props.item.placeholder} />
    </div>
  );
}
