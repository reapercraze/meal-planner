import cookie from "cookie";

export async function makeRequest(uri, method = "get", body = {}) {
  const parsedCookie = cookie.parse(document.cookie)
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-CSRFToken": parsedCookie.csrftoken // protects against CSRF attacks
    },
    credentials: "include", // includes cookies in the request
  }

  if (method === "post") {
    options.body = JSON.stringify(body)
  }
  const result = await fetch(uri, options);
  const json = await result.json()
  return json;
}