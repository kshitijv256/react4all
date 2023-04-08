import logo from "../logo.svg";

export default function Logo(props: { animation: string }) {
  return (
    <img
      src={logo}
      className="w-28"
      alt="logo"
      style={{ animation: props.animation }}
    />
  );
}
