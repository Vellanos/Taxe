"use client";

import TaxeCode from "@/components/TaxeCode";
import UserInfoContainer from "@/components/UserInfoContainer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {

        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          router.push("/");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      router.push("/");
    }
  }, [router]);
  return (
    <>
      <h2 className="m-4 text-2xl font-bold">Informations personnelles</h2>
      <UserInfoContainer />
      <h2 className="m-4 text-2xl font-bold">Payer une taxe</h2>
      <TaxeCode/>
      <h2 className="m-4 text-2xl font-bold">Résumé de vos paiements</h2>
      <TaxeCode/>
    </>
  );
}
