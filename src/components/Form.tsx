import React, { useEffect, useRef, useState } from "react";
import { FormItem, MyForm, formItems, inputOptions } from "../types/data";
import resetIcon from "../assets/reset.svg";
import closeIcon from "../assets/logout.svg";
import { Link } from "raviger";
import InputLabel from "./InputLabel";
import DropdownLabel from "./DropdownLabel";
import RadioLabel from "./RadioLabel";

const saveFormData = (data: MyForm[]) => {
  localStorage.setItem("forms", JSON.stringify(data));
};

const getMyForms: () => MyForm[] = () => {
  const data = localStorage.getItem("forms");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

const getFormData: () => MyForm[] = () => {
  const data = getMyForms();
  if (data.length > 0) {
    return data;
  }
  return [
    {
      id: Number(new Date()),
      title: "Untitled Form",
      fields: formItems,
    },
  ];
};

export default function Form(props: { id: number }) {
  const [formState, setFormState] = useState(() => getFormData());
  const [fieldValue, setFieldValue] = useState("");
  const [type, setType] = useState("text");
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log("Component mounted");
    const oldTitle = document.title;
    document.title = "Form Builder";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(formState);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [formState]);

  const getField = () => {
    if (type === "dropdown") {
      return {
        kind: "dropdown",
        id: Number(new Date()),
        label: fieldValue,
        value: "",
        options: [],
        placeholder: "",
      } as FormItem;
    }
    if (type === "textarea") {
      return {
        kind: "textarea",
        id: Number(new Date()),
        label: fieldValue,
        value: "",
        placeholder: "",
      } as FormItem;
    }
    if (type === "radio") {
      return {
        kind: "radio",
        id: Number(new Date()),
        label: fieldValue,
        value: "",
        options: ["sample"],
        placeholder: "",
      } as FormItem;
    }
    return {
      kind: "text",
      id: Number(new Date()),
      label: fieldValue,
      type: type,
      value: "",
      placeholder: "",
    } as FormItem;
  };

  const addField = () => {
    if (fieldValue === "") {
      console.log("Field value is empty");
      return;
    }
    setFormState(
      formState.map((item) => {
        if (item.id === props.id) {
          return {
            ...item,
            fields: [...item.fields, getField()],
          };
        } else {
          return item;
        }
      })
    );
    setFieldValue("");
  };
  const removeField = (id: number) => {
    setFormState(
      formState.map((form) => {
        if (form.id === props.id) {
          return {
            ...form,
            fields: formState
              .filter((item) => item.id === props.id)[0]
              .fields.filter((item) => item.id !== id),
          };
        } else {
          return form;
        }
      })
    );
  };
  const changedCB = (newForm: FormItem, id: number) => {
    setFormState(
      formState.map((form) => {
        if (form.id === props.id) {
          return {
            ...form,
            fields: formState
              .filter((item1) => item1.id === props.id)[0]
              .fields.map((item) => {
                if (item.id === id) {
                  return newForm;
                } else {
                  return item;
                }
              }),
          };
        } else {
          return form;
        }
      })
    );
  };

  const resetForm = () => {
    setFormState(
      formState.map((form) => {
        if (form.id === props.id) {
          return {
            ...form,
            fields: formState
              .filter((item) => item.id === props.id)[0]
              .fields.map((item) => {
                return {
                  ...item,
                  value: "",
                };
              }),
          };
        } else {
          return form;
        }
      })
    );
  };

  const getLabel = (item: FormItem) => {
    if (item.kind === "dropdown") {
      return (
        <DropdownLabel
          removeFieldCB={removeField}
          changedCB={changedCB}
          item={item}
          key={item.id}
          id={item.id}
        />
      );
    }
    if (item.kind === "radio") {
      return (
        <RadioLabel
          removeFieldCB={removeField}
          changedCB={changedCB}
          item={item}
          key={item.id}
          id={item.id}
        />
      );
    }
    return (
      <InputLabel
        removeFieldCB={removeField}
        changedCB={changedCB}
        item={item}
        key={item.id}
        id={item.id}
      />
    );
  };

  return (
    <div className="flex flex-col gap-4 p-2 divide-y divide-double divide-gray-300">
      <div className="flex-1">
        <label className="text-sm font-semibold">Title</label>
        <input
          type="text"
          value={formState.find((item) => item.id === props.id)?.title}
          onChange={(e) => {
            setFormState(
              formState.map((item) => {
                if (item.id === props.id) {
                  return {
                    ...item,
                    title: e.target.value,
                  };
                } else {
                  return item;
                }
              })
            );
          }}
          ref={titleRef}
          className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full mt-2"
        />
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="font-semibold">Questions</h2>
          {formState
            .filter((item) => item.id === props.id)[0]
            .fields.map((item) => getLabel(item))}
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        <input
          type="text"
          onChange={(e) => {
            setFieldValue(e.target.value);
          }}
          value={fieldValue}
          className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none"
        />
        <div className="border-0 inline-flex w-fit px-2 bg-gray-100 justify-center rounded-md text-sm font-semibold text-gray-900">
          <select
            className="bg-gray-100 focus:outline-none"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            {inputOptions.map((item) => (
              <option key={item.label} value={item.value} className="">
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
      <div className="flex flex-row gap-2 pt-2">
        <button
          onClick={() => {
            saveFormData(formState);
          }}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          Save Form
        </button>
        <Link href="/" className="bg-cyan-500 text-white p-2 rounded-md w-fit">
          <img src={closeIcon} alt="delete" className="w-8" />
        </Link>
        <button
          onClick={resetForm}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          <img src={resetIcon} alt="delete" className="w-8" />
        </button>
      </div>
    </div>
  );
}
