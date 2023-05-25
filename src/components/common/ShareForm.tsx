import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function ShareForm(props: { formID: number }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex item-center w-full justify-end">
        <CopyToClipboard
          text={`localhost:3000/preview/${props.formID}`}
          onCopy={onCopy}
        >
          <button className="p-2 bg-green-500 rounded-md text-white hover:bg-green-400">
            Copy Link
          </button>
        </CopyToClipboard>
        {copied && (
          <span className="text-gray-200 bg-black/50 p-2 text-sm rounded fixed right-0">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}
