import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Scrollbar } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CategoriesSlider({
  categories,
  className,
  onClick,
  selectedCategory,
}) {
  return (
    <div className={`${className} relative`}>
      <div className="swiper-button image-swiper-button-next">
        <IoIosArrowForward color="#FFF" />
      </div>
      <div className="swiper-button image-swiper-button-prev">
        <IoIosArrowBack color="#FFF" />
      </div>
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        breakpoints={{
          769: {
            slidesPerView: 5,
            slidesPerGroup: 1,
          },
        }}
        scrollbar={true}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        modules={[Scrollbar, Navigation]}
        className="mySwiper"
        spaceBetween={12}
      >
        {categories.map((category) => {
          return (
            <SwiperSlide
              onClick={() => onClick(category)}
              key={category.id}
              className={`h-10 bg-[#1B3044] text-[#F3ECD7] hover:opacity-75 hover:cursor-pointer rounded-lg hover:font-bold w-[50px] flex items-center justify-center ${
                selectedCategory &&
                selectedCategory.id === category.id &&
                "font-bold"
              }`}
            >
              <p>{category.name}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CategoriesSlider;
