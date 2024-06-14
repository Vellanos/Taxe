"use client";

import { useState, useRef, useEffect } from "react";
import { Messages } from 'primereact/messages';
import 'primeicons/primeicons.css';

export default function TaxeCode() {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const messages = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (errorMessage) {
      messages.current.clear();
      messages.current.show({ severity: 'error', summary: 'Erreur', detail: errorMessage });
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }, [errorMessage]);

  const validateInput = (value) => {
    const pattern = new RegExp(`^[A-Z]{2}${currentYear}_\\d{1,2}_\\d{1,2}$`);
    const match = value.match(pattern);

    if (!match) {
      return "Le format du numéro de règlement est incorrect.";
    }

    const [_, lettre1, lettre2, num1, num2] = value.match(new RegExp(`^([A-Z])([A-Z])${currentYear}_(\\d{1,2})_(\\d{1,2})$`));
    const chiffre1 = parseInt(num1);
    const chiffre2 = parseInt(num2);

    if (lettre1 >= lettre2) {
      return "La première lettre doit précéder la seconde dans l'alphabet.";
    }

    if (chiffre1 + chiffre2 !== 100) {
      return "La somme des deux chiffres séparés par un underscore doit être égale à 100.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateInput(inputValue);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage(null);
      try {
        const response = await fetch(`http://localhost:8000/api/contraventions?page=1&code=${inputValue}`);
        const data = await response.json();
        console.log(data['hydra:member'][0]);
      } catch (error) {
        console.error("Erreur lors de l'appel API:", error);
        setErrorMessage("Erreur lors de l'appel API. Veuillez réessayer plus tard.");
      }
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
          placeholder={`Enter value (e.g. AB${currentYear}_12_88)`}
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
