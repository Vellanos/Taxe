"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    adresse: "",
    tel: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [telError, setTelError] = useState("");

  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" && value.length < 5) {
      setPasswordError("Le mot de passe doit contenir plus de 5 caractères.");
    } else {
      setPasswordError("");
    }

    if (name === "lastname" && (value.length < 2 || value.length > 50)) {
      setLastNameError("Le nom doit contenir entre 2 et 50 caractères.");
    } else {
      setLastNameError("");
    }

    if (name === "firstname" && (value.length < 2 || value.length > 50)) {
      setFirstNameError("Le prénom doit contenir entre 2 et 50 caractères.");
    } else {
      setFirstNameError("");
    }

    if (name === "tel" && !/^\d{1,10}$/.test(value)) {
      setTelError(
        "Le numéro de téléphone doit contenir au maximum 10 chiffres."
      );
    } else {
      setTelError("");
    }

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setApiSuccess("Utilisateur créé avec succès !");
        setApiError("");
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/login_check",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/ld+json",
              },
              body: JSON.stringify({ username : formData.email, password: formData.password }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            setApiSuccess("Login successful!");
            setApiError("");
            localStorage.setItem("token", data.token);
            router.push("/profile");
          } else {
            setApiError(data.message || "An error occurred");
            setApiSuccess("");
          }
        } catch (error) {
          setApiError("An error occurred. Please try again.");
          setApiSuccess("");
        }
      } else if (response.status === 409) {
        setApiError("Adresse e-mail déjà enregistrée.");
      } else {
        setApiError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      setApiError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <h1 className="text-center mb-3 text-4xl font-bold">Registration</h1>

        <div className="flex flex-wrap justify-center align-items-center mb-3 gap-2">
          <InputText
            id="email"
            name="email"
            placeholder="Email"
            className="mr-2 p-2"
            onChange={handleChange}
            required
            maxLength={180}
          />
        </div>
        {emailError && (
          <p className="text-red-500 text-xs mt-1">{emailError}</p>
        )}

        <div className="flex flex-wrap justify-center align-items-center mb-3 gap-2">
          <InputText
            id="password"
            name="password"
            placeholder="Password"
            className="mr-2 p-2"
            type="password"
            onChange={handleChange}
            required
            minLength={5}
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}

        <div className="flex flex-wrap justify-center align-items-center mb-3 gap-2">
          <InputText
            id="lastname"
            name="lastname"
            placeholder="Lastname"
            className="mr-2 p-2"
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
          />
        </div>
        {lastNameError && (
          <p className="text-red-500 text-xs mt-1">{lastNameError}</p>
        )}

        <div className="flex flex-wrap justify-center align-items-center mb-3 gap-2">
          <InputText
            id="firstname"
            name="firstname"
            placeholder="Firstname"
            className="mr-2 p-2"
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
          />
        </div>
        {firstNameError && (
          <p className="text-red-500 text-xs mt-1">{firstNameError}</p>
        )}

        <div className="flex flex-wrap justify-center align-items-center mb-3 gap-2">
          <InputText
            id="tel"
            name="tel"
            placeholder="Tel"
            className="mr-2 p-2"
            onChange={handleChange}
            required
            pattern="\d{1,10}"
          />
        </div>
        {telError && <p className="text-red-500 text-xs mt-1">{telError}</p>}

        <div className="flex flex-wrap justify-center align-items-center mb-3 gap-2">
          <InputText
            id="adresse"
            name="adresse"
            placeholder="Adresse"
            className="mr-2 p-2"
            onChange={handleChange}
            maxLength={255}
            required
          />
        </div>

        <div className="flex flex-col items-center">
          <Button
            type="submit"
            label="Register"
            className="mt-3 mb-3 bg-sky-300 px-5 py-2 button-hover"
          />
          {apiError && <Message severity="error" text={apiError} />}
          {apiSuccess && <Message severity="success" text={apiSuccess} />}
        </div>
      </form>
    </div>
  );
}
