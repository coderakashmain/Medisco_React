import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Images
import quotes from '../assets/img/quotes.png'
import reviewimg1 from '../assets/img/review-img-1.png'
import reviewimg2 from '../assets/img/review-img-2.png'
import team3 from '../assets/img/team-3.png'

const ReviewSlider = () => {
    
// Reviews data array
const reviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "College Student",
    text: "Mediscopluss helped me save on my monthly medicines. The discount card works instantly at my local pharmacy—super convenient and affordable!",
    image: reviewimg1,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Small Business Owner",
    text: "I don’t have insurance, but with Mediscopluss, I still manage to save a lot on doctor visits and diagnostic tests. Highly recommended!",
    image: reviewimg2,
  },
  {
    id: 3,
    name: "Rupesh Mehta",
    role: "Working Professional",
    text: "My family uses the Premium Plan. We’ve saved thousands on treatments and even got discounts on dental and vision care.",
    image: team3,
  },
];

  return (
    <div className=" review-slider relative lg:before:absolute lg:before:w-px lg:before:h-full lg:before:bg-[#bfbfbf] lg:before:left-1/2">
      <Swiper
        modules={[Navigation, Autoplay, FreeMode]}
        slidesPerView={2}
        spaceBetween={160}
        loop={reviews.length > 2}
        speed={1000}
        freeMode={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          10: { slidesPerView: 1 },
          992: { slidesPerView: 2 },
        }}
        className="swiper-wrapper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="swiper-slide">
            <div className="relative">
              {/* Stars */}
              <ul className="flex text-sm gap-4 mb-10">
                {[...Array(5)].map((_, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-star text-yellow text-lg"></i>
                  </li>
                ))}
              </ul>

              {/* Review Text */}
              <p className="md:text-2xl sm:text-xl text-lg leading-34 font-medium pb-21 text-gary">
                {review.text}
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-x-15">
                <img src={review.image} alt={review.name} className="rounded-full" />
                <div>
                  <h5 className="text-base font-bold pb-4 text-secondary font-sora leading-[1.2]">
                    {review.name}
                  </h5>
                  <span>{review.role}</span>
                </div>
              </div>

              {/* Quote Icon */}
              <img
                src={quotes}
                alt="quotes"
                className="absolute right-[0%] bottom-[3%] bg-transparent mt-50"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="lg:absolute relative bg-[#F4F4FF] z-[1] size-78 rounded-full left-1/2 lg:top-1/2 [transform:translate(-50%,-50%)] max-lg:mt-48">
        <div className="swiper-button-next">
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className="swiper-button-prev">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;
