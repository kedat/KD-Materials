import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { HOST } from "../../constants";
import { updateCart } from "../../redux/orebiSlice";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

const SpecialCase = () => {

  const { userDetail, token } = useSelector((state) => state.orebiReducer.userInfo);
  const prod = useSelector((state) => state.orebiReducer.products);


  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const getCartItems = useCallback(async () => {
    if (userDetail?.cart) {

      try {
        const response = await fetch(`${HOST}public/users/${userDetail?.email}/carts/${userDetail?.cart.cartId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await response.json();
        setProducts(result?.products)
        await dispatch(updateCart(result?.products))
      } catch (error) {
        toast.error(error)
      }
    }

  }, [dispatch, token, userDetail?.cart, userDetail?.email])
  useEffect(() => {
    getCartItems();
  }, [getCartItems, userDetail]);

  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      <Link to="/signin">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Profile</p>
        </div>
      </Link>
      <Link to="/cart">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Buy Now</p>
          {!isEmpty(prod) && prod.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {prod.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
