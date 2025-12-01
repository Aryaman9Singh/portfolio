import React, { useState, useEffect } from "react";
import "./chatbot.css";

const Chat = () => {
  // State variables
  const [value, setValue] = useState(""); // text area input
  const [submitting, setSubmitting] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [dataArray, setDataArray] = useState([]); // store summary history

  // Submit handler: sends text to backend for summary
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return; // prevent empty submissions

    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/summarize-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });

      const data = await res.json();

      if (!data?.summary) {
        console.error("No summary returned from backend:", data);
        setSubmitting(false);
        return;
      }

      const text = data.summary;

      // Save to localStorage
      const updatedArray = [...dataArray, text];
      localStorage.setItem("summary", JSON.stringify(updatedArray));
      setDataArray(updatedArray.reverse()); // show latest first
      setValue(""); // clear textarea
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  // Load summaries from localStorage
  const fetchLocalStorage = () => {
    const result = localStorage.getItem("summary");
    if (result) {
      const parsed = JSON.parse(result);
      setDataArray(parsed?.slice().reverse() || []);
    }
  };

  // Copy text to clipboard
  const copyTextToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }
  };

  const handleCopy = (txt) => {
    copyTextToClipboard(txt)
      .then(() => {
        setIsCopy(true);
        setTimeout(() => setIsCopy(false), 1500);
      })
      .catch((err) => console.log(err));
  };

  // Delete summary
  const handleDelete = (txt) => {
    const filtered = dataArray.filter((d) => d !== txt);
    setDataArray(filtered);
    localStorage.setItem("summary", JSON.stringify(filtered.reverse()));
  };

  // Fetch localStorage once on mount
  useEffect(() => {
    fetchLocalStorage();
  }, []);

  return (
    <div className="w-full bg-[#0f172a] h-full min-h-[100vh] py-4 px-4 md:px-20">
      <div className="w-full">
        <div className="flex flex-row justify-between items-center w-full h-10 px-5 2xl:px-40">
          <h3 className="cursor-pointer text-3xl font-bold text-cyan-600">
            Summary!
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center mt-4 p-4">
          <h1 className="text-3xl text-white text-center leading-10 font-semibold">
            Summarizer with
            <br />
            <span className="text-5xl font-bold text-cyan-500">OpenAI GPT</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 sm:text-xl text-center max-w-2xl">
            Simply paste your document or text and get a quick summary using OpenAI GPT.
          </p>
        </div>

        <div className="flex flex-col w-full items-center justify-center mt-5">
          <textarea
            placeholder="Paste doc content here ..."
            rows={6}
            className="block w-full md:w-[650px] rounded-md border border-slate-700
            bg-slate-800 p-2 text-sm shadow-lg font-medium text-white focus:border-gray-500
            focus:outline-none focus:ring-0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>

          {value?.length > 0 && (
            submitting ? (
              <p className="text-md text-cyan-500 mt-5">Please wait ....</p>
            ) : (
              <button
                className="mt-5 bg-blue-500 px-5 py-2 text-white text-md font-medium cursor-pointer rounded-md"
                onClick={handlesubmit}
              >
                Submit
              </button>
            )
          )}
        </div>
      </div>

      <div className="w-full mt-10 flex flex-col gap-5 shadow-md items-center justify-center">
        {dataArray?.length > 0 && (
          <>
            <p className="text-white font-semibold text-lg">Summary History</p>
            {dataArray.map((d, index) => (
              <div key={index} className="max-w-2xl bg-slate-800 p-3 rounded-md">
                <p className="text-gray-400 text-lg">{d}</p>
                <div className="flex gap-5 items-center justify-end mt-2">
                  <p
                    className="text-gray-500 font-semibold cursor-pointer"
                    onClick={() => handleCopy(d)}
                  >
                    {isCopy ? "Copied" : "Copy"}
                  </p>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDelete(d)}
                  >
                    <h5>Delete</h5>
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
