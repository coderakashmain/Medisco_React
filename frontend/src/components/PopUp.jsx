import React from 'react'

const PopUp = ({ children }) => {
    return (
        <>
            <div className=" profile-edit-popup  fixed top-0 left-0 inset-0 bg-[#646464ad]  w-screen h-screen z-1002 ">
                <div className="container flex items-center justify-center relative h-full   ">
                    {children}
                </div>
            </div>
        </>
    )
}

export default PopUp
