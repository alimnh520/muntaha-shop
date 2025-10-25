'use client'
import React, { createContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import Header from './layout/Header';
import Footer from './layout/Footer';
export const UserContext = createContext();

const Provider = ({ children }) => {
    const path = usePathname();
    const hiddenPath = ['/login', '/dashboard']

    useEffect(() => {

    }, []);

    return (
        <div className="">
            <UserContext.Provider value={''}>
                {path !== '/login' && <Header />}
                <div className='sm:mt-16 mt-14'>{children}</div>
                {!hiddenPath.includes(path) && <Footer />}
            </UserContext.Provider>
        </div>
    )
}

export default Provider