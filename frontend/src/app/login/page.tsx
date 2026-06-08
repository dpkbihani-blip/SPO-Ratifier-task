"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:8080";

async function login() {

try {

  const response =
    await fetch(
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

  alert(
    data.message
  );

  if (response.ok) {

    localStorage.setItem(
      "user_id",
      data.user_id
    );

    localStorage.setItem(
      "role",
      data.role
    );

    if (
      data.role ===
      "student"
    ) {

      window.location.href =
        "/student";

    } else if (
      data.role ===
      "admin"
    ) {

      window.location.href =
        "/admin";

    } else if (
      data.role ===
      "master"
    ) {

      window.location.href =
        "/master";

    }

  }

} catch (err) {

  console.error(err);

  alert(
    "Unable to connect to server"
  );

}

}

return (

<div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

    <div className="text-center mb-8">

      <h1 className="text-3xl font-bold text-slate-800">
        Welcome Back
      </h1>

      <p className="text-slate-500 mt-2">
        Verified Student Portal
      </p>

    </div>

    <div className="space-y-4">

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
        onClick={login}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Login
      </button>

    </div>

    <div className="mt-6 text-center">

      <p className="text-slate-500">

        Don't have an account?

        <Link
          href="/signup"
          className="text-blue-600 ml-2 hover:underline"
        >
          Sign Up
        </Link>

      </p>

    </div>

  </div>

</div>

);
}
