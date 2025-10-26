import { toast } from "react-toastify";
import { getReviewsApi, updateReviewStatusApi } from "./reviewApi.js";

// ===== Fetch all reviews =====
export const fetchReviewsAction = async () => {
  const result = await getReviewsApi();

  if (result.status === "success") {
    return {
      status: result.status,
      message: result.message,
      reviews: result.data, // reviews come in result.data from backend
    };
  } else {
    toast.error(result.message || "Failed to fetch reviews");
  }
};

// ===== Update review status =====
export const updateReviewStatusAction = async (id, status) => {
  const result = await updateReviewStatusApi(id, status);
  toast[result.status](result.message);

  if (result.status === "success") {
    return {
      status: result.status,
      message: result.message,
    };
  }
};
