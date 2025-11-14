import React from 'react'
import { useScreen } from '../../Context/ScreenProvider'
import CardLayout from '../../components/CardLayout';
const Card = () => {
    const {isMobile} = useScreen();
    
    return (
        <section style={{minHeight : '500px'}} className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>
            <h1 className='mb-20 text-xl font-semibold'>Card</h1>
        <CardLayout/>
        </section>
    )
}

export default Card
