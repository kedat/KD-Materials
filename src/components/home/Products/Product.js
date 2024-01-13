import React, { useCallback } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HOST } from "../../../constants";
import { addToCart, updateCart } from "../../../redux/orebiSlice";

const Product = (props) => {
  const { userDetail, token } = useSelector((state) => state.orebiReducer.userInfo);
  const _id = props._id;
  const dispatch = useDispatch()
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleClickAddToCart = useCallback(async () => {
    if (userDetail?.cart) {
      try {
        const response = await fetch(`${HOST}public/carts/${userDetail?.cart?.cartId}/products/${props._id}/quantity/1`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });

        const result = await response.json();
        if (result.status === false) {
          toast.error(result.message)
        } else {
          dispatch(
            addToCart({
              productId: productItem._id,
              productName: productItem.productName,
              image: productItem.img,
              description: productItem.des,
              quantity: 1,
              price: productItem.price,
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
      toast.error("You have to log in ")
    }
  }, [dispatch, productItem._id, productItem.des, productItem.img, productItem.price, productItem.productName, props._id, token, userDetail?.cart, userDetail?.email])
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-8">
          <Badge text={props.cat || "New"} />
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li
              onClick={handleClickAddToCart}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p>
            <span className="text-[#767676] text-[14px] font- line-through mr-2">${props.price}</span>
            <span className="text-[#767676] text-[14px] font-bold">${props.specialPrice}</span></p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
