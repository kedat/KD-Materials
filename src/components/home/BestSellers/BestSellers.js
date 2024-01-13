import React, { useCallback, useEffect, useState } from "react";
import Heading from "../Products/Heading";
import { HOST } from "../../../constants";
import { toast } from "react-toastify";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";
import Slider from "react-slick";
import { isEmpty, map } from "lodash";
import Product from "../Products/Product";
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
const BestSellers = () => {
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await fetch(`${HOST}categories/2/products?pageNumber=1`, {
        method: "GET",
      });
      const result = await response.json();
      setProducts(result.content);
    } catch (error) {
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <Slider {...settings}>
        {!isEmpty(products)
          ? map(products, (product) => {
            return (
              <>
                <div className="px-2">

                  <Product
                    _id={product.productId}
                    img={product.image}
                    productName={product.productName}
                    price={product.price}
                    color="Black"
                    des={product.description}
                    cat="Best"
                    discount={product.discount}
                    specialPrice={product.specialPrice}
                  />
                </div>
              </>
            );
          })
          : null}
      </Slider>
    </div>
  );
};

export default BestSellers;
