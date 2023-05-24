import React from "react";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";

function Carousel({ carouselData }) {
  return (
    <div className="relative">
      <div className="swiper-button image-carousel-button-next bg-white/75 rounded-full p-2 hover:bg-white">
        <IoIosArrowForward />
      </div>
      <div className="swiper-button image-carousel-button-prev bg-white/75 rounded-full p-2 hover:bg-white">
        <IoIosArrowBack />
      </div>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "bg-white opacity-100",
        }}
        navigation={{
          nextEl: ".image-carousel-button-next",
          prevEl: ".image-carousel-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        className="h-[450px] rounded-lg"
      >
        {carouselData.map((data, index) => {
          return (
            <SwiperSlide key={data.id}>
              {({ isActive }) => (
                <div className="flex items-center h-full">
                  <img
                    src={`https://minpro-blog.purwadhikabootcamp.com/${data.imageURL}`}
                    className="object-cover absolute z-0 w-full h-[450px]"
                  />
                  <div className="px-16 w-[450px] z-[1]">
                    <div
                      className={`bg-[#F3ECD7]/70 rounded-lg p-2 transition-all duration-500 ease-in-out opacity-100 ${
                        !isActive && "opacity-0"
                      }`}
                    >
                      <p className="text-sm text-[#1B3044]">
                        {data.User.username} •{" "}
                        {moment(data.createdAt).format("MMMM D, YYYY")}
                      </p>
                      <p className="text-[18px] font-bold text-[#1B3044]">
                        {data.title}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Carousel;
