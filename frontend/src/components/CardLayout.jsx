import React from 'react'
import logo from '../assets/img/logo.png'

const CardLayout = () => {
  return (
    <div style={{borderRadius : '1rem'}} className='rounded bg-primary h-252 !w-400 flex flex-col shadow' >
        <div style={{height : '30%'}} className='flex justify-between items-center'>
            <img loading='lazy' src={logo} alt="logo" />
            <aside className='text-white pr-5 select-none'>
                <h5 className='text-end font-semibold '>Medisco.in</h5>
                <p className='text-end text-sm'>Privillage Card</p>
            </aside>
        </div>
        <div style={{ height : '40%'}} className='bg-white' ></div>
        <div style={{ height : '30%'}} className='flex flex-col justify-center align-center text-white select-none'>
             <h5 className='text-center font-semibold '>MEDISCO Health Solution, Bhubaneswar, Odisha</h5>
             <p className='text-center '>+913298328434 | support@medisco.in</p>
        </div>
      
    </div>
  )
}

export default CardLayout
