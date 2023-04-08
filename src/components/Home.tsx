import React from "react";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="p-4 mx-auto bg-white rounded-xl flex flex-col">
      <button
        onClick={props.openFormCB}
        className="p-2 bg-cyan-400 rounded-lg text-white"
      >
        Open Form
      </button>
    </div>
  );
}
