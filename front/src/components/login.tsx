"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation"; // Importez useRouter de next/navigation

export default function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const router = useRouter(); // Utilisez useRouter pour obtenir l'objet router

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({ username, password }),
      });

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
  };

  return (
    <div className="card">  
      <form onSubmit={handleSubmit}>
        <h1 className="text-center mb-3 text-4xl font-bold">Login</h1>
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="email" className=""></label>
          <InputText
            id="email"
            placeholder="Email"
            className="mr-2 p-2"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <Message severity="error" text="Email is required" />}
        </div>
        <div className="flex flex-wrap align-items-center gap-2">
          <label htmlFor="password" className=""></label>
          <InputText
            id="password"
            placeholder="Mot de passe"
            className="mr-2 p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <Message severity="error" text="Mot de passe est requis" />
          )}
        </div>
        <div className="flex flex-col items-center">
          <Button type="submit" label="Login" className="mt-3 mb-3 bg-sky-300 px-5 py-2" />
          {apiError && <Message severity="error" text={apiError} />}
          {apiSuccess && <Message severity="success" text={apiSuccess} />}
        </div>
      </form>
    </div>
  );
}
