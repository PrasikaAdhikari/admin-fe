import { getOrdersApi } from "./orderApi";

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
