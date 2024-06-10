"use client";

import { useState, useRef, useEffect } from "react";
import { Messages } from 'primereact/messages';
import 'primeicons/primeicons.css';

export default function TaxeCode() {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const messages = useRef(null);

  useEffect(() => {
    if (errorMessage) {
      messages.current.clear();
      messages.current.show({ severity: 'error', summary: 'Erreur', detail: errorMessage });
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }, [errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 12 || inputValue.length < 12) {
      setErrorMessage("La valeur doit être une chaîne de caractères de 12 caractères maximum.");
    } else {
      setErrorMessage(null);
      alert(`Input value: ${inputValue}`);
    }
  };

  return (
    <div className="card bg-slate-200 flex flex-col justify-center m-3 rounded-md p-2 h-64">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-full"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-48 mb-4"
          placeholder="Enter value"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Submit
        </button>
        {errorMessage && (
          <div className="mt-4 flex justify-center">
            <Messages ref={messages} className="inline-block"></Messages>
          </div>
        )}
      </form>
    </div>
  );
}
