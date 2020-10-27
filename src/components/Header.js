import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleNavbar = () => {
        setIsOpen(!isOpen)
    }
var status=sessionStorage.getItem("isLoggedIn");
    useEffect(() => {
        if (sessionStorage.getItem("isLoggedIn") === "true") {
        setIsLoggedIn(true)
        }
    }, [status])
    return (
        <>
            <header className=" bg-pink-900 sm:flex items-center justify-between sm:px-4 sm:py-2">
                <div className="flex items-center justify-between px-6 py-3 sm:py-0">
                    <div>
                        <Link to="/posts" className="logo">
                            <h1> Blogosphere</h1>
                        </Link>
                    </div>
                    <div className="sm:hidden">
                        {(isOpen) ? (
                            <button onClick={handleNavbar} className="text-gray-400 hover:text-white focus:text-white focus:outline-none mx-4" type="button">

                                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />

                                </svg>
                            </button>
                        ) : (
                                <button onClick={handleNavbar} className="text-gray-400 hover:text-white focus:text-white focus:outline-none mx-4" type="button">
                                    <svg className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z" />
                                    </svg>
                                </button>
                            )
                        }
                    </div>
                </div>


                {(isOpen) ? (
                    <div className="px-4 pt-1 pb-4">
                        <Link to="/posts" className="px-2 py-1 block text-white font-semibold rounded hover:bg-pink-800" >Posts</Link>
                        <Link to="/new" className="px-2 mt-1 py-1 block text-white font-semibold rounded hover:bg-pink-800" >New Post</Link>
                        {(isLoggedIn) ? (<Link to="/logout" className="px-2 py-1 block text-white font-semibold rounded hover:bg-pink-800" onClick={() => {
                                window.sessionStorage.removeItem("isLoggedIn");
                                window.sessionStorage.removeItem("username");
                                window.location = "/posts";
                            }}>Logout</Link>) : (
                                    <>
                                        <Link to="/login" className="px-2 py-1 block text-white font-semibold rounded hover:bg-pink-800">Login</Link>
                                        <Link to="/register" className="px-2 py-1 block text-white font-semibold rounded hover:bg-pink-800" >Register</Link>
                                    </>
                                )}
                    </div>
                ) : (
                        <div className="hidden sm:flex">
                            <Link to="/posts" className="px-2 py-1 block text-white font-semibold rounded hover:bg-pink-800 sm:ml-2" >Posts</Link>
                            <Link to="/new" className="px-2  py-1 block text-white font-semibold rounded hover:bg-pink-800 sm:ml-2" >New Post</Link>
                            {(isLoggedIn) ? (<Link to="/logout" className="px-2 py-1 block text-white font-semibold rounded hover:bg-pink-800 sm:ml-2" onClick={() => {
                                window.sessionStorage.removeItem("isLoggedIn");
                                window.sessionStorage.removeItem("username");
                                window.location = "/posts";
                            }}>Logout</Link>) : (
                                    <>
                                        <Link to="/login" className="px-2 py-1 block text-white font-semibold rounded hover:bg-pink-800 sm:ml-2">Login</Link>
                                        <Link to="/register" className="px-2 py-1 block text-white font-semibold rounded hover:bg-pink-800 sm:ml-2" >Register</Link>
                                    </>
                                )}
                        </div>
                    )
                }



            </header>
        </>
    )
}

export default Header;
