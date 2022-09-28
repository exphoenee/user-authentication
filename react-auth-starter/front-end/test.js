const params = null;
console.log(params);
console.log(typeof params === "object");
console.log(typeof null);
const urlParams =
  typeof params === "object" && params !== null
    ? "?" +
      Object.entries(params)
        .map(([key, val]) => `${key}=${val}`)
        .join("&")
    : "";
console.log(urlParams);
