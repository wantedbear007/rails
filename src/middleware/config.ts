import rateLimit from "express-rate-limit";

export const corsOptions = {
  origin: "http://localhost:3000", // Allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

// const rateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   keyGenerator: (req, res) => {
//     return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
//   },