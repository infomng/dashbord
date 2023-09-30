const createError = (status, message) => {
  const err = new Error();
  message = err.message;
  status = err.status;
};

export default createError;
