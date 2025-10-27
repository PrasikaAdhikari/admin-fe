import { apiProcessor, apiUrl } from "../../utils/axiosHelper";

// ===== Fetch all reviews =====
export const getReviewsApi = () => {
  return apiProcessor({
    method: "get",
    isPrivate: true,
    url: `${apiUrl}/reviews`,
  });
};

// ===== Change review status (active/inactive) =====
export const changeReviewStatusApi = (id) => {
  return apiProcessor({
    method: "patch",
    isPrivate: true,
    url: `${apiUrl}/reviews/${id}`,
  });
};
