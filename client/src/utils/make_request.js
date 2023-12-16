import cookie from "cookie";

export async function makeRequest(uri, method = "GET", body = {}) {
  try {
    const parsedCookie = cookie.parse(document.cookie);
    const csrfToken = parsedCookie.csrftoken;

    console.log('CSRF Token:', csrfToken);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "same-origin", // includes cookies in the request
    };

    if (method === "POST") {
      options.body = JSON.stringify(body);
    }

    let json;
    const response = await fetch(uri, options);
    console.log(uri, options)

    if (response.ok) {
      json = await response.json();
    } else {
      console.error(`Failed request. Status code: ${response.status}`);
      json = {
        error: true,
        status: response.status,
        message: 'Request failed', // You can customize this message
      };
    }

    console.log('Response:', json);

    return json;
  } catch (error) {
    console.error('Error in makeRequest:', error);
    throw error; // Rethrow the error for better debugging
  }
}
