"use client";

import { useState } from "react";

export default function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:8080";

async function login() {
try {
const response = await fetch(
`${API_URL}/login`,
{
method: "POST",
headers: {
"Content-Type":
"application/json",
},
body: JSON.stringify({
email,
password,
}),
}
);

  const data =
    await response.json();

  alert(data.message);

  if (response.ok) {
    window.location.href =
      "/student";
  }
} catch (err) {
  console.error(err);

  alert(
    "Unable to connect to server"
  );
}

}

return ( <div> <h1>Login</h1>

  <input
    placeholder="Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />

  <br />
  <br />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <br />
  <br />

  <button onClick={login}>
    Login
  </button>
</div>

);
}
