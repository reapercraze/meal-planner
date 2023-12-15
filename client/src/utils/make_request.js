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
    credentials: "same-origin", // includes cookies in the request
  }

  if (method === "post") {
    options.body = JSON.stringify(body)
  }

  let json
  const response = await fetch(uri, options);

  if (response.ok) {
    json = await response.json()
  } else {
    console.error(`Failed request. Status code: ${response.status}`);
    json = {
      error: true,
      status: response.status,
      message: 'Request failed' // You can customize this message
    };
  }

  return json;
}