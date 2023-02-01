import React from "react";
import { AiFillFire, AiOutlineShoppingCart } from "react-icons/ai";
import Slider from "react-slick";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
  };
  return (
    <div className="py-[90px]">
      <div className="container">
        <Slider {...settings}>
          <div className="!flex items-center flex-wrap md:flex-col-reverse">
            <div className="col-lg-5 col-md-6 col-sm-12 md:pt-[50px]">
              <div className="flex items-center mb-4">
                <div className="relative w-[24px] h-[24px] rounded-full bg-[#ff497c] mr-3">
                  <AiFillFire className="w-4 h-4 text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                </div>
                <span className="capitalize text-xs font-medium text-[#ff497c]">
                  Hot Deal In This Week
                </span>
              </div>
              <h1 className="text-6xl font-medium leading-tight">
                Roco Wireless Headphone
              </h1>
              <button className="px-9 py-4 text-base font-medium text-black bg-white rounded-md flex items-center shadow-md mt-10">
                <AiOutlineShoppingCart />
                <span className="ml-2">Shop Now</span>
              </button>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <img src={banner1} alt="" />
            </div>
          </div>
          <div className="!flex items-center flex-wrap md:flex-col-reverse">
            <div className="col-lg-5 col-md-6 col-sm-12 md:pt-[50px]">
              <div className="flex items-center mb-4">
                <div className="relative w-[24px] h-[24px] rounded-full bg-[#ff497c] mr-3">
                  <AiFillFire className="w-4 h-4 text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                </div>
                <span className="capitalize text-xs font-medium text-[#ff497c]">
                  Hot Deal In This Week
                </span>
              </div>
              <h1 className="text-6xl font-medium leading-tight">
                Smart Digital Watch
              </h1>
              <button className="px-9 py-4 text-base font-medium text-black bg-white rounded-md flex items-center shadow-md mt-10">
                <AiOutlineShoppingCart />
                <span className="ml-2">Shop Now</span>
              </button>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <img src={banner2} alt="" />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
