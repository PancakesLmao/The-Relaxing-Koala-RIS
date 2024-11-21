import { setCookie, getCookie, deleteCookie } from "./Methods";

const API = "http://127.0.0.1:8000/staff/login";

export async function handleLogin(formData) {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      setCookie("role", data.role, 1);
      setCookie("name", `${data.first_name} ${data.last_name}`)
           
      return data;
    } else {
      console.error("Failed to login");
      return null;
    }
  } catch (error) {
    console.error("Error: ", error);
    return null;
    }
}
