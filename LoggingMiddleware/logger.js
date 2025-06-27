const axios = require("axios");

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcmNoaXQuMjJzY3NlMTAxMTMyMUBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAxNTQ3MCwiaWF0IjoxNzUxMDE0NTcwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNThiN2ExNDMtMzVkNy00MzU1LWJlZjYtNmE5M2NlYWMzMzI2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJjaGl0IHJhdGhvciIsInN1YiI6IjY0YzhkMTc1LTMyNzAtNDk0NC04ZDQ1LTFlZGRhNDhkYWFmOSJ9LCJlbWFpbCI6ImFyY2hpdC4yMnNjc2UxMDExMzIxQGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6ImFyY2hpdCByYXRob3IiLCJyb2xsTm8iOiIyMjEzMTAxMTMxNCIsImFjY2Vzc0NvZGUiOiJNdWFndnEiLCJjbGllbnRJRCI6IjY0YzhkMTc1LTMyNzAtNDk0NC04ZDQ1LTFlZGRhNDhkYWFmOSIsImNsaWVudFNlY3JldCI6IkRXRVpLWkZZVHpOUUVWRlIifQ.gGukj0DlZpBFHHsrremqegoQvK_EHmu1ryn5nGOz37Y';

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
