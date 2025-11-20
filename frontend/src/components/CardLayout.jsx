import React from 'react'
import logo from '../assets/img/logo.png'
import { useCustomerData } from '../Context/CustomerData'
import { useQrcode } from '../Context/QrCodeProvider'
import { useScreen } from '../Context/ScreenProvider'

const CardLayout = () => {
  const { qrCode } = useQrcode();
  const {isMobile,width} = useScreen();

  const formattedCardNumber = qrCode?.data?.card_no
  ?.replace(/\D/g, "")                   
  ?.replace(/(.{4})/g, "$1 ")            
  ?.trim();


  return (
    <div style={{ borderRadius: '1rem' , boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)" , width  : width <370 ? "100%" : isMobile ? '320px' : '400px', height : width < 370 ? "100%" :  isMobile ? '220px' : '252px'}} className='select-none rounded bg-primary  flex flex-col shadow' >
      <div style={{ height: '27%' }} className='flex justify-between items-center py-5'>
        <img  style={{width : isMobile ?  120 : ''}} loading='lazy' src={logo} alt="logo" />
        <aside className='text-white pr-5 select-none'>
          <h5 className='text-end font-semibold '>Medisco.in</h5>
          <p className='text-end text-xs'>Privillege Card</p>
        </aside>
      </div>
      <div style={{ height: '46%' , background : '#F4F4FF' }} className='bg-white flex px-10 py-10  justify-between  items-center'   >
        <div className='flex flex-col justify-between'>
          <pre className='text-md  sm:text-xl font-bold '>{formattedCardNumber}</pre>

          <div >

            <h5 className='font-semibold'>{qrCode?.data?.name}</h5>
            <p className='text-xs'>Vallid Till : {qrCode?.data?.validity ? qrCode?.data?.validity : "Oct 2026"}</p>

          </div>
        </div>
        <div  className='w-100 h-full bg-white  rounded oveflow-hidden rounded flex items-center justify-center'>

          <div className='qr-code' style={{ width: isMobile ? '90%' :  "100%", height: isMobile ? "90%":"100%" }}>
            <img
              src={qrCode?.data?.qrcode}
              alt="QR Code"
              className='w-full h-full object-cover'
             
            
            />
          </div>

        </div>
      </div>
      <div style={{ height: '27%' }} className='flex flex-col justify-center align-center text-white select-none py-4'>
        <h5 className='text-center  text-xs sm:text-sm font-semibold '>Mediscopluss Health Solution, Bhubaneswar, Odisha</h5>
        <p className='text-center text-xs '>+913298328434 | support@medisco.in</p>
      </div>

    </div>
  )
}

export default CardLayout
