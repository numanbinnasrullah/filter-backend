'use client'
import { useGetCollectionMutation } from "@/store/services/collectionService";
import GridItems from "../GridItems/GridItems";
// import FilterClient from "./filterClient";
import { useEffect } from "react";



const Filters =  ({ collection, slug, initialcheck, variantOptions}) => {
  const [getCollection, getCollectionRes] =  useGetCollectionMutation();
  console.log("Get Collection Try", getCollectionRes?.data?.res?.data?.collection)
  var collectionData = {
    slug: slug
  }
  useEffect(()=>{
    getCollection(collectionData)
  },[])
  return (
    <>
      <div class="filter-box hidden lg:block w-full max-w-[300px] pr-10">
       {/* <FilterClient collection={collection}  initialcheck={initialcheck} slug={slug} variantOptions={variantOptions} /> */}
      </div>
      <GridItems collection={collection}    />
      
    </>

  )
}

export default Filters;