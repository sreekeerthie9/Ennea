import { redirect } from "react-router-dom";

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    console.log("message: Unsupported mode.}, { status: 422 }");
  }

  const data = await request.formData();
 
  let authData;
  if (mode === "login") {
    authData = {
      username: data.get("username"),
      password: data.get("password"),
    };
  } else if (mode === "signup") {
    authData = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      username: data.get("username"),
      password: data.get("password"),
      role: data.get("role"),
    };
  }
  
  const response = await fetch("http://localhost:8080/auth/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    console.log(" message: Could not authenticate user., { status: 500 }");
  }

  const resData = await response.json();
  const token = resData.token;
  const role = resData.role;
 
  localStorage.setItem("token", token);
  if (token) {
    localStorage.setItem("role", role);
  }

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
