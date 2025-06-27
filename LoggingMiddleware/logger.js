const axios = require('axios');

async function log(stack, level, logPackage, message) {
  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      stack,
      level,
      package: logPackage,
      message
    });
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}

module.exports = log;
