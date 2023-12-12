const limiter = require("express-rate-limit");

function rateLimit(time, timetype, maxReq, message) {
  let limit = limiter({
    windowMs: time || 15 * 60 * 1000, // 15 minutes
    max: maxReq || 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
    message: {
      status: false,
      code: "TOO_MANY_REQUESTS",
      message:
        message ||
        ` Too Many Requests, Please Try Again ${
          time ? time + " " + timetype : "15 minutes"
        }`,
    },
  });

  return limit;
}

module.exports = rateLimit;
