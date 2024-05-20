// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
  const fgCyan = '\x1b[36m';
  next();
};

exports.clog = clog;

