import React, { useCallback } from "react";
import { AcceptIcon, CancelIcon, DoneIcon, ProcessingIcon, ViewIcon } from "../../assets/icon";
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
    navigate(`/my-order/${order.orderId}`);
  }, [navigate, order.orderId]);
  const handleClickAction = useCallback(
    async (evt) => {
      const status = evt.currentTarget.getAttribute('data-action')
      console.log("🚀 ~ status:", status)
      try {
        const response = await fetch(
          `${HOST}public/users/${userDetail?.email}/orders/${evt.currentTarget.id}/orderStatus/${status}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response) {
          await response.json();
          switch (status) {
            case "accept":
              toast.success("Order accepted");
              break;
            case "process":
              toast.success("Order processing");
              break;
            case "done":
              toast.success("Order completed");
              break;
            case "cancel":
              toast.success("Order canceled");
              break;
            default:
              break;
          }
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
        ${order.totalAmount}
      </p>
      <p className="text-center flex justify-center items-center gap-3">
        <button onClick={handleClickViewOrder} id={order.orderId} >
          <span title="View">
            <ViewIcon />
          </span>
        </button>
        <button
          onClick={handleClickAction}
          id={order.orderId}
          data-action='accept'
        >
          <span title="Accept">
            <AcceptIcon />
          </span>
        </button>
        <button
          onClick={handleClickAction}
          id={order.orderId}
          data-action='process'
        >
          <span title="Process">
            <ProcessingIcon />
          </span>
        </button>
        <button
          onClick={handleClickAction}
          id={order.orderId}
          data-action='done'
        >
          <span title="Done">
            <DoneIcon />
          </span>
        </button>
        <button
          onClick={handleClickAction}
          id={order.orderId}

          data-action='cancel'
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
