import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FallbackLoader from '../components/FallbackLoader';
const NotFound = lazy(() => import("./NotFound"));
import { useServiceListContex } from '../Context/Services';
import sliceText from '../components/SliceTest';
import './ServiceDetails.css'
import MuiAvatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import TimeAgo from '../components/TimeAgo';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import { useScreen } from '../Context/ScreenProvider';
import defaultOrganizationlogo from '../assets/img/defaultOrganizationlogo.png'
import LocationCityIcon from '@mui/icons-material/LocationCity';

const ServiceDetails = () => {
  const location = useLocation();
  const { services } = useServiceListContex();
  const { isMobile } = useScreen();
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {

    if (location.state?.data) {
      setServiceDetails(location.state.data);
      sessionStorage.setItem(
        "servicedetails",
        JSON.stringify(location.state.data)
      );
    } else {

      const storedData = sessionStorage.getItem("servicedetails");
      if (storedData) {
        setServiceDetails(JSON.parse(storedData));
      }
    }
  }, [location.state]);

  if (!serviceDetails) {
    return (
      <Suspense fallback={<FallbackLoader fixed={true} />}>
        <NotFound />

      </Suspense>
    )
  }

  const findeServiceName = (serviceId) => {
    if (!services?.data) return;

    const matched = services.data.find(
      (value) => value.service_id === serviceId
    );

    return matched ? matched.service_name : undefined;
  };


  return (

    <section id='service-details' className={`min-h-[80vh] w-full ${isMobile ? 'bg-white' : 'bg-[#F4F4FF]'}  sm:pt-100 pt-80 sm:pt-40 lg:pt-80`}>
      <div className='container   '>

        <div className={`service-details-box h-full gap-20 ${isMobile ? "" : 'shadow p-10'} flex flex-row bg-white  rounded pb-30`}>
          <div className={`service-details-left-box  ${isMobile ? 'w-full' : 'w-252'} `}>
            <div className={`photoes-box h-252 ${isMobile ? 'w-full' : 'w-252'}   bg-[#F4F4FF] rounded overflow-hidden flex items-center justify-center`}>
              {serviceDetails?.images?.length > 0 ? (
                <Swiper
                  modules={[Navigation, Autoplay, FreeMode]}
                  slidesPerView={1}
                  spaceBetween={0}
                  loop={serviceDetails.images.length > 1}
                  speed={1000}
                  freeMode={true}
                  autoplay={
                    serviceDetails.images.length > 1
                      ? { delay: 2000, disableOnInteraction: false }
                      : false
                  }
                 
                  breakpoints={{
                    10: { slidesPerView: 1 },
                    575: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    992: { slidesPerView: 1 },
                    1200: { slidesPerView: 1 },
                  }}
                >
                  {serviceDetails.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        loading='lazy'
                        src={`https://api.medisco.in/${image}`}
                        alt={serviceDetails.hospital_name || "hospital image"}
                        className="h-full w-full rounded aspect-square object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="text-gray-500 text-sm select-none">No photos available</p>
              )}

            </div>


          </div>
          <div className='service-details-right-box flex-grow   '>
            <div className='flex  justify-between'>
              <div className='flex gap-10' >
                <div  className='h-80 w-80  bg-[#F4F4FF] overflow-hidden rounded'>
                  <img 
                    src={serviceDetails?.hospital_logo ? ` https://api.medisco.in/${serviceDetails?.hospital_logo}` : defaultOrganizationlogo}
                  
                  alt={serviceDetails.hospital_name} className='h-full w-full rounded aspect-square object-cover' />
                </div>
                <div>
                  <h2 className='md:text-xl text-sm  font-semibold color-secondary'>{serviceDetails.hospital_name}</h2>
                  <p className='text-sm max-md:text-xs  mt-5 text-primary'>{findeServiceName(serviceDetails.service_type)}</p>
                </div>


              </div>
              <div className='text-xs  mt-5 '>
                <div className={`flex gap-10 items-center ${isMobile ? 'flex-col' : 'flex-row'}`}>


                  <span className='select-none text-nowrap'>
                    <i className="fa-solid fa-star text-primary px-5" />
                    {serviceDetails?.rating || '0'} &nbsp;
                    <span>Rating</span>
                  </span>
                {serviceDetails?.availability && (  <span className='bg-[#F4F4FF] px-10 py-5 rounded-[20px] select-none  text-primary border border-primary font-semibold'>{serviceDetails?.availability}</span>)}
                </div>

                <div className='mt-20'>
                  <button  className='button cursor-pointer bg-primary  font-semibold block float-right text-sm  text-white px-20 py-5 rounded '>
                    Connect
                  </button>
                </div>



              </div>

            </div>

           {serviceDetails?.service_desc &&( <p className=' text-sm max-md:text-xs mt-20 break-words'> {serviceDetails?.service_desc} </p>)}


            <p className='mt-40  font-semibold text-sm max-md:text-xs'><LocationCityIcon className='text-primary'/> {serviceDetails.address} </p>

            <div className='flex md:gap-20  gap-10 mt-40  '>
              {serviceDetails?.state && (<div className='py-5 px-15 font-semibold bg-[#F4F4FF] rounded text-primary text-nowrap border text-xs'>
                State : {serviceDetails?.state}
              </div>)}
            {serviceDetails?.city && (  <div className='py-5 px-10 font-semibold  bg-[#F4F4FF] rounded text-primary text-nowrap border text-xs'>
                City : {serviceDetails?.city}
              </div>)}
              {serviceDetails?.pincode && (<div className='py-5 px-10 font-semibold bg-[#F4F4FF] rounded text-primary text-nowrap border text-xs'>
                Pincode : {serviceDetails?.pincode}
              </div>)}
            </div>

            {serviceDetails.services?.length > 0 && (<div className='servicedetails-discount-box mt-40 select-none '>
              <h3 className='font-semibold text-primary'>Discounts</h3>
              <ul className='flex justify-between mt-10 gap-10'>
                {serviceDetails.services.map((discount, index) => (
                  <li style={{height : isMobile ? '60px' : '70px'}} key={index} className={`rounded border  border-lightgary flex justify-between shadow `}>
                    <p className='p-5 px-20 font-semibold'>
                      {discount.discount_name}

                    </p>
                    <div className='w-80 text-white bg-primary h-full flex items-center justify-center'>
                      {discount.discount} %
                    </div>

                  </li>
                ))}

              </ul>
            </div>)}

            <p className='mt-40 font-semibold text-primary'>Contact</p>
            <div className=' flex gap-10  items-center mt-20'>
              <MuiAvatar sx={{ height: 35, width: 35, bgcolor: '#F4F4FF', color: 'var(--color-primary)' }}><MailIcon sx={{ height: 20, width: 20 }} /></MuiAvatar>
              <div>
                <p className='text-sm'>{serviceDetails?.email}</p>
                <p className='text-xs text-gary'><TimeAgo dateString={serviceDetails.created_datetime} /></p>
              </div>

            </div>



          </div>

        </div>

      </div>

    </section>

  )
}

export default ServiceDetails
