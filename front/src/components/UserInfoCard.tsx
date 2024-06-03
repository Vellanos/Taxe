"use client";

import React from "react";
import { Card } from "primereact/card";

export default function UserInfoCard({info, value} : {info:string, value:string}) {
  return (
    <div className="bg-slate-300 m-2 min-w-[280px] max-[683px]:max-w-[280px] hover:bg-slate-400 hover:cursor-pointer p-2 rounded-md">
        <p>
          {info} : {value}
        </p>
    </div>
  );
}
