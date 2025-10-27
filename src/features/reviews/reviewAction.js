import { toast } from "react-toastify";
import { getReviewsApi, changeReviewStatusApi } from "./reviewApi.js";

// ===== Fetch all reviews =====
export const fetchReviewsAction = async () => {
  const result = await getReviewsApi();

  if (result.status === "success") {
    return {
      status: result.status,
      message: result.message,
      reviews: result.data,
      products: result.products,
      // reviews come in result.data from backend
    };
  } else {
    toast.error(result.message || "Failed to fetch reviews");
  }
};

// ===== Update review status =====
export const handleReviewStatusAction = (id) => async (dispatch) => {
  const result = await changeReviewStatusApi(id);

  toast[result.status](result.message);

  if (result.status === "success") {
    // Re-fetch reviews to refresh table (like getProductsAction)
    dispatch(fetchReviewsAction());
  }
};
