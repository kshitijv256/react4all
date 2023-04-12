import React, { useEffect, useState } from "react";
import { MyForm, formItems } from "./data";

const getForms = () => {
  const forms = localStorage.getItem("forms");
  if (forms) {
    return JSON.parse(forms);
  }
  return [];
};
const saveFormData = (data: MyForm[]) => {
  localStorage.setItem("forms", JSON.stringify(data));
};

export default function Home(props: { openFormCB: (id: number) => void }) {
  const [forms, setForms] = useState(() => getForms());
  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(forms);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [forms]);
  const addForm = () => {
    setForms([
      ...forms,
      {
        id: Number(new Date()),
        title: "Untitled Form",
        fields: formItems,
      },
    ]);
  };
  const deleteForm = (id: number) => {
    const newForms = forms.filter((form: any) => form.id !== id);
    setForms(newForms);
  };
  return (
    <div className="p-4 flex flex-col">
      {forms.map((form: any) => {
        return (
          <div className="p-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">{form.title}</h1>
            <button
              onClick={() => props.openFormCB(form.id)}
              className="p-2 bg-cyan-500 rounded-lg text-white"
            >
              Open Form
            </button>
            <button
              onClick={() => deleteForm(form.id)}
              className="p-2 bg-cyan-500 rounded-lg text-white"
            >
              Delete Form
            </button>
          </div>
        );
      })}
      <button
        onClick={() => addForm()}
        className="p-2 mt-4 bg-cyan-500 rounded-lg text-white"
      >
        Add Form
      </button>
    </div>
  );
}
