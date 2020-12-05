const apiResponse = (data: any, error: boolean = false) => {
  const responseBody = {
    error: null,
    result: null,
  };

  if (!error) {
    responseBody.result = data;

    return responseBody;
  }

  responseBody.error = data;

  return responseBody;
};

export default apiResponse;
