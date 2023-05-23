import { useEffect, useRef, useState } from "react";
import { Link } from "raviger";
import resetIcon from "../assets/reset.svg";
import closeIcon from "../assets/logout.svg"
import { FormItem, MyForm, inputOptions } from "../types/data";
import { createFormFields, getForm, getFormFields, updateFormFields } from "../utils/apiUtils";
import DropdownLabel from "./DropdownLabel";
import RadioLabel from "./RadioLabel";
import InputLabel from "./InputLabel";

// wrap in try catch

const getFields = async (id: number, setFieldsCB: (value: FormItem[]) => void) => {
  const data = await getFormFields(id);
  setFieldsCB(data.results);
}

const getTitle = async (id: number, setTitleCB: (value: string) => void) => {
  const data = await getForm(id);
  setTitleCB(data.title);
}

const addField = async (id: number, field: FormItem, setFieldsCB: (value: FormItem[]) => void) => {
  await createFormFields(id, field);
  getFields(id, setFieldsCB);
}

const updateField = async (form_pk: number, field: FormItem, id: number, setFieldsCB: (value: FormItem[]) => void) => {
  await updateFormFields(form_pk, field, id);
  getFields(form_pk, setFieldsCB);
}

export default function FormUI(props: { id: number }) {
  const [title, setTitle] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [type, setType] = useState("text");
  const [fields, setFields] = useState<FormItem[]>([]);

  useEffect(() => {
    getFields(props.id, setFields);
    getTitle(props.id, setTitle);
  }, [props.id]);

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

  const getField = () => {
    if (type === "dropdown") {
      return {
        kind: "DROPDOWN",
        id: Number(new Date()),
        label: fieldValue,
        value: "",
        options: [],
        placeholder: "",
      } as FormItem;
    }
    if (type === "textarea") {
      return {
        kind: "GENERIC",
        id: Number(new Date()),
        label: fieldValue,
        value: "",
        placeholder: "",
      } as FormItem;
    }
    if (type === "radio") {
      return {
        kind: "RADIO",
        id: Number(new Date()),
        label: fieldValue,
        value: "",
        options: [],
        placeholder: "",
      } as FormItem;
    }
    return {
      kind: "TEXT",
      id: Number(new Date()),
      label: fieldValue,
      type: type,
      value: "",
      placeholder: "",
    } as FormItem;
  };

  const removeField = (id: number) => {
    const newFields = fields.filter((item) => item.id !== id);
    setFields(newFields);
  };
  const changedCB = (newForm: FormItem, id: number) => {
    updateField(props.id, newForm, id, setFields);
  };

  const getLabel = (item: FormItem) => {
    if (item.kind === "DROPDOWN") {
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
    if (item.kind === "RADIO") {
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
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          ref={titleRef}
          className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full mt-2"
        />
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="font-semibold">Questions</h2>
          {fields.map((item) => getLabel(item))}
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
          onClick={(_) => {
            if (fieldValue === "") {
              console.log("Field value is empty");
              return;
            }
            const newField = getField();
            addField(props.id, newField, setFields);
            setFieldValue("");
          }}
        >
          Add Field
        </button>
      </div>
      <div className="flex flex-row gap-2 pt-2">
        <button
          onClick={() => {
            // saveFormData(formState);
            console.log("Saving form not implemented");
          }}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          Save Form
        </button>
        <Link href="/" className="bg-cyan-500 text-white p-2 rounded-md w-fit">
          <img src={closeIcon} alt="delete" className="w-8" />
        </Link>
        <button
          onClick={(_) =>
            setFields(
              fields.map((item) => {
                return {
                  ...item,
                  value: "",
                };
              }
              )
            )
          }
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          <img src={resetIcon} alt="delete" className="w-8" />
        </button>
      </div>
    </div>
  );
}
