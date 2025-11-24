import React, { useEffect, useRef } from 'react'
import '../index.css'

const Preloader = () => {
    const prelderRef = useRef(null);



    return (
        <div className="preloader" ref={prelderRef}>
            <div id="loader"></div>
        </div>
    )
}

export default Preloader
