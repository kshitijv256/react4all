import { useEffect, useRef, useState } from "react";
import { Link } from "raviger";
import closeIcon from "../assets/logout.svg";
import editIcon from "../assets/edit.svg";
import { FormItem, inputOptions } from "../types/data";
import {
  createFormFields,
  deleteFormFields,
  getForm,
  getFormFields,
  updateForm,
  updateFormFields,
} from "../utils/apiUtils";
import DropdownLabel from "./DropdownLabel";
import RadioLabel from "./RadioLabel";
import InputLabel from "./InputLabel";
import { User } from "../types/User";

const getFields = async (
  id: number,
  setFieldsCB: (value: FormItem[]) => void
) => {
  try {
    const data = await getFormFields(id);
    setFieldsCB(data.results);
  } catch (err) {
    console.log(err);
  }
};

const getTitle = async (id: number, setTitleCB: (value: string) => void) => {
  try {
    const data = await getForm(id);
    setTitleCB(data.title);
  } catch (err) {
    console.log(err);
  }
};

const getPublic = async (id: number, setPublicCB: (value: boolean) => void) => {
  try {
    const data = await getForm(id);
    setPublicCB(data.is_public);
  } catch (err) {
    console.log(err);
  }
};

const updateTitle = async (id: number, title: string) => {
  try {
    let data = await getForm(id);
    data.title = title;
    await updateForm(data, id);
  } catch (err) {
    console.log(err);
  }
};

const updatePublic = async (id: number, isPublic: boolean) => {
  try {
    let data = await getForm(id);
    data.is_public = isPublic;
    await updateForm(data, id);
  } catch (err) {
    console.log(err);
  }
};

const addField = async (
  id: number,
  field: FormItem,
  setFieldsCB: (value: FormItem[]) => void
) => {
  try {
    await createFormFields(id, field);
    getFields(id, setFieldsCB);
  } catch (err) {
    console.log(err);
  }
};

const updateField = async (
  form_pk: number,
  field: FormItem,
  id: number,
  setFieldsCB: (value: FormItem[]) => void
) => {
  try {
    await updateFormFields(form_pk, field, id);
    getFields(form_pk, setFieldsCB);
  } catch (err) {
    console.log(err);
  }
};

const deleteField = async (
  form_pk: number,
  id: number,
  setFieldsCB: (value: FormItem[]) => void
) => {
  try {
    await deleteFormFields(form_pk, id).then(() => {
      getFields(form_pk, setFieldsCB);
    });
  } catch (err) {
    console.log(err);
  }
};

export default function FormUI(props: { id: number; currentUser: User }) {
  const [title, setTitle] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [type, setType] = useState("text");
  const [fields, setFields] = useState<FormItem[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (props.currentUser.username !== "") {
      getFields(props.id, setFields);
      getTitle(props.id, setTitle);
      getPublic(props.id, setIsPublic);
    }
  }, [props.id, props.currentUser]);

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
        type: "",
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
        type: "",
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
    deleteField(props.id, id, setFields);
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

  if (props.currentUser.username === "") {
    return (
      <div className="flex flex-col gap-4 p-2 divide-y divide-double divide-gray-300">
        <div className="flex-1">
          <h1 className="p-4 text-xl font-semibold text-red-600">
            Unauthorized for this action
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-2 divide-y divide-double divide-gray-300">
      <div className="flex-1">
        <label className="text-sm font-semibold">Title</label>
        <div className="flex p-1">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            ref={titleRef}
            className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full mr-2"
          />
          <button
            className="bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-md w-fit"
            onClick={(_) => updateTitle(props.id, title)}
          >
            {<img src={editIcon} alt="delete" className="w-8" />}
          </button>
        </div>

        <div className="py-1 flex gap-2">
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => {
              updatePublic(props.id, e.target.checked);
              setIsPublic(e.target.checked);
            }}
          />
          <label htmlFor="isPublic">Is Public?</label>
        </div>
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
          className="bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-md w-fit"
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
      <div className="flex flex-row gap-2 p-2">
        <Link
          href="/"
          className="bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-md w-fit"
        >
          <img src={closeIcon} alt="delete" className="w-8" />
        </Link>
        <Link
          href={`/share/${props.id}`}
          className=" p-3 text-center bg-cyan-500 rounded-md text-white hover:bg-cyan-400"
        >
          Share Form
        </Link>
      </div>
    </div>
  );
}
