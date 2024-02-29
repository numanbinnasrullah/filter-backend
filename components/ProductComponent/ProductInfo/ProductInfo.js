'use client'

import { useEffect, useState } from "react";
import ProductGallery from "../ProductGallery/ProductGallery";

const checkVariants = (title, variants) => {
    let sizes = [];
    let colors = [];
    let choices = [];

    // Check if title can be split by "/"
    const canSplit = title.includes('/');
    if (canSplit) {
        sizes = Array.from(
          new Set(variants.map((variant) => variant.node.title.split("/")[0]))
        );
        
        colors = Array.from(
            new Set(variants.map((variant) => variant.node.title.split("/")[1]))
          );
        choices = Array.from(
            new Set(variants.map((variant) => variant.node.title.split("/")[2]))
          );
        //   console.log("title split hony k bad colors", colors)
        //   console.log("title split hony k bad sizes", sizes)
        //   console.log("title split hony k bad choices", choices)
    } else {
        // console.log("title to aya hy lakin split able nahi hy ")
         sizes = Array.from(
            new Set(variants.map((variant) => variant.node.title))
          );
        //   console.log("Just Sizes", justSizes)
    }
    return { sizes, colors, choices };
  };

const ProductInfo = ({product}) => {
    
    const variants = product?.variants?.edges || [];
    let colors1 = [];
    let sizes1 = [];
    let choices1 = [];
    variants.forEach(variant => {
        const { title } = variant.node;
        const { sizes, colors, choices } = checkVariants(title, variants);
        sizes1 = [...new Set([...sizes1, ...sizes])];
        colors1 = [...new Set([...colors1, ...colors])];
        choices1 = [...new Set([...choices1, ...choices])];
    });
    console.log("Sizes:", sizes1);
    console.log("Colors:", colors1);
    console.log("Choices:", choices1);

    const [selectedColor, setSelectedColor] = useState(colors1[0]);
    const [selectedSize, setSelectedSize] = useState(sizes1[0]);
    const [selectedChoice, setSelectedChoice] = useState(choices1[0]);
    const [selectedPrice, setSelectedPrice] = useState('');

     // Function to handle color selection
     const handleColorChange = (event) => {
        const selectedColor = event.target.value;
        setSelectedColor(selectedColor);

        // Find sizes and choices for selected color
        const { sizes, choices } = getSizesAndChoicesForColor(selectedColor);
        
        // Update selected size and choice based on the first option of each list
        setSelectedSize(sizes[0] || '');
        setSelectedChoice(choices[0] || '');

        // Update selected price
        const price = getSelectedVariantPrice(selectedColor, sizes[0] || '', choices[0] || '');
        setSelectedPrice(price);
    };

       // Function to get sizes and choices for a specific color
       const getSizesAndChoicesForColor = (color) => {
        const filteredVariants = variants.filter(variant => variant.node.title.split("/")[1] === color);
        const sizes = [...new Set(filteredVariants.map(variant => variant.node.title.split(' / ')[0]))];
        const choices = [...new Set(filteredVariants.map(variant => variant.node.title.split(' / ')[2]))];
        return { sizes, choices };
    };

        // Function to get price of selected variant
        const getSelectedVariantPrice = (color, size, choice) => {
            const selectedVariant = variants.find(variant =>
                variant.node.title.split("/")[1] === color &&
                variant.node.title.split("/")[0] === size &&
                variant.node.title.split("/")[2] === choice
            );
            return selectedVariant ? selectedVariant.node.price.amount : '';
        };
     
    // Function to handle size selection
    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    // Function to handle choice selection
    const handleChoiceChange = (event) => {
        setSelectedChoice(event.target.value);

         // Update selected price
         const price = getSelectedVariantPrice(selectedColor, selectedSize, event.target.value);
         setSelectedPrice(price);
    };



    // const colors = Array.from(
    //     new Set(variants.map((variant) => variant.node.title.split("/")[1]))
    //   );
    //   const sizes = Array.from(
    //     new Set(variants.map((variant) => variant.node.title.split("/")[0]))
    //   );
     
      
    // // const [selectedColor, setSelectedColor] = useState(colors[0]);
    // // const [selectedSize, setSelectedSize] = useState(sizes[0]);
    // const [selectedPrice, setSelectedPrice] = useState(null);
    // const [availableSizes, setAvailableSizes] = useState([]);
    // const [selectedImage, setSelectedImage] = useState("")
    // const [variantImages, setVariantImages] = useState({});
    // console.log("selected Imageeeeeeeeeeeeeee", variantImages)
  
    // const handleColorChange = (event) => {
    //     const selectedColor = event.target.value;
    //     setSelectedColor(selectedColor);
    
    //     // Filter variants based on the selected color
    //     const variantsForColor = variants.filter(
    //       (variant) => variant.node.title.split("/")[1] === selectedColor
    //     );
    //     // console.log("variantsForColor", variantsForColor)
    
    //     // Extract available sizes for the selected color
    //     const availableSizes = variantsForColor.map((variant) =>
    //       variant.node.title.split("/")[0]
    //     );
    
    //     // Update selected size if it's not available for the selected color
    //     if (!availableSizes.includes(selectedSize)) {
    //       setSelectedSize(availableSizes[0]); // Set the first available size
    //     }
    
    //     // Update the available sizes state with the available sizes for the selected color
    //     setAvailableSizes(availableSizes);

    //     updatePrice(selectedColor, selectedSize);
    //   };

  
    // const updatePrice = (color, size) => {
    //     const selectedVariant = variants.find(
    //       (variant) => variant.node.title.includes(`${size} / ${color}`)
    //     );
    //     if(selectedVariant){
    //         setSelectedPrice(selectedVariant.node.price);
    //         // setSelectedImage(selectedVariant.node.image.url);

    //         const selectedImage = variants.find(
    //             (item) => item.node.image.id === selectedVariant?.node?.image?.id
    //         );
    //         setSelectedImage( selectedImage?.node?.image?.url );
    //         console.log("Selected Image", selectedImage?.node?.image?.url)
    //     }
    //     // setSelectedPrice(selectedVariant ? selectedVariant?.node?.price : null);

        
            
    //         const variantId = selectedVariant ? selectedVariant?.node?.id : null;
    //         console.log("Ye wala variant select hua hy ", variantId)
            
    //   };
    
    //   useEffect(() => {
    //     // Filter variants based on the default selected color
    //     const variantsForColor = variants.filter(
    //       (variant) => variant.node.title.split("/")[1] === selectedColor
    //     );
    
    //     // Extract available sizes for the default selected color
    //     const availableSizes = variantsForColor.map((variant) =>
    //       variant.node.title.split("/")[0].trim()
    //     );
    
    //     // Update the available sizes state with the available sizes for the default selected color
    //     setAvailableSizes(availableSizes);
    
    //     updatePrice(selectedColor, selectedSize); // Update price when component mounts or color/size changes
    //   }, [selectedColor, selectedSize]);


    //   useEffect(() => {
    //     // Initialize an empty object to store variant images for each color
    //     const imagesByColor = {};

    //     // Iterate through variants to collect images for each color
    //     variants.forEach((variant) => {
    //         const color = variant?.node?.title?.split("/")[1];
    //         const imageUrl = variant?.node?.image?.url;
    //         if (!imagesByColor[color]) {
    //             imagesByColor[color] = [];
    //         }
    //         // Add image URL to the array if it's not already present
    //         if (!imagesByColor[color].includes(imageUrl)) {
    //             imagesByColor[color].push(imageUrl);
    //         }
    //     });

    //     // Set the collected variant images
    //     setVariantImages(imagesByColor);
    // }, [variants]);


  return (
    <>
        <ProductGallery product={product} selectedColor={selectedColor}  />
    <div class="right block w-full px-[18px] md:px-10 lg:px-0">
    <div class="right-content block w-full lg:max-w-[600px]">
        <h1 class="text-2xl md:text-[32px] text-[#161619] mb-2">{product?.title}</h1>
        <div class="rating-box block w-full mb-8">
            <div class="rating-box-content block w-full">
                <div class="review block w-full mb-1">
                    <div class="review-content flex items-center">
                        <div class="star flex items-center mr-1">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#339999" viewBox="0 0 24 24" stroke-width="1.5" stroke="#339999" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#339999" viewBox="0 0 24 24" stroke-width="1.5" stroke="#339999" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#339999" viewBox="0 0 24 24" stroke-width="1.5" stroke="#339999" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#339999" viewBox="0 0 24 24" stroke-width="1.5" stroke="#339999" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#339999" viewBox="0 0 24 24" stroke-width="1.5" stroke="#339999" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            </span>
                        </div>
                        <span class="text-base text-[#575759]">1 review</span>
                    </div>
                </div>
                <div class="tr block w-full mb-3">
                    <div class="tr-content flex w-full items-baseline">
                        <span class="text-base text-[#575759] mr-1">Tog Rating:</span>
                        <span class="text-base text-[#575759]">15</span>
                    </div>
                </div>
                <div class="tr-box block w-full">
                    <div class="tr-box-content flex w-full flex-wrap gap-5">
                        <span class="block w-full max-w-[38px] py-2 text-xs text-center bg-[#e5e5e5] border-[2px] border-[#00000099] cursor-pointer">15</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="variant mb-14 flex ">
            <div class="variant-content flex-1">
                <label for="size" class=" w-full text-base text-[#575759] capitalize mb-3">Color:<span class="ml-1">{selectedColor}</span></label>
                <div class="variant-box block w-full">
                    <div class="variant-box-content flex w-full flex-wrap gap-5">
                    <select className="w-[50%] p-2  border-2" value={selectedColor} onChange={handleColorChange}>
                    {colors1.map((color, index)=>{
                            return <option key={color} value={color}  className=" cursor-pointer w-full  py-6 text-md text-center bg-[#e5e5e5] border-[2px] border-[#00000099] capitalize">{color}</option>
                        })}
                    </select>
                    </div>
                </div>
            </div> 



              <div class="variant-content flex-1">
                <label for="size" class=" w-full text-base text-[#575759] capitalize mb-3">Size:<span class="ml-1">{selectedSize}</span></label>
                <div class="variant-box block w-full">
                    <div class="variant-box-content flex w-full flex-wrap gap-5">
                    <select className="w-[50%] p-2  border-2" value={selectedSize} onChange={handleSizeChange}>
                        {getSizesAndChoicesForColor(selectedColor).sizes.map((size, index) => (
                            <option key={index} value={size} className=" cursor-pointer w-full  py-6 text-md text-center bg-[#e5e5e5] border-[2px] border-[#00000099] capitalize">{size}</option>
                        ))}
                    </select>
                    </div>
                </div>
            </div> 


            <div class="variant-content flex-1">
                <label for="size" class=" w-full text-base text-[#575759] capitalize mb-3">Choices:<span class="ml-1">{selectedChoice}</span></label>
                <div class="variant-box block w-full">
                    <div class="variant-box-content flex w-full flex-wrap gap-5">
                    <select className="w-[50%] p-2  border-2" value={selectedSize} onChange={handleChoiceChange}>
                        {getSizesAndChoicesForColor(selectedColor).choices.map((choice, index) => (
                            <option key={index} value={choice} className=" cursor-pointer w-full  py-6 text-md text-center bg-[#e5e5e5] border-[2px] border-[#00000099] capitalize">{choice}</option>
                        ))}
                    </select>
                    </div>
                </div>
            </div>

        </div>

        {/* <div class="variant mb-14">
            <div class="variant-content">
                <label for="size" class="block w-full text-base text-[#575759] capitalize mb-3">Size:<span class="ml-1">{selectedSize}</span></label>
                <div class="variant-box block w-full">
                    <div class="variant-box-content flex w-full flex-wrap gap-5">
                    <select className="w-[50%] p-2  border-2" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                    {availableSizes.map((size, index) => {
                    return (
                      <option
                        key={size}
                        value={size}
                        className="block cursor-pointer w-full text-md text-center bg-[#e5e5e5] border-[2px] border-[#00000099] capitalize"
                      >
                        {size}
                      </option>
                    );
                  })}
                    </select>
                    </div>
                </div>
            </div>                                
        </div> */}






       
     
       
      







        
        <div class="price-box block w-full mb-10">
            <div class="price-box-content flex w-full">
                <span class="text-3xl text-[#161619]">
                {/* {selectedPrice ? `£${selectedPrice.amount}` : 'Select Color and Size'} */}
                Price: {selectedPrice}
                </span>
            </div>
        </div>
        <div class="stocks block w-full mb-5">
            <div class="stocks-content flex items-center">
                <span class="text-[#161619] text-xs font-medium">49 in stock</span>
            </div>
        </div>
        <div class="ac block w-full mb-12">
            <div class="ac-content block w-full">
                
                <div class="counter block w-full mb-7">
                    <div class="counter-box block w-full max-w-[116px] border border-[#cdcfd0]">
                        <div class="counter-box-content flex w-full items-center justify-between">
                            <span class="block py-5 px-2 w-full max-w-fit cursor-pointer decrement">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                </svg>
                            </span>
                            <input type="number" value="1" class="block w-full max-w-[35px] text-center" />
                            <span class="block py-5 px-2 w-full max-w-fit cursor-pointer increment">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="btn-wrapper block w-full">
                    <a href="#" class="flex cursor-pointer justify-center items-center w-full capitalize bg-[#161619] text-white text-sm text-center h-[60px]">Add to basket</a>
                </div>

            </div>
        </div>
        <div class="menu block w-full">
            <div class="menu-content grid grid-cols-2">
                <div class="left block w-full">
                    <div class="left-content flex items-center w-full max-w-fit cursor-pointer">
                        <span class="block w-full max-w-fit mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[18px] h-[18px]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </span>
                        <span class="block w-full max-w-fit text-xs text-[#161619] ">Add to wishlist</span>
                    </div>
                </div>
                <div class="right block w-full">
                    <div class="right-content flex items-center w-full justify-end max-w-fit ml-auto cursor-pointer">
                        <span class="block w-full max-w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[18px] h-[18px]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>                                                  
                        </span>
                        <span class="block w-full max-w-fit  text-xs text-[#161619] ml-1">Share</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
      
  )
}

export default ProductInfo