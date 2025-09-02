import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const ServicesSlider = ({ services }) => {
  const bgColor = ["#ffebee", "#e8f5e9", "#e3f2fd", "#fff3e0"]; // your bg colors

  // slice text function
  const sliceText = (text, length) => {
     const plainText = text.replace(/<[^>]+>/g, "");
    if (plainText.length > length) {
      return plainText.slice(0, length) + "...";
    } else {
      return plainText;
    }
  };

  return (
    <div className="services-slider-box relative">
      <Swiper
        modules={[Navigation, Autoplay, FreeMode]}
        slidesPerView={4}
        spaceBetween={0}
        loop={services?.data?.length > 4} // loop only if enough slides
        speed={1000}
        freeMode={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".services-swiper-button-next",
          prevEl: ".services-swiper-button-prev",
        }}
        breakpoints={{
          10: { slidesPerView: 1 },
          575: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {services.status &&
          services?.data.map((service, index) => {
            let color = bgColor[index % bgColor.length];
            return (
              <SwiperSlide key={index} className="group">
                <div className="services-box shadow-[0px_0px_15px_0px_rgba(0,0,0,0.07)] relative xxl:p-40 p-30 xxl:m-15 m-10 before:w-full before:h-0 before:bg-primary before:absolute before:bottom-0 before:left-0 group-hover:before:h-full before:duration-500">
                  <div
                    className={`w-90 h-90 rounded-full overflow-hidden flex items-center justify-center mb-25 relative`}
                    style={{ backgroundColor: color }}
                  >
                    <img
                      src={`https://api.medisco.in/${service.service_image}`}
                      alt=""
                      className="w-60 h-60 aspect-square object-contain"
                    />
                  </div>

                  <h4 className="xl:text-xl font-sora text-secondary font-medium leading-[1.2] text-wrap break-words">
                    <NavLink
                      to={`/servicedetails/${service.service_id}/${service.service_name}`}
                      className="xxl:text-2xl text-wrap break-words text-xl font-bold font-sora relative text-secondary group-hover:text-white duration-500"
                    >
                      {service.service_name}
                    </NavLink>
                  </h4>

                  <p className="pt-10 pb-20 relative text-base leading-32 text-[#6f6f6f] font-normal group-hover:text-white duration-500">
                    {sliceText(service.service_description, 30)}
                  </p>

                  <NavLink
                    to={`/servicedetails/${service.service_id}/${service.service_name}`}
                    className="service-read-more relative font-bold text-secondary font-sora group-hover:text-white duration-500"
                  >
                    Read More{" "}
                    <i className="fa-solid fa-arrow-right ml-12 relative"></i>
                  </NavLink>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* Navigation buttons */}
      <div className="swiper-button">
        <div className="services-swiper-button-next">
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div className="services-swiper-button-prev">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
      </div>
    </div>
  );
};

export default ServicesSlider;
