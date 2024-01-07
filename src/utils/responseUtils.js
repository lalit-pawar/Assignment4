const generateSuccessResponse = (data, message = "Success", params = {}) => {
  return {
    data,
    success: true,
    failCode: 0,
    params,
    message,
  };
};
const generateErrorResponse = (failCode, message = "Error", params = {}) => {
  return {
    data: null,
    success: false,
    failCode,
    params,
    message,
  };
};


module.exports = {

     generateSuccessResponse,
     generateErrorResponse
};

