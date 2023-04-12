import React, { useState } from "react";

const getForms = () => {
  const forms = localStorage.getItem("forms");
  if (forms) {
    return JSON.parse(forms);
  }
  return [];
};

export default function Home(props: { openFormCB: () => void }) {
  const [forms, setForms] = useState(() => getForms());
  return (
    <div className="p-4 mx-auto bg-white rounded-xl flex flex-col">
      {forms.map((form: any) => {
        return (
          <div className="p-3">
            <h1 className="text-xl font-semibold">{form.title}</h1>
            <button>Open Form</button>
          </div>
        );
      })}
      <button
        onClick={props.openFormCB}
        className="p-2 bg-cyan-500 rounded-lg text-white"
      >
        Open Form
      </button>
    </div>
  );
}
