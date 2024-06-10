"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Login from "@/components/login";
import { Button } from "primereact/button";
import Register from "@/components/Register";

export default function Home() {
  const router = useRouter();
  const [displayForm, setDisplayForm] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          router.push("/profile");
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [router]);

  const handleToggle = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <div className="flex flex-col h-[100dvh] justify-center items-center bg-slate-100 ">
      {displayForm && <Login />}
      {!displayForm && <Register />}
      <Button
        onClick={handleToggle}
        className="button-hover"
        label={displayForm ? "Pas encore inscrit ?" : "Déjà inscrit ?"}
      />
    </div>
  );
}
