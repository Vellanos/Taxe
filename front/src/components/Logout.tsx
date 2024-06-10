import React from 'react';
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push("/");
    };

    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
            <button className='danger-button' onClick={handleLogout}>Déconnexion</button>
        </div>
    );
}
