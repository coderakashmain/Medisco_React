import React from 'react'
import PopUp from './PopUp'
import { useScreen } from '../Context/ScreenProvider'
import qrCode  from '../assets/img/upi-qr.jpg'

const PaymentShow = React.memo(({ setPaymentShowPage }) => {
    const {width} = useScreen();

    return (
        <PopUp>
            <section style={{width : width > 575 ? "400px" : '97vw'}} className='  bg-white rounded shadow  p-20 pb-40 sm:p-10 relative'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-semibold text-primary select-none'>Payment Options</h3>
                    <button
                        onClick={() => setPaymentShowPage(false)}
                        className='close-btn  '><i className="fa-solid fa-xmark"></i></button>

                </div>
                
                <div className='w-full mt-30'>
                    <img src={qrCode} alt=""  className='object-contain h-full w-full'/>
                </div>

            </section>
        </PopUp>
    )
})

export default PaymentShow
