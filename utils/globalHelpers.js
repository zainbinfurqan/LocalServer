const globalHelpers = {};

globalHelpers.handleMongooseError = function(response) {
  console.log("response =>", typeof response);

  let returnResponse = {};

  if (typeof response === "string") {
    return { message: response };
  }

  if (response.name === "ValidationError") {
    const errorsArray = [];
    for (item in response.errors) {
      errorsArray.push(response.errors[item].message);
    }

    returnResponse.message = errorsArray;
  } else if ("message" in response) {
    returnResponse = { message: response.message };
  } else if (Array.isArray(response)) {
    returnResponse.message = response;
  }

  return returnResponse;
};



module.exports = globalHelpers;
