const jwt = require("jsonwebtoken");
require("dotenv").config();

//pass user data as tokenData which you want to save in jwt
const getRefreshToken = (tokenData) => {
  try {
    let refreshToken = jwt.sign(tokenData, "HHKSHDUUEJKS", {
      expiresIn: "8h",
    });
    return refreshToken;
  } catch (error) {
    throw new Error(error);
  }
};

//provide refressh token and get the access token if valid
const getAccessToken = (refreshToken) => {
  try {
    let tokenData = jwt.verify(refreshToken, "HHKSHDUUEJKS");
    let accessToken = jwt.sign(
      {
        firstName: tokenData.firstName,
        lastName: tokenData.lastName,
        email: tokenData.email,
        userid: tokenData.userid,
        userRole: tokenData.userRole,
      },
      "HHKSHDUUEJKS",
      { expiresIn: "8h" }
    );
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

//pass user data as tokenData. it will give you both token;
const getTokens = (tokenData) => {
  try {
    const refreshToken = getRefreshToken(tokenData);
    const accessToken = getAccessToken(refreshToken);
   

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getTokens, getAccessToken, getRefreshToken };
