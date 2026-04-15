function ok(data) {
  return { data, error: null };
}

function err(error) {
  return { data: null, error };
}

function success(data, message = "Success") {
  return { success: true, message, data };
}

function failure(message, error = null) {
  return { success: false, message, error };
}

module.exports = {
  ok,
  err,
  success,
  failure,
};
