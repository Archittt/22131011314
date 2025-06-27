const axios = require("axios");

const AUTH_TOKEN = 'YOUR_AUTH_TOKEN';

const log = async (stack, level, pkg, message) => {
  try {
    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: AUTH_TOKEN
        }
      }
    );
  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
};

module.exports = log;
