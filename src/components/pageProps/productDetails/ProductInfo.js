import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../../redux/orebiSlice";
import { HOST } from "../../../constants";
import { toast } from "react-toastify";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const { userDetail, token } = useSelector((state) => state.orebiReducer.userInfo);

  const handleClickAddToCart = useCallback(async () => {
    if (userDetail?.cart) {

      try {
        const response = await fetch(`${HOST}public/carts/${userDetail?.cart?.cartId}/products/${productInfo._id}/quantity/1`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });

        const result = await response.json();
        if (result.status === false) {
          toast.error(result.message)
        } else {
          dispatch(
            addToCart({
              productId: productInfo._id,
              productName: productInfo.productName,
              image: productInfo.img,
              description: productInfo.des,
              quantity: 1,
              price: productInfo.price,
            })
          )
          const response = await fetch(`${HOST}public/users/${userDetail?.email}/carts/${userDetail?.cart.cartId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          });
          const result = await response.json();
          await dispatch(updateCart(result?.products))
          toast.success("Added to card")
        }

      } catch (error) {
        toast.error(error)
      }
    }
    else {
      toast.error("You have to log in first!")
    }
  }, [dispatch, productInfo._id, productInfo.des, productInfo.img, productInfo.price, productInfo.productName, token, userDetail?.cart, userDetail?.email])
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p>
        <span className="text-[#767676] text-[14px] font- line-through mr-2">${productInfo.price}</span>
        <span className="text-[#767676] text-[14px] font-bold">${productInfo.specialPrice}</span></p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <button
        onClick={handleClickAddToCart}

        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
