import React from "react";
import UserInfoCard from "./UserInfoCard";

interface UserInfo {
  email: string;
  firstname: string;
  lastname: string;
  tel: string;
  adresse: string;
}

interface UserInfoContainerProps {
  userInfo: UserInfo;
}

const UserInfoContainer: React.FC<UserInfoContainerProps> = ({ userInfo }) => {
  const { email, firstname, lastname, tel, adresse } = userInfo;

  return (
    <div className="card bg-slate-200 flex flex-col justify-center m-3 rounded-md p-2">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <UserInfoCard info="Email" value={email} />
        <UserInfoCard info="Prénom" value={firstname} />
        <UserInfoCard info="Nom" value={lastname} />
        <UserInfoCard info="Tel" value={tel} />
      </div>
      <div className="flex items-center justify-center text-center">
        <UserInfoCard info="Adresse" value={adresse} />
      </div>
    </div>
  );
};

export default UserInfoContainer;
