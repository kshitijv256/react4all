import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import QRCode from "react-qr-code";
import closeIcon from "../../assets/close.svg";
import { Link } from "raviger";

export default function ShareForm(props: { formID: number }) {
  const [copied, setCopied] = useState(false);
  const link: string = `https://${window.location.hostname}/preview/${props.formID}`;

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex item-center w-full justify-start">
        <Link href={`/form/${props.formID}`}>
          <img src={closeIcon} alt="close" className="h-10" />
        </Link>
      </div>
      <div className="flex item-center w-full justify-end">
        <CopyToClipboard text={link} onCopy={onCopy}>
          <button className="p-2 bg-cyan-500 rounded-md text-white hover:bg-cyan-400">
            Copy Link
          </button>
        </CopyToClipboard>
        {copied && (
          <span className="text-gray-200 bg-black/50 p-2 text-sm rounded fixed mt-12">
            Copied!
          </span>
        )}
      </div>
      <QRCode
        size={256}
        style={{ height: "300px", maxWidth: "100%", width: "100%" }}
        value={link}
        viewBox={`0 0 256 256`}
      />
      <p className="mt-6 text-lg">Scan QR code to preview</p>
    </div>
  );
}
