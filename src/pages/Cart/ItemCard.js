import React, { useCallback } from "react";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HOST } from "../../constants";

const ItemCard = ({ item, getCartItems }) => {
  const { userDetail, token } = useSelector((state) => state.orebiReducer.userInfo);
  const handleDecreaseQuantity = useCallback(async () => {
    try {
      const response = await fetch(`${HOST}public/carts/${userDetail.cart.cartId}/products/${item.productId}/quantity/${item.quantity - 1}`, {
        mode: 'cors',
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });

      const result = await response.json();
      if (result) {
        await getCartItems()
        // toast.success('Quantity updated')
      } else {
        toast.error('Can not update quantity')
      }
    } catch (error) {
      toast.error(error)
    }
  }, [getCartItems, item.productId, item.quantity, token, userDetail.cart.cartId])

  const handleIncreaseQuantity = useCallback(async () => {
    try {
      const response = await fetch(`${HOST}public/carts/${userDetail.cart.cartId}/products/${item.productId}/quantity/${item.quantity + 1}`, {
        mode: 'cors',
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (result) {
        await getCartItems()
        // toast.success('Quantity updated')
      } else {
        toast.error('Can not update quantity')
      }

    } catch (error) {
      toast.error(error)
    }
  }, [getCartItems, item.productId, item.quantity, token, userDetail.cart.cartId])

  const deleteCartItems = useCallback(async () => {
    try {
      const response = await fetch(`${HOST}public/carts/${userDetail.cart.cartId}/product/${item.productId}`, {
        mode: 'cors',
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json()
      if (result) {
        await getCartItems();
        toast.success(result)
      }

      // setProducts(result?.products)
      // await dispatch(updateCart(result?.products))
    } catch (error) {
      toast.error(error)
    }
  }, [getCartItems, item.productId, token, userDetail.cart.cartId])
  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={deleteCartItems}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.image} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <button
            onClick={handleDecreaseQuantity}
            className={`w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300 ${item.quantity === 0 ? 'hover:cursor-not-allowed' : ''}`}
            disabled={item.quantity === 0}
          >
            -
          </button>
          <p>{item.quantity}</p>
          <button
            onClick={handleIncreaseQuantity}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </button>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>${item.quantity * item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
