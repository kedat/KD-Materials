import React, { useCallback } from "react";
import { CancelIcon, ViewIcon } from "../../assets/icon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HOST } from "../../constants";
import { toast } from "react-toastify";

const OrderItem = ({ order, getOrders }) => {
  const navigate = useNavigate();
  const { userDetail, token } = useSelector(
    (state) => state.orebiReducer.userInfo
  );
  const handleClickViewOrder = useCallback(() => {
    navigate(`/order/${order.orderId}`);
  }, [navigate, order.orderId]);
  const handleClickCancelOrder = useCallback(
    async (evt) => {
      try {
        const response = await fetch(
          `${HOST}public/users/${userDetail?.email}/orders/${evt.currentTarget.id}/orderStatus/cancel`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response) {
          await response.json();
          toast.success("Order Cancelled");
          await getOrders();
        }
      } catch (error) {
        toast.error(error);
      }
    },
    [getOrders, token, userDetail?.email]
  );

  return (
    <div className="w-full grid grid-cols-6 mb-4 border py-2">
      <span className="text-center">{order.orderId}</span>
      <p className="text-center">{order.orderDate}</p>
      <p className="text-center text-lg">{order.payment.paymentMethod}</p>
      <p className="text-center font-titleFont font-bold text-lg">
        {order.orderStatus}
      </p>
      <p className="text-center font-titleFont font-bold text-lg">
        {order.totalAmount}
      </p>
      <p className="text-center flex justify-center items-center gap-3">
        <button onClick={handleClickViewOrder} id={order.orderId}>
          <span title="View">
            <ViewIcon />
          </span>
        </button>
        <button
          onClick={handleClickCancelOrder}
          id={order.orderId}
          className={`${order.orderStatus === "Order Accepted !" ? "" : "-z-10 opacity-0"
            }`}
        >
          <span title="Cancel">
            <CancelIcon />
          </span>
        </button>
      </p>
    </div>
  );
};

export default OrderItem;
