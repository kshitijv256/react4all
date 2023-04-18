import React, { useEffect, useRef, useState } from "react";
import { MyForm, formItems } from "./data";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/login.svg";
import { Link } from "raviger";
import { useQueryParams } from "raviger";

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

export default function Home() {
  const [forms, setForms] = useState(() => getForms());
  const [{ search }, setQuery] = useQueryParams();
  const [searchText, setSearchText] = useState(search || "");

  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // TODO: Add new route for new form
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchText });
        }}
      >
        <label className="text-sm font-semibold pt-2">Search</label>
        <div className="flex w-full gap-2">
          <input
            className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search"
            ref={searchRef}
          />
          <button
            className="bg-cyan-500 text-white p-2 rounded-md w-fit"
            // onClick={(_) => props.removeField(props.id)}
          >
            Find
          </button>
        </div>
      </form>
      {forms
        .filter((form: MyForm) =>
          form.title.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((form: MyForm) => {
          return (
            <div
              className="p-3 flex items-center justify-between"
              key={form.id}
            >
              <h1 className="text-xl font-semibold">{form.title}</h1>
              <div className="flex gap-2">
                <Link
                  href={`/form/${form.id}`}
                  className="p-2 bg-cyan-500 rounded-lg text-white"
                >
                  <img src={editIcon} alt="open" className="w-8" />
                </Link>
                <Link
                  href={`/preview/${form.id}`}
                  className="p-2 bg-cyan-500 rounded-lg text-white"
                >
                  preview
                </Link>
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
