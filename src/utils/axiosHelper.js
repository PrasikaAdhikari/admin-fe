import axios from "axios";

export const apiProcessor = async ({
  method,
  url,
  data,
  isPrivate,
  contentType = "application/json",
}) => {
  try {
    console.log(
      JSON.stringify({
        method: method,
        url: url,
        data: data,
        headers: isPrivate
          ? {
              Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
              "Content-type": contentType,
            }
          : {},
      })
    );
    let response = await axios({
      method: method,
      url: url,
      data: data,
      headers: isPrivate
        ? {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            "Content-type": contentType,
          }
        : {},
    });

    return response.data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};
