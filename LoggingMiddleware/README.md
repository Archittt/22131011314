# Logging Middleware

This is a reusable logging middleware package that integrates with the Affordmed evaluation server for centralized log collection.

## Overview

This module exports a single asynchronous `log()` function that can be used across your backend (or frontend) codebase to send logs to the test server. It helps monitor application activity, catch issues early, and demonstrate production-grade observability.

## 🛠Function Signature

```js
log(stack, level, pkg, message)
