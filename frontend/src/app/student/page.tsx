"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentDashboard() {

  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";
  
  async function loadDashboard() {

    try {

      const response = await fetch(
        `${API_URL}/student/dashboard?student_id=1`
      );

      const data = await response.json();

      setDashboard(data);

    } catch (err) {

      console.error(err);
      setError("Failed to load dashboard");

    } finally {

      setLoading(false);

    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-red-500 text-xl font-bold">
          {error}
        </h1>
      </div>
    );
  }

  const requests = dashboard?.requests || [];

const totalRequests = requests.length;

  const approvedRequests =
    requests.filter(
      (request: any) =>
        request.status === "approved"
    ).length;

  const pendingRequests =
    requests.filter(
      (request: any) =>
        request.status === "pending"
    ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          Student Dashboard
        </h1>

        {/* Profile Card */}

        <div className="bg-white rounded-lg shadow p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Profile
          </h2>

          <p>
            <span className="font-semibold">
              Name:
            </span>{" "}
            {dashboard.student.name}
          </p>

          <p>
            <span className="font-semibold">
              Email:
            </span>{" "}
            {dashboard.student.email}
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-lg shadow p-4">

            <h3 className="text-lg font-semibold">
              Total Requests
            </h3>

            <p className="text-3xl mt-2">
              {totalRequests}
            </p>

          </div>

          <div className="bg-white rounded-lg shadow p-4">

            <h3 className="text-lg font-semibold">
              Approved
            </h3>

            <p className="text-3xl mt-2 text-green-600">
              {approvedRequests}
            </p>

          </div>

          <div className="bg-white rounded-lg shadow p-4">

            <h3 className="text-lg font-semibold">
              Pending
            </h3>

            <p className="text-3xl mt-2 text-yellow-600">
              {pendingRequests}
            </p>

          </div>

        </div>

        {/* Actions */}

        <div className="flex gap-4 mb-6">

          <Link href="/student/submit-request">

            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">

              Submit Request

            </button>

          </Link>

          <Link href="/student/verified-card">

            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">

              Verified Card

            </button>

          </Link>

        </div>

        {/* Requests Table */}

        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Verification Requests
          </h2>

          <table className="w-full border-collapse">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Title
                </th>

                <th className="text-left p-3">
                  Domain
                </th>

                <th className="text-left p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {requests.map(
                (request: any) => (

                  <tr
                    key={request.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {request.title}
                    </td>

                    <td className="p-3">
                      {request.domain_id}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          request.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {request.status}

                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}