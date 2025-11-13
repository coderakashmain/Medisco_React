import React from 'react'
import { useScreen } from '../../Context/ScreenProvider'
import CardLayout from '../../components/CardLayout';
const Card = () => {
    const {isMobile} = useScreen();
    
    return (
        <section className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>

        <CardLayout/>
        </section>
    )
}

export default Card
