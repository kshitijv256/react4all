import React, { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import { MyForm, formItems } from "./data";

const saveFormData = (data: any) => {
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

export default function Form(props: { closeFormCB: () => void; id: number }) {
  const [formState, setFormState] = useState(() => getFormData());
  const [fieldValue, setFieldValue] = useState("");
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

  const addField = () => {
    setFormState(
      formState.map((item) => {
        if (item.id === props.id) {
          return {
            ...item,
            fields: [
              ...item.fields,
              {
                id: Number(new Date()),
                label: fieldValue,
                type: "text",
                value: "",
                placeholder: "",
              },
            ],
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
  const changedCB = (value: any, id: number) => {
    setFormState(
      formState.map((form) => {
        if (form.id === props.id) {
          return {
            ...form,
            fields: formState
              .filter((item1) => item1.id === props.id)[0]
              .fields.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    value: value,
                  };
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

  return (
    <div className="flex flex-col gap-4 p-2 divide-y divide-double divide-gray-300">
      <div className="flex-1">
        <label className="text-sm font-semibold py-2">Title</label>
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
          className="border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none w-full"
        />
        {formState
          .filter((item) => item.id === props.id)[0]
          .fields.map((item) => (
            <InputField
              removeField={removeField}
              changedCB={changedCB}
              item={item}
              key={item.id}
              id={item.id}
            />
          ))}
      </div>
      <div className="flex gap-2 pt-4">
        <input
          type="text"
          onChange={(e) => {
            setFieldValue(e.target.value);
          }}
          value={fieldValue}
          className="flex-1 border-2 rounded-lg border-gray-300 p-2 focus:border-cyan-500 focus:outline-none"
        />
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
        <button
          onClick={props.closeFormCB}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          Close Form
        </button>
        <button
          onClick={resetForm}
          className="bg-cyan-500 text-white p-2 rounded-md w-fit"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
}
