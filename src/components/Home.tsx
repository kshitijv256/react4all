import React, { useState } from "react";
import { MyForm, formItems } from "./data";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/login.svg";

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
  // useEffect(() => {
  //   let timeout = setTimeout(() => {
  //     saveFormData(forms);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [forms]);
  const addForm = () => {
    const newForms = [
      ...forms,
      { id: Number(new Date()), title: "Untitled Form", fields: formItems },
    ];
    setForms(newForms);
    saveFormData(newForms);
  };
  const deleteForm = (id: number) => {
    const newForms = forms.filter((form: MyForm) => form.id !== id);
    setForms(newForms);
    saveFormData(newForms);
  };
  return (
    <div className="p-4 flex flex-col">
      {forms.map((form: MyForm) => {
        return (
          <div className="p-3 flex items-center justify-between" key={form.id}>
            <h1 className="text-xl font-semibold">{form.title}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => props.openFormCB(form.id)}
                className="p-2 bg-cyan-500 rounded-lg text-white"
              >
                <img src={editIcon} alt="open" className="w-8" />
              </button>
              <button
                onClick={() => deleteForm(form.id)}
                className="p-2 bg-cyan-500 rounded-lg text-white"
              >
                <img src={deleteIcon} alt="delete" className="w-8" />
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => addForm()}
        className="p-2 mt-4 bg-cyan-500 rounded-lg text-white text-lg font-semibold"
      >
        + Add Form
      </button>
    </div>
  );
}
