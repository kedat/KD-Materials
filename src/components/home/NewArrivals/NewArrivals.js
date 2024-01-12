import { isEmpty, map } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { HOST } from "../../../constants";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};
const NewArrivals = () => {
  const [products, setProducts] = useState([])

  const getProducts = useCallback(async () => {
    try {
      const response = await fetch(`${HOST}products`, {
        method: "GET",
      });
      const result = await response.json();
      setProducts(result.content)

    } catch (error) {
      toast.error(error)
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {!isEmpty(products) ? map(products, (product) => {
          return (<> <div className="px-2">
            <Product
              _id={product.productId}
              img={product.image}
              productName={product.productName}
              price={product.price}
              color="Black"
              badge={true}
              des={product.description}
              discount={product.discount}
              specialPrice={product.specialPrice}
            />
          </div></>)
        }

        ) : null}
        
      </Slider>
    </div>
  );
};

export default NewArrivals;
