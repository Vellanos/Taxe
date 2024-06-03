"use client";

import { ChangeEvent, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    numero_reglement: "",
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    email: "",
    carte_bancaire: "",
    cryptogramme: "",
    date_expiration: new Date()
  });

  const [nomError, setNomError] = useState("");
  const [prenomError, setPrenomError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [carteBancaireError, setCarteBancaireError] = useState("");
  const [cryptogrammeError, setCryptogrammeError] = useState("");
  const [dateExpirationError, setDateExpirationError] = useState("");

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, date_expiration: date });
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Vérification de la longueur du nom et affichage d'un message d'erreur si nécessaire
    if (name === "nom" && (value.length < 2 || value.length > 50)) {
      setNomError("Le nom doit contenir entre 2 et 50 caractères.");
    } else {
      setNomError("");
    }

    // Vérification de la longueur du prénom et affichage d'un message d'erreur si nécessaire
    if (name === "prenom" && (value.length < 2 || value.length > 50)) {
      setPrenomError("Le prénom doit contenir entre 2 et 50 caractères.");
    } else {
      setPrenomError("");
    }

    // Validation du numéro de téléphone avec une regex
    if (name === "telephone" && !/^\d{1,10}$/.test(value)) {
      setTelephoneError(
        "Le numéro de téléphone doit contenir au maximum 10 chiffres."
      );
    } else {
      setTelephoneError("");
    }

    // Validation de l'email avec une regex et une limite de caractères
    if (
      name === "email" &&
      (value.length > 180 || !/^\S+@\S+\.\S+$/.test(value))
    ) {
      setEmailError(
        "Veuillez saisir une adresse email valide (max 180 caractères)."
      );
    } else {
      setEmailError("");
    }

    // Validation du numéro de carte bancaire avec une regex et une limite de caractères
    if (
      name === "carte_bancaire" &&
      (value.length !== 16 || !/^\d{16}$/.test(value))
    ) {
      setCarteBancaireError(
        "Le numéro de carte bancaire doit contenir exactement 16 chiffres."
      );
    } else {
      setCarteBancaireError("");
    }

    // Validation du cryptogramme avec une regex et une limite de caractères
    if (
      name === "cryptogramme" &&
      (value.length !== 3 || !/^\d{3}$/.test(value))
    ) {
      setCryptogrammeError(
        "Le cryptogramme doit contenir exactement 3 chiffres."
      );
    } else {
      setCryptogrammeError("");
    }

    // Validation de la date d'expiration avec une regex
    if (name === "date_expiration" && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      setDateExpirationError(
        "Le format de la date d'expiration doit être MM/AA."
      );
    } else {
      setDateExpirationError("");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto px-4 lg:px-0">
      <h1 className="text-3xl font-bold mb-6">Formulaire de Règlement</h1>
      <form onSubmit={handleSubmit} className="mt-2 mb-2">
        <div className="mb-4">
          <label htmlFor="nom" className="block mb-1">
            Nom:
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
          />
          {nomError && <p className="text-red-500 text-xs mt-1">{nomError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="prenom" className="block mb-1">
            Prénom:
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
          />
          {prenomError && (
            <p className="text-red-500 text-xs mt-1">{prenomError}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="adresse" className="block mb-1">
            Adresse:
          </label>
          <textarea
            id="adresse"
            name="adresse"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            maxLength={255}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="telephone" className="block mb-1">
            N° de téléphone:
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
            pattern="\d{1,10}"
          />
          {telephoneError && (
            <p className="text-red-500 text-xs mt-1">{telephoneError}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
            maxLength={180}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="carte_bancaire" className="block mb-1">
            N° de carte bancaire:
          </label>
          <input
            type="text"
            id="carte_bancaire"
            name="carte_bancaire"
            className="w-full p-2 border rounded"
            pattern="\d{16}"
            onChange={handleChange}
            required
          />
          {carteBancaireError && (
            <p className="text-red-500 text-xs mt-1">{carteBancaireError}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="cryptogramme" className="block mb-1">
            Cryptogramme:
          </label>
          <input
            type="text"
            id="cryptogramme"
            name="cryptogramme"
            className="w-full p-2 border rounded"
            pattern="[0-9]{3}"
            onChange={handleChange}
            required
          />
          {cryptogrammeError && (
            <p className="text-red-500 text-xs mt-1">{cryptogrammeError}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col ">
          <label htmlFor="date_expiration" className="block mb-1">
            Date d’expiration:
          </label>
          <DatePicker
            id="date_expiration"
            name="date_expiration"
            className="w-full p-2 border rounded"
            dateFormat="MM/yy"
            selected={formData.date_expiration}
            minDate={new Date()}
            onChange={handleDateChange}
            showMonthYearPicker
            required
          />
          {dateExpirationError && (
            <p className="text-red-500 text-xs mt-1">{dateExpirationError}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
