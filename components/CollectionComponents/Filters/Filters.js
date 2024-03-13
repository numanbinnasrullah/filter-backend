"use client"

import { useEffect, useState } from "react";


const checkVariants = (title, sizesSet, colorsSet, choicesSet) => {

  const titleParts = title.split("/");
  const size = titleParts[0]?.trim();
  const color = titleParts[1]?.trim();
  const choice = titleParts[2]?.trim();
  if (size) {
    sizesSet.add(size);
  }
  if (color) {
    colorsSet.add(color);
  }
  if (choice) {
    choicesSet.add(choice);
  }

};

const Filters = ({ collection }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sizesOpen, setSizesOpen] = useState(true);
  const [colorsOpen, setColorsOpen] = useState(false);
  console.log("selected Sizes", selectedSizes)
  console.log("selected colors", selectedColors)
  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleColorsChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };


  const toggleSizes = () => {
    setSizesOpen(!sizesOpen);
    // Close the colors section if it was open
    // if (colorsOpen) {
    //   setColorsOpen(false);
    // }
  };

  const toggleColors = () => {
    setColorsOpen(!colorsOpen);
    // Close the sizes section if it was open
    // if (sizesOpen) {
    //   setSizesOpen(false);
    // }
  };



  let sizesSet = new Set();
  let colorsSet = new Set();
  let choicesSet = new Set();

  const filterVariants = (collection?.products?.edges || []).flatMap((item) =>
    (item.node.variants.edges || []).map((variant) => variant.node)
  );

  filterVariants.forEach((variant) => {
    checkVariants(variant?.title, sizesSet, colorsSet, choicesSet);
  });
  let sizes = [...sizesSet];
  let colors = [...colorsSet];
  let choices = [...choicesSet];

  // console.log("Sizes:", sizes);
  // console.log("Colors:", colors);
  // console.log("Choices:", choices);




  return (
    <div class="filter-box hidden lg:block w-full max-w-[300px] pr-10">
      <div class="filter-box-content block w-full h-full">

        <div class="variant-box block w-full py-5">
          <div class="variant-box-content block w-full">
            <div class="heading-box block w-full mb-[40px]">
              {/* <h2 class="text-xl text-[#161619] font-medium">Color</h2> */}
            </div>
            <div class="variants block w-full">


              <div className="max-w-lg mx-auto">

                <div className=" border-b border-gray-200">
                  <div className="py-4 border-b border-gray-200">
                    <button
                      className="flex justify-between items-center w-full text-lg font-medium focus:outline-none"
                      onClick={toggleSizes}
                    >
                      <span>Sizes</span>
                      <svg
                        className={`h-6 w-6 transition-transform  ${sizesOpen ? 'transform rotate-180' : ''
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.293 12.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-3.5-3.5a1 1 0 010-1.414l3.5-3.5a1 1 0 011.414 1.414l-4 4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {sizesOpen && (
                      <div className="mt-2">
                        {sizes.map((size, index) => (
                          <label key={index} className="block mb-2">
                            <input type="checkbox" 
                            className="form-checkbox text-blue-500 cursor-pointer"
                            checked={selectedSizes.includes(size)}
                            onChange={() => handleSizeChange(size)} />
                            <span className="ml-2 cursor-pointer">{size}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>



              <div className="max-w-lg mx-auto">

                <div className=" border-b border-gray-200">
                  <div className="py-4 border-b border-gray-200">
                    <button
                      className="flex justify-between items-center w-full text-lg font-medium focus:outline-none"
                      onClick={toggleColors}
                    >
                      <span>Colors</span>
                      <svg
                        className={`h-6 w-6 transition-transform  ${colorsOpen ? 'transform rotate-180' : ''
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.293 12.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-3.5-3.5a1 1 0 010-1.414l3.5-3.5a1 1 0 011.414 1.414l-4 4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {colorsOpen && (
                      <div className="mt-2">
                        {colors.map((color, index) => (
                          <label key={index} className="block mb-2">
                            <input type="checkbox" 
                            className="form-checkbox text-blue-500 cursor-pointer"
                            checked={selectedColors.includes(color)}
                            onChange={() => handleColorsChange(color)} /> 
                            <span className="ml-2 cursor-pointer">{color}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>








            </div>
          </div>
        </div>

        <div class="price py-5">
          <div class="price-content">
            <div class="heading-box block w-full mb-[18px]">
              <h2 class="text-xl text-[#161619] font-medium">PRICE</h2>
            </div>

            <div class="range block w-full">
              <div class="range-content block w-full">
                <div class="box block w-full">
                  <div class="box-content block w-full">

                    <div class="range block w-full h-[1px] bg-[#161619] relative after:absolute after:w-4 after:h-4 after:bg-[#161619] after:rounded-full after:top-1/2 after:-translate-y-1/2 after:cursor-w-resize  before:absolute before:w-4 before:h-4 before:bg-[#161619] before:rounded-full before:top-1/2 before:-translate-y-1/2 before:right-0 before:cursor-w-resize"></div>
                    <div class="price-box block w-full py-4">
                      <div class="price-box-content flex justify-center items-center">
                        <span class="block w-full max-w-fit text-xs text-[#666668] mr-[2px]">Price:</span>
                        <span class="block w-full max-w-fit text-xs text-[#666668]">£0</span>
                        <span class="block w-full max-w-fit text-xs text-[#666668] mx-1">-</span>
                        <span class="block w-full max-w-fit text-xs text-[#666668]">£10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="btns block w-full py-5">
          <div class="btns-wrapper-content grid gap-5">
            <a href="#" class="w-full h-[60px] cursor-pointer bg-[#161619] border border-[#161619] text-[#FFF] flex justify-center items-center">Filter</a>
            <a href="#" class="w-full h-[60px] cursor-pointer bg-[#FFF] border border-[#161619] text-[#161619] flex justify-center items-center">RESET FILTER</a>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Filters