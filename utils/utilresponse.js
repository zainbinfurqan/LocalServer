/*
 * Util-response.js
 */

const _ = require("lodash");

const utils = {};

utils.responseWrapper = function(message, data = {}) {
  const _res = {
    success: true,
    message: message,
    data
  };

  if (message === "requiredAll")
    _res["message"] = "Please fill all the required fields";

  if (message == "fetchSuccess") _res["message"] = "Fetched successfully";

  if (message == "createSuccess") _res["message"] = "Created successfully";

  if (message == "updateSuccess") _res["message"] = "Updated successfully";

  if (message == "removeSuccess") _res["message"] = "Removed successfully";

  // if ((data && Object.keys(data).length) || Array.isArray(data)) {
  //   _res.response["data"] = data.data;
  //   if (data.data.length && data.count) _res.response["count"] = data.count;
  // }

  return _res;
};

utils._dataOmit = function(data, omitArray) {
  data["data"] = _.omit(data.data.toObject(), omitArray);
  return data;
};

module.exports = utils;
