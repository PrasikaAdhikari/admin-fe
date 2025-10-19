import { toast } from "react-toastify";
import { changeStatusApi, getOrdersApi } from "./orderApi";

export const fetchOrdersAction = async () => {
  const result = await getOrdersApi();
  if (result.status === "success") {
    return {
      status: result.status,
      message: result.message,
      orders: result.orders,
    };
  }
};

export const changeStatusAction = async (id, status) => {
  const result = await changeStatusApi(id, status);
  toast[result.status](result.message);

  if (result.status === "success") {
    return {
      status: result.status,
      message: result.message,
    };
  }
};
