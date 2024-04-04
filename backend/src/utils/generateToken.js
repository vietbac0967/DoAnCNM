import jwt from "jsonwebtoken";
export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1y",
  });
};

export const decodetoken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
}

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "365d",
  });
};
