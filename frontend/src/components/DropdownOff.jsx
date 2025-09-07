import React, { useEffect } from 'react'


const DropdownOff = ({children,dropdownRef,setDropdownOpen}) => {
    
    
      useEffect(() => {
        const handleEvent = (e) => {
          if (
            dropdownRef.current && !dropdownRef.current.contains(e.target)
          ) {
            setDropdownOpen(false)
          }
    
        }
    
        document.addEventListener('mousedown', handleEvent);
    
        return () => document.removeEventListener('mousedown', handleEvent);
    
      }, [])
  return (
    <>
      {children}
    </>
  )
}

export default DropdownOff
