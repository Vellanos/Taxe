'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import Login from "@/components/login";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("TEST" + token);
    

    if (token) {
      try {
        // Décodez le token pour vérifier sa validité
        const decodedToken:any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Vérifiez si le token n'a pas expiré
        if (decodedToken.exp > currentTime) {
          // Redirigez l'utilisateur vers /profile
          router.push("/profile");
        } else {
          // Le token a expiré, supprimez-le du local storage
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [router]);

  return (
    <div className="flex flex-row h-[100dvh] justify-center items-center bg-slate-100 ">
      <Login />
    </div>
  );
}
