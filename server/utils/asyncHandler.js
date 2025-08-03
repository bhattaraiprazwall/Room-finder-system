// Higher-order function to wrap async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  // Ensure the function returns a promise
  Promise.resolve(fn(req, res, next))
    // Handle any errors by passing to Express's error handler
    .catch((error) => {
      console.error('Async Handler Error:', error);
      next(error);
    });
};

module.exports = asyncHandler;