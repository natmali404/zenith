'use client';
import { useState, useEffect } from "react";

interface Props {
  mode: "add" | "edit";
  onSubmit: (title: string, url: string) => void;
  onClose: () => void;
  initialValues?: { title: string; url: string };
}

export default function GameModal({ mode, onSubmit, onClose, initialValues }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if(initialValues) {
      setTitle(initialValues.title);
      setUrl(initialValues.url);
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors: { title?: string; url?: string } = {};

    if (!title.trim()) newErrors.title = "Title cannot be empty.";

    if (!url.trim()) newErrors.url = "URL cannot be empty.";
    else {
      try {
        const normalizedUrl = /^https?:\/\/.+\..+/.test(url) ? url : `http://${url}`;
        new URL(normalizedUrl);
      } catch {
        newErrors.url = "Please enter a valid link (e.g., https://supercoolgame.com).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(title.trim(), url.trim());
    setTitle("");
    setUrl("");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80 flex flex-col space-y-3">
        <h2 className="font-bold text-lg">
          {mode === "add" ? "Add a game" : "Edit game"}
        </h2>
        <div className="flex flex-col space-y-1">
        <input
          type="text"
          placeholder="Game title"
          value={title}
          maxLength={16}
          onChange={(e) => setTitle(e.target.value.slice(0, 16))}
          className="border px-2 py-1 rounded"
        />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
          <p className="text-xs text-gray-500 text-right">
            {title.length}/16
          </p>
        </div>
        <div className="flex flex-col space-y-1">
        <input
          type="text"
          placeholder="Game url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        {errors.url && (
            <p className="text-red-500 text-sm">{errors.url}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded bg-green-500 text-white"
          >
            {mode === "add" ? "Add" : "Save"}
          </button>
        </div>
      </div>
    </div>

    {showToast && (
      <div className="fixed z-[60] top-[calc(50%+160px)] left-1/2 -translate-x-1/2 bg-black text-white text-sm px-6 py-2 rounded-full shadow-lg animate-fade-in-out border border-white/20 backdrop-blur-sm">
        {mode === "add" ? "Game added!" : "Game updated!"}
      </div>
    )}
    </>
  );
}
