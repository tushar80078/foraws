const errorMiddleware = (err, req, res, next) => {
    if (process.env.NODE_ENV === "production") {
      res.status(500).json(err?.stack?.split('\n')[0] ||err);
    } else {
      res.status(404).json(err || "Not Found");
    }
  };
  
  module.exports = errorMiddleware;
  