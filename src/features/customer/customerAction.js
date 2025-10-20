import { getAllCustomersApi } from "./customerApi";

export const fetchAllCustomersAction = async () => {
  const customer = await getAllCustomersApi();
  if (customer.status === "success") {
    return customer;
  }
};
