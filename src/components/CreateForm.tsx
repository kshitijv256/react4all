import React, { useState } from "react";
import { Form, Error, validateForm } from "../types/data";
import { navigate } from "raviger";
import { createForm } from "../utils/apiUtils";

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: false,
  });
  const [errors, setErrors] = useState<Error<Form>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try{
        const data = await createForm(form);
        if (data) {
          console.log("Form created successfully");
          navigate(`/form/${data.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg divide-y">
      <h1>Create Form</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Form Title"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            name="description"
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Form Description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="is_public"
            id="is_public"
            className=""
            value={form.is_public ? "true" : "false"}
            onChange={handleChange}
          />
          <label
            htmlFor="is_public"
            className="block text-gray-700 text-sm font-bold"
          >
            &nbsp;&nbsp;Is Public ?
          </label>
          {errors.is_public && (
            <p className="text-red-500 text-xs italic">{errors.is_public}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 rounded py-2 px-4 text-white"
        >
          Create Form
        </button>
      </form>
    </div>
  );
}
