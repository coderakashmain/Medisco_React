import React from 'react'
import { useScreen } from '../../Context/ScreenProvider'
import CardLayout from '../../components/CardLayout';
import { useQrcode } from '../../Context/QrCodeProvider';
const Card = () => {
    const { isMobile } = useScreen();
    const { qrCode } = useQrcode();
    return (
        <section style={{ minHeight: '500px' }} className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>
            <div className='flex justify-between items-center'>
                <h1 className='mb-20 text-xl font-semibold'>Card</h1>

              { !qrCode?.data?.card_no && (  <button className='bg-primary active px-10 py-5 rounded text-white text-sm cursor-pointer'>
                    Activate Card
                </button>)}

            </div>

            <CardLayout />
        </section>
    )
}

export default Card
