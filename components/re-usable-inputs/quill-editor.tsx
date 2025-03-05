"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Quill } from "react-quill-new"; // Explicitly import Quill

const QuillNoSSRWrapper = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

// Ensure the "bullet" format is registered
const List = Quill.import("formats/list");
Quill.register(List, true);

interface QuillEditorProps {
  label: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({
  label,
  className = "sm:col-span-2",
  value,
  onChange,
}: QuillEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }], // Ensure bullet list is enabled
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];

  return (
    <div className={className}>
      <label
        htmlFor="content"
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
      </label>
      <QuillNoSSRWrapper
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
