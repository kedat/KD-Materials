import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { HOST } from "../../constants";
import OrderItemDetail from "./OrderItemDetail";


const OrderDetail = () => {
  const { userDetail, token } = useSelector((state) => state.orebiReducer.userInfo);
  const { pathname } = useLocation();
  const orderId = pathname.split('/')[2];

  const [orderDetail, setOrderDetail] = useState([])
  const getOrderDetail = useCallback(async () => {
    try {
      const response = await fetch(`${HOST}public/users/${userDetail?.email}/orders/${orderId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response) {
        const result = await response.json();
        setOrderDetail(result)
      }
    } catch (error) {
      toast.error(error)
    }
  }, [orderId, token, userDetail?.email])
  useEffect(() => {
    getOrderDetail();
  }, [getOrderDetail]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Order detail" />
      {!isEmpty(orderDetail?.orderItems) && orderDetail.orderItems.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {orderDetail?.orderItems.map((item) => (
              <div key={item.orderItemId}>
                <OrderItemDetail item={item.product} quantity={item.quantity} />
              </div>
            ))}
          </div>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${orderDetail.totalAmount}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">

                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${orderDetail.totalAmount}
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderDetail;
