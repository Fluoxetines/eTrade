import React from "react";
import { FaTags } from "react-icons/fa";
import phone from "../assets/phone.png";
import laptop from "../assets/laptop.png";
import computer from "../assets/computer.png";
import accessories from "../assets/accessories.png";
import monitor from "../assets/monitor.png";
import pcgaming from "../assets/pc-gaming.png";

const Category = () => {
  return (
    <section>
      <div className="section-title-wrapper">
        <div className="flex items-center">
          <span className="title-highlight highlight-secondary">
            <FaTags />
          </span>
          <span className="text-[#ff497c] text-[14px] font-bold ml-3">
            Categories
          </span>
        </div>
        <h2 className="title">Browse by Category</h2>
        <div className="row">
          <div className="col-md-2">
            <div className="relative pt-[28px] pb-3 px-3 mt-[30px] rounded-md border border-solid border-gray-[#f0f0f0] text-center transition-all duration-300 hover:scale-105">
              <a href="#!">
                <img src={phone} alt="img-category" className="mx-auto mb-4" />
                <h6 className="text-[16px] font-medium">Phones</h6>
              </a>
            </div>
          </div>
          <div className="col-md-2">
            <div className="relative pt-[28px] pb-3 px-3 mt-[30px] rounded-md border border-solid border-gray-[#f0f0f0] text-center transition-all duration-300 hover:scale-105">
              <a href="#!">
                <img
                  src={computer}
                  alt="img-category"
                  className="mx-auto mb-4"
                />
                <h6 className="text-[16px] font-medium">Computers</h6>
              </a>
            </div>
          </div>
          <div className="col-md-2">
            <div className="relative pt-[28px] pb-3 px-3 mt-[30px] rounded-md border border-solid border-gray-[#f0f0f0] text-center transition-all duration-300 hover:scale-105">
              <a href="#!">
                <img
                  src={accessories}
                  alt="img-category"
                  className="mx-auto mb-4"
                />
                <h6 className="text-[16px] font-medium">Accessories</h6>
              </a>
            </div>
          </div>
          <div className="col-md-2">
            <div className="relative pt-[28px] pb-3 px-3 mt-[30px] rounded-md border border-solid border-gray-[#f0f0f0] text-center transition-all duration-300 hover:scale-105">
              <a href="#!">
                <img src={laptop} alt="img-category" className="mx-auto mb-4" />
                <h6 className="text-[16px] font-medium">Laptops</h6>
              </a>
            </div>
          </div>
          <div className="col-md-2">
            <div className="relative pt-[28px] pb-3 px-3 mt-[30px] rounded-md border border-solid border-gray-[#f0f0f0] text-center transition-all duration-300 hover:scale-105">
              <a href="#!">
                <img
                  src={monitor}
                  alt="img-category"
                  className="mx-auto mb-4"
                />
                <h6 className="text-[16px] font-medium">Monitors</h6>
              </a>
            </div>
          </div>
          <div className="col-md-2">
            <div className="relative pt-[28px] pb-3 px-3 mt-[30px] rounded-md border border-solid border-gray-[#f0f0f0] text-center transition-all duration-300 hover:scale-105">
              <a href="#!">
                <img
                  src={pcgaming}
                  alt="img-category"
                  className="mx-auto mb-4"
                />
                <h6 className="text-[16px] font-medium">PC Gaming</h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
