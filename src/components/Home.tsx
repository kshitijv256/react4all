import React, { useEffect, useRef, useState } from "react";
import { FormItem, MyForm, formItems } from "../types/data";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/login.svg";
import previewIcon from "../assets/preview.svg";
import searchIcon from "../assets/search.svg";
import { Link, useQueryParams } from "raviger";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import { listForms } from "../utils/apiUtils";

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

const fetchForms = async (setformsCB: (value: MyForm[]) => void) => {
  const forms = await listForms({limit: 3, offset: 0});
  setformsCB(forms.results);
};

export default function Home() {
  const [forms, setForms] = useState<MyForm[]>(getForms());
  const [{ search }, setQuery] = useQueryParams();
  const [searchText, setSearchText] = useState(search || "");
  const [newForm, setNewForm] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    fetchForms(setForms);
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
          <button className="bg-cyan-500 text-white p-2 rounded-md w-fit">
            <img src={searchIcon} alt="search" className="w-8" />
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
              className="py-3 flex items-center justify-between"
              key={form.id}
            >
              <h1 className="text-xl text-gray-800">{form.title}</h1>
              <div className="flex gap-2">
                <Link
                  href={`/form/${form.id}`}
                  className="p-2 bg-cyan-500 rounded-lg text-white"
                >
                  <img src={editIcon} alt="open" className="w-6" />
                </Link>
                <Link
                  href={`/preview/${form.id}`}
                  className="p-2 bg-cyan-500 rounded-lg text-white"
                >
                  <img src={previewIcon} alt="open preview" className="w-6" />
                </Link>
                <button
                  onClick={() => deleteForm(form.id)}
                  className="p-2 bg-cyan-500 rounded-lg text-white"
                >
                  <img src={deleteIcon} alt="delete" className="w-6" />
                </button>
              </div>
            </div>
          );
        })}
      <button
        onClick={(_) => setNewForm(true)}
        className="p-2 mt-4 bg-cyan-500 rounded-lg text-white text-lg font-semibold"
      >
        + Add Form
      </button>
      <Modal
        open={newForm}
        closeCB={() => {
          setNewForm(false);
        }}
      >
        <CreateForm />
      </Modal>
    </div>
  );
}
