import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";

// Import your images
import logo1 from '../assets/img/logo-1.png'
import logonew2 from '../assets/img/logo-new-2.png'
import logonew4 from '../assets/img/logo-new-4.png'
import logo4 from '../assets/img/logo-new-4.png'
import brandlogo5 from '../assets/img/brand-logo-5.png'

const BrandSlider = () => {
  // Array of logos
  const logos = [logo1, logonew2, logonew4, logo1, logo4, logo1, brandlogo5];

  useEffect(() => {
    if (document.querySelector(".brand-slide")) {
      new Swiper(".brand-slide", {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        speed: 1000,
        freeMode: true,
        autoplay: {
          delay: 2000,
        },
        breakpoints: {
          10: { slidesPerView: 2 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 6 },
        },
      });
    }
  }, []);

  return (
    <div className="container xl:pb-120 lg:pb-100 md:pb-80 pb-60 ">
      <div className=" brand-slide">
        <div className="swiper-wrapper">
          {logos.map((logo, index) => (
            <div className="swiper-slide" key={index}>
              <img src={logo} alt={`brand-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
