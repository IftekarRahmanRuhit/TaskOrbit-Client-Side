
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from '../Provider/AuthProvider';


const MainLayout = () => {
    const [theme, setTheme] = useState('dark');
    const { user, loading } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {

        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        if (!loading) {
            if (!user) {
                navigate('/login'); 
            } else {
                navigate('/'); 
            }
        }
    }, [user, loading, navigate]); 

 
    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="bg-base-100 dark:bg-gray-900 w-full">
                    <div className="text-center dark:text-[cyan] dark:bg-gray-900">
                        <span className="loading loading-bars loading-md"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`${theme} ${theme === 'dark' ? 'bg-gray-900' : null}`}>
                <div>
                    <Toaster
                        toastOptions={{
                            success: {
                                style: {
                                    background: "#008C8C",
                                    color: "white",
                                },
                            },
                            error: {
                                style: {
                                    color: "red",
                                },
                            },
                        }}
                    />
                    <Navbar />
                </div>
                <div className="">
                    <Outlet />
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

export default MainLayout;