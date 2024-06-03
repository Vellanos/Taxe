"use client";

import UserInfoCard from "./UserInfoCard";

export default function UserInfoContainer() {
  return (
    <div className="card bg-slate-200 flex flex-col justify-center m-3 rounded-md p-2">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <UserInfoCard info="Email" value="davidbak38@gmail.com" />
        <UserInfoCard info="Prénom" value="David" />
        <UserInfoCard info="Nom" value="BAKALARZ" />
        <UserInfoCard info="Tel" value="0640058741" />
      </div>
      <div className="flex items-center justify-center text-center">    
        <UserInfoCard
          info="Adresse"
          value="453 Avenue de Vénaria, 38220 Vizille testazadzad ndza ndza dnza ndozand andza nd"
        />
      </div>
    </div>
  );
}
