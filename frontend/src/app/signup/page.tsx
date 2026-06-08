"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:8080";

async function signup() {
try {

  const response = await fetch(
    `${API_URL}/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  const data =
    await response.json();

  alert(
    data.message
  );

  if (response.ok) {
    window.location.href =
      "/login";
  }

} catch (err) {

  console.error(err);

  alert(
    "Signup failed"
  );

}

}

return (

<div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

    <div className="text-center mb-8">

      <h1 className="text-3xl font-bold text-slate-800">
        Create Account
      </h1>

      <p className="text-slate-500 mt-2">
        Verified Student Portal
      </p>

    </div>

    <div className="space-y-4">

      <input
        className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <input
        className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        onClick={signup}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Sign Up
      </button>

    </div>

    <div className="mt-6 text-center">

      <p className="text-slate-500">

        Already have an account?

        <Link
          href="/login"
          className="text-blue-600 ml-2 hover:underline"
        >
          Login
        </Link>

      </p>

    </div>

  </div>

</div>

);
}
