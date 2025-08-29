import React, { useEffect, useRef } from 'react'
import '../index.css'

const Preloader = () => {
    const prelderRef = useRef(null);

//     useEffect(() => {
//     const timer = setTimeout(() => {
//       if (prelderRef.current) {
//         prelderRef.current.style.transform = 'translateY(100%)';
//         prelderRef.current.style.transition = 'transform 0.8s ease-in-out'; 
//       }
//     }, 3000);

//     return () => clearTimeout(timer); 
//   }, []);

    return (
        <div className="preloader" ref={prelderRef}>
            <div id="loader"></div>
        </div>
    )
}

export default Preloader
