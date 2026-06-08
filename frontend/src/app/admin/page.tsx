"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {

const [requests, setRequests] =
useState<any[]>([]);

const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:8080";

async function loadRequests() {

try {

  const role =
    localStorage.getItem(
      "role"
    );

  if (role !== "admin") {

    window.location.href =
      "/login";

    return;
  }

  const adminID =
    localStorage.getItem(
      "user_id"
    );

  const response =
    await fetch(
      `${API_URL}/admin/requests?admin_id=${adminID}`
    );

  const data =
    await response.json();

  setRequests(data || []);

} catch (err) {

  console.error(err);

  alert(
    "Failed to load requests"
  );

}

}

async function updateRequest(
requestID: number,
status: string
) {

const remarks =
  prompt(
    "Enter remarks"
  ) || "";

try {

  const response =
    await fetch(
      `${API_URL}/admin/request`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          request_id:
            requestID,
          status,
          remarks,
        }),
      }
    );

  const data =
    await response.json();

  alert(
    data.message ||
      "Request updated"
  );

  loadRequests();

} catch (err) {

  console.error(err);

  alert(
    "Failed to update request"
  );

}

}

useEffect(() => {
loadRequests();
}, []);

const pendingCount =
requests.filter(
(r) =>
r.status === "pending"
).length;

const approvedCount =
requests.filter(
(r) =>
r.status === "approved"
).length;

return (

<div className="min-h-screen bg-slate-100 p-8">

  <div className="max-w-7xl mx-auto">

    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Domain Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Review and verify student submissions
        </p>

      </div>

      <button
        onClick={() => {

          localStorage.clear();

          window.location.href =
            "/login";

        }}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>

    </div>

    <div className="grid md:grid-cols-3 gap-4 mb-8">

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-slate-500">
          Total Requests
        </p>

        <p className="text-3xl font-bold mt-2">
          {requests.length}
        </p>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-slate-500">
          Pending
        </p>

        <p className="text-3xl font-bold mt-2 text-yellow-600">
          {pendingCount}
        </p>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-slate-500">
          Approved
        </p>

        <p className="text-3xl font-bold mt-2 text-green-600">
          {approvedCount}
        </p>

      </div>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Verification Requests
      </h2>

      {requests.length === 0 ? (

        <p>
          No requests available
        </p>

      ) : (

        <table className="w-full">

          <thead>

            <tr className="border-b bg-slate-50">

              <th className="p-3 text-left">
                Student
              </th>

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Description
              </th>

              <th className="p-3 text-left">
                Domain
              </th>

              <th className="p-3 text-left">
                Proof
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {requests.map(
              (request) => (

                <tr
                  key={request.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {request.student_name}
                  </td>

                  <td className="p-3 font-medium">
                    {request.title}
                  </td>

                  <td className="p-3">
                    {request.description}
                  </td>

                  <td className="p-3">
                    {request.domain_id}
                  </td>

                  <td className="p-3">

                    <a
                      href={
                        request.proof_link
                      }
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      View Proof
                    </a>

                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : request.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {request.status}
                    </span>

                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        updateRequest(
                          request.id,
                          "approved"
                        )
                      }
                      className="bg-green-600 text-white px-3 py-2 rounded mr-2 hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateRequest(
                          request.id,
                          "rejected"
                        )
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      )}

    </div>

  </div>

</div>

);
}
