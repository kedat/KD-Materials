import { motion } from "framer-motion";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HOST } from "../../../constants";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import OrderItem from "../../MyOrders/OrderItem";
import { emptyCart } from "../../../assets/images";


const AdminOrder = () => {
  const { token } = useSelector((state) => state.orebiReducer.userInfo);

  const [orders, setOrders] = useState([])
  const getOrders = useCallback(async () => {
    try {
      const response = await fetch(`${HOST}admin/orders?pageSize=100&sortBy=orderId`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response) {
        const result = await response.json();
        setOrders(result.content)
      }
    } catch (error) {
      toast.error(error)
    }
  }, [token])
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="max-w-container mx-auto">
      <Breadcrumbs title="Admin Orders" />
      {!isEmpty(orders) && orders.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-6 place-content-center text-lg font-titleFont font-semibold">
            <h2 className="text-center">Order Id</h2>
            <h2 className="text-center">Order Date</h2>
            <h2 className="text-center">Payment Method</h2>
            <h2 className="text-center">Order Status</h2>
            <h2 className="text-center">Total Amount</h2>
            <h2 className="text-center">Action</h2>
          </div>
          <div className="mt-5 max-h-96 overflow-scroll">
            {orders.map((order) => (
              <div key={order.orderId}>
                <OrderItem order={order} getOrders={getOrders} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              You do not have any order
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminOrder;
