import React, { lazy, Suspense, useState } from 'react'
import { useScreen } from '../../Context/ScreenProvider'
import FallbackLoader from '../../components/FallbackLoader';
const PaymentShow = lazy(()=>import("../../components/PaymentShow"));
import pricingplanshap from '../../assets/img/pricing-plan-shap.png'
import pricingplanshap1 from '../../assets/img/pricing-plan-shap-1.png'
const Plans = () => {
    const { isMobile } = useScreen();
    const [paymentShowPage, setPaymentShowPage] = useState(false);
    return (
        <section className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>

            <div className="grid grid-cols-12 gap-25 ">
                <div className="lg:col-span-6 col-span-12" >
                    <div

                        className="bg-white p-30 relative z-[1] hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] duration-500"
                    >
                        <img
                  loading='lazy'
                  src={pricingplanshap}
                  className="absolute right-30 top-30"
                  alt="img"
                />
                        <h5 className="font-bold pb-5 text-secondary font-sora text-xl">
                            Basic Plan
                        </h5>
                        <h3 className="text-5.2xl font-bold pb-10 text-secondary font-sora">
                            699<span className="pl-6 text-base">/Year</span>
                        </h3>
                        <ul className='list-style border-t border-[#D8D8D8] pt-26 mt-21 pb-30 relative before:absolute before:w-1/2 before:bg-primary before:-top-px before:h-px '>
                            <li className='font-normal pb-10 pl-20  font-sora relative text-secondary max-xxl:text-sm'>Valid for 1 Member</li>
                            <li className='font-normal pb-10 pl-20  font-sora relative text-secondary max-xxl:text-sm'>Unlimited access to exclusive discounts
                            </li>
                            <li className='font-normal pb-10 pl-20  font-sora relative text-secondary max-xxl:text-sm'>Offers visible in Mediscopluss App / Website
                            </li>
                            <li className='font-normal pb-10 pl-20  font-sora relative text-secondary max-xxl:text-sm'>✔ Savings start from Day 1!
                            </li>
                        </ul>
                        <span>Discounts available on</span>

                        <ul

                            className="list-style border-t border-[#D8D8D8] pt-26 mt-21 pb-30 relative before:absolute before:w-1/2 before:bg-primary before:-top-px before:h-px"
                        >
                            <li
                                className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Doctor Consultation
                            </li>
                            <li
                                id='payment-button'
                                className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Hospitals & Nursing Homes

                            </li>
                            <li
                                className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Diagnostic Labs

                            </li>
                            <li
                                className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Medical Stores

                            </li>
                            <li

                                className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Ayurvedic & Wellness Centers

                            </li>
                            <li
                                className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Physiotherapy & Clinics

                            </li>

                        </ul>
                        <p onClick={() => setPaymentShowPage(true)} className="btn two"
                        ><span
                        >Pick This Plan<i
                            className="fa-solid fa-arrow-right"
                        ></i></span
                            ></p>
                    </div>
                </div>
                <div className="lg:col-span-6 col-span-12">
                    <div
                        className="pricing-plan two bg-primary p-30 relative z-[1] hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] duration-500"
                    >
                        <img
                  loading='lazy'
                  src={pricingplanshap1}
                  className="absolute right-30 top-30"
                  alt="img"
                />
                        <h5 className="font-bold pb-5 text-white font-sora text-xl">
                            Family Plan
                        </h5>
                        <h3 className="text-5.2xl font-bold pb-10 text-white font-sora">
                            2499<span className="pl-6 text-base">/Year</span>
                        </h3>
                        {/* <span className="text-white">Extended Savings</span> */}
                        <ul
                            className="list-style border-t border-[#D8D8D8] pt-26 mt-21 pb-30 relative"
                        >
                            <li
                                className="font-normal pb-10 font-sora pl-20 relative text-white max-xxl:text-sm"
                            >
                                Maximum 4 family members can be included
                            </li>
                            <li
                                className="font-normal pb-10 font-sora pl-20 relative text-white max-xxl:text-sm"
                            >
                                No age limit for any member
                            </li>
                            <li
                                className="font-normal pb-10 font-sora pl-20 relative text-white max-xxl:text-sm"
                            >
                                Card activation within 4 working days

                            </li>
                            <li
                                className="font-normal pb-10 font-sora pl-20 relative text-white max-xxl:text-sm"
                            >
                                Can be used unlimited times during the validity period
                            </li>

                        </ul>
                        <span className='!text-white'>Discounts available on</span>

                        <ul

                            className="list-style  border-t border-[#D8D8D8] pt-26 mt-21 pb-30 relative before:absolute before:w-1/2 before:bg-primary before:-top-px before:h-px"
                        >
                            <li
                                className="font-normal pb-21 font-sora pl-20 !text-white relative text-secondary max-xxl:text-sm"
                            >
                                Doctor Consultation
                            </li>
                            <li
                                id='payment-button'
                                className="font-normal pb-21 font-sora !text-white pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Hospitals & Nursing Homes

                            </li>
                            <li
                                className="font-normal pb-21 !text-white font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Diagnostic Labs

                            </li>
                            <li
                                className="font-normal pb-21 !text-white font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Medical Stores

                            </li>
                            <li

                                className="font-normal pb-21 !text-white font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Ayurvedic & Wellness Centers

                            </li>
                            <li
                                className="font-normal pb-21 !text-white font-sora pl-20 relative text-secondary max-xxl:text-sm"
                            >
                                Physiotherapy & Clinics

                            </li>

                        </ul>
                        <p onClick={() => setPaymentShowPage(true)} className="btn two"
                        ><span
                        >Pick This Plan<i
                            className="fa-solid fa-arrow-right"
                        ></i></span
                            ></p>
                    </div>
                </div>

            </div>

            {paymentShowPage && (<Suspense fallback={<FallbackLoader fixed={true} />}>
        <PaymentShow setPaymentShowPage={setPaymentShowPage} />
      </Suspense>)}
        </section>
    )
}

export default Plans
