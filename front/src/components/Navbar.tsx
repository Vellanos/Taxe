"use client"
import React from 'react';
import { Menubar } from 'primereact/menubar';
import Link from 'next/link';

export default function Navbar() {
    const itemRenderer = (item:any) => (
        <Link href={`/${item.link}${item.link.length > 0 ? '/1':''}`} className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
        </Link>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            link: '',
            template: itemRenderer
        },
        {
            label: 'Nos sélections',
            icon: 'pi pi-shopping-bag',
            items: [
                {
                    label: 'Les populaires',
                    icon: 'pi pi-star',
                    link: 'popular',
                    template: itemRenderer
                },
                {
                    label: 'Les mieux notés',
                    icon: 'pi pi-thumbs-up',
                    link: 'rated',
                    template: itemRenderer
                },
                {
                    label: 'Prochaines sorties',
                    icon: 'pi pi-calendar',
                    link: 'upcoming',
                    template: itemRenderer
                },
            ]
        },
    ];

    return (
        <div className="card">
            <Menubar model={items}/>
        </div>
    );
}