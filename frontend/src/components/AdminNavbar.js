import React, {useState} from "react";
import logo from "../assets/images/logo-light.png"

function AdminNavbar() {
    return (
        <div>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-0 bg-darkColor mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <img className="h-[60px]" src={logo} />
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar