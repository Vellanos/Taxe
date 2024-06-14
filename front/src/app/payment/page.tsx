"use client";

import PaymentForm from "@/components/PaymentForm";
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
      <PaymentForm />
    </>
  );
}
