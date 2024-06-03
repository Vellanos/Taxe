"use client";

import TaxeCode from "@/components/TaxeCode";
import UserInfoContainer from "@/components/UserInfoContainer";

export default function Profile() {
  return (
    <>
      <h2 className="m-4 text-2xl font-bold">Informations personnelles</h2>
      <UserInfoContainer />
      <h2 className="m-4 text-2xl font-bold">Payer une taxe</h2>
      <TaxeCode/>
    </>
  );
}
