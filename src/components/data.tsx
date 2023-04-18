export interface MyForm {
  id: number;
  title: string;
  fields: FormItem[];
}

export interface FormItem {
  id: number;
  label: string;
  type: string;
  value: any;
  placeholder: string;
}

export const formItems: FormItem[] = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    value: "",
    placeholder: "Enter your first name",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    value: "",
    placeholder: "Enter your last name",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    value: "",
    placeholder: "Enter your email",
  },
  {
    id: 4,
    label: "Phone Number",
    type: "tel",
    value: "",
    placeholder: "Enter your phone number",
  },
  {
    id: 5,
    label: "Date of Birth",
    type: "date",
    value: "",
    placeholder: "Enter your date of birth",
  },
];

export const inputOptions = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "date", label: "Date" },
  { value: "number", label: "Number" },
  { value: "password", label: "Password" },
];
