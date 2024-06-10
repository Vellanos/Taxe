"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import TaxeCode from "@/components/TaxeCode";
import UserInfoContainer from "@/components/UserInfoContainer";
import Logout from "@/components/Logout";

interface UserInfo {
  email: string;
  firstname: string;
  lastname: string;
  tel: string;
  adresse: string;
}

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userEmail: string = decodedToken.username;
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          router.push("/");
          localStorage.removeItem("token");
        } else {
          fetch(`http://localhost:8000/api/users?page=1&email=${userEmail}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Network response was not ok.");
            })
            .then((data) => {
              console.log(data['hydra:member'][0]);
              
              setUserData(data['hydra:member'][0]);
            })
            .catch((error) => {
              console.error("Error fetching user info:", error);
            });
        }
      } catch (error) {
        console.error("Invalid token", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const userInfo: UserInfo = {
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname,
    tel: userData.tel,
    adresse: userData.adresse,
  };

  return (
    <>
      <h2 className="m-4 text-2xl font-bold">Informations personnelles</h2>
      <UserInfoContainer userInfo={userInfo} />
      <h2 className="m-4 text-2xl font-bold">Payer une taxe</h2>
      <TaxeCode />
      <h2 className="m-4 text-2xl font-bold">Résumé de vos paiements</h2>
      <TaxeCode />
      <div className="flex justify-center mb-2">
        <Logout />
      </div>
    </>
  );
}
