export type MyForm = {
  id: number;
  title: string;
  fields: FormItem[];
};

export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
};

export type Answer = {
  form_field: number;
  value: string;
};

export type Submission = {
  answers: Answer[];
  form: Form;
  id?: number;
};

export type Error<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
  const errors: Error<Form> = {};
  if (form.title.length < 1) {
    errors.title = "Title is required";
  }
  if (form.title.length > 100) {
    errors.title = "Title should be less than 100 characters";
  }
  return errors;
};

export type textFieldTypes = "text" | "email" | "tel" | "date" | "number";

export type textField = {
  kind: "TEXT";
  id: number;
  label: string;
  type: textFieldTypes;
  value: string;
  placeholder: string;
};

export type DropDownField = {
  kind: "DROPDOWN";
  id: number;
  label: string;
  value: string;
  options: { selected: boolean; value: string }[];
  placeholder: string;
};

export type RadioField = {
  kind: "RADIO";
  id: number;
  label: string;
  value: string;
  options: string[];
  placeholder: string;
};

export type TextAreaField = {
  kind: "GENERIC";
  id: number;
  label: string;
  value: string;
  placeholder: string;
};

export type SliderField = {
  kind: "GENERIC";
  id: number;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
};

export type FormItem = textField | DropDownField | TextAreaField | RadioField;

// export const formItems: FormItem[] = [
//   {
//     kind: "TEXT",
//     id: 1,
//     label: "First Name",
//     type: "text",
//     value: "",
//     placeholder: "Enter your first name",
//   },
//   {
//     kind: "TEXT",
//     id: 2,
//     label: "Last Name",
//     type: "text",
//     value: "",
//     placeholder: "Enter your last name",
//   },
//   {
//     kind: "text",
//     id: 3,
//     label: "Email",
//     type: "email",
//     value: "",
//     placeholder: "Enter your email",
//   },
//   {
//     kind: "text",
//     id: 4,
//     label: "Phone Number",
//     type: "tel",
//     value: "",
//     placeholder: "Enter your phone number",
//   },
//   {
//     kind: "text",
//     id: 5,
//     label: "Date of Birth",
//     type: "date",
//     value: "",
//     placeholder: "Enter your date of birth",
//   },
//   {
//     kind: "dropdown",
//     id: 6,
//     label: "Gender",
//     value: "",
//     options: [
//       { selected: false, value: "Male" },
//       { selected: false, value: "Female" },
//       { selected: false, value: "Other" },
//     ],
//     placeholder: "Select Gender",
//   },
// ];

export const inputOptions = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "date", label: "Date" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "radio", label: "Radio" },
  { value: "dropdown", label: "Dropdown" },
];
