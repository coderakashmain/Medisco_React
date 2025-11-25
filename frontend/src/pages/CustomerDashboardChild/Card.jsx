import React, { lazy, Suspense, useState } from 'react'
import { useScreen } from '../../Context/ScreenProvider'
import CardLayout from '../../components/CardLayout';
import { useQrcode } from '../../Context/QrCodeProvider';
const PopUp = lazy(() => import('../../components/PopUp'))
import FallbackLoader from '../../components/FallbackLoader';
import { updateCardNo } from '../../APIs/updateCardNo';
import { useSnackbar } from '../../Context/SnackbarContext';
import { useCustomerData } from '../../Context/CustomerData';
const Card = () => {
    const { isMobile } = useScreen();
    const { qrCode, fetchQrcode } = useQrcode();
    const [activecard, setActiveCard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cardNo, setCardNo] = useState(null);
    const { setSnackbar } = useSnackbar();
    const { customerData } = useCustomerData();


    const handlechange = (e) => {
        let input = e.target.value.replace(/\D/g, "");

        if (input.length > 16) return;

        const formattedCardNumber = input
            .replace(/(.{4})/g, "$1 ")
            .trim();

        setCardNo(formattedCardNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cardNo) return;
        const cleanNumber = cardNo.replace(/\s/g, ""); 

        if (cleanNumber.length !== 16) {
            return setSnackbar({
                open: true,
                message: 'Enter valid sixteen digit number!',
                type: 'warning'
            });
        }
        setLoading(true);
        try {
            const res = await updateCardNo(customerData.token, cleanNumber);


            setSnackbar({
                open: true,
                message: "Card number updated successfully",
                type: "success"
            });
            fetchQrcode();
            setActiveCard(false);

        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message,
                type: "error"
            });
        }
    }
    return (
        <section style={{ minHeight: '500px' }} className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>
            <div className='flex justify-between items-center'>
                <h1 className='mb-20 text-xl font-semibold'>Card</h1>

                {!qrCode?.data?.card_no && (<button onClick={() => setActiveCard(true)} className='bg-primary active px-10 py-5 rounded text-white text-sm cursor-pointer'>
                    Activate Card
                </button>)}

            </div>

            <CardLayout />


            {activecard && (


                <Suspense fallback={<FallbackLoader fixed={true} />}>
                    <PopUp>

                        <div style={{ width: isMobile ? '97vw' : '30rem' }} className={`profile-edit-box  relative   bg-white shadow  rounded-[10px] max-h-[80vh]  `}>
                            <div className='h-full w-full p-20 pb-40 sm:p-10'>
                                <div className='flex justify-between items-center'>
                                    <h3 className='font-semibold text-primary'>Active your Card</h3>
                                    <button
                                        onClick={() => setActiveCard(false)}
                                        className='close-btn  '><i className="fa-solid fa-xmark"></i></button>

                                </div>
                                <div className='mt-50 '>

                                    <form onSubmit={handleSubmit} >
                                        <p className='text-gary text-xs select-none'>Enter a Card Number</p>
                                        <input
                                            type="text"
                                            value={cardNo}
                                            onChange={handlechange}
                                            maxLength={19}
                                            placeholder="xxxx xxxx xxxx xxxx"
                                            className="border border-lightgary px-10 py-5 outline-none w-full rounded"
                                        />

                                        <button type='submit' disabled={loading} style={{ opacity: loading ? '0.5' : '' }} className='rounded px-10 mt-20 mb-20  py-5 bg-primary text-white block float-right  text-sm font-semibold cursor-pointer'>{loading ? "Activating..." : 'Active'}</button>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </PopUp>
                </Suspense>


            )}
        </section>
    )
}

export default Card
