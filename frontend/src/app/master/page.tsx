"use client";

import { useEffect, useState } from "react";

export default function MasterPage() {
const [students, setStudents] = useState<any[]>([]);
const [requests, setRequests] = useState<any[]>([]);

const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:8080";

async function loadStudents() {
try {
const response = await fetch(
`${API_URL}/master/students`
);

  const data = await response.json();

  setStudents(data || []);
} catch (err) {
  console.error(err);
  alert("Failed to load students");
}

}

async function loadRequests() {
try {
const response = await fetch(
`${API_URL}/master/requests`
);

  const data = await response.json();

  setRequests(data || []);
} catch (err) {
  console.error(err);
  alert("Failed to load requests");
}

}

async function assignAdmin(
userID: number
) {
const domainID = prompt(
"Assign Domain\n1 = GnS\n2 = AnC\n3 = SnT\n4 = MnC"
);

if (!domainID) return;

try {
  const response = await fetch(
    `${API_URL}/master/assign-admin`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
        domain_id:
          Number(domainID),
      }),
    }
  );

  const data =
    await response.json();

  alert(
    data.message ||
      "Admin assigned"
  );
} catch (err) {
  console.error(err);
  alert(
    "Failed to assign admin"
  );
}

}

async function updateRequest(
requestID: number,
status: string
) {
const remarks =
prompt("Enter remarks") || "";

try {
  const response = await fetch(
    `${API_URL}/admin/request`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        request_id: requestID,
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
  const role = localStorage.getItem("role");

  if (role !== "master") {
    window.location.href = "/login";
    return;
  }

  loadStudents();
  loadRequests();
}, []);

return ( <div className="min-h-screen bg-gray-100 p-8">

  <div className="max-w-7xl mx-auto">

    <h1 className="text-4xl font-bold mb-6">
      Master Admin Dashboard
    </h1>
    <div className="mb-6">

  <button
    onClick={() => {

      localStorage.clear();

      window.location.href =
        "/login";

    }}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Logout
  </button>

</div>
    <div className="bg-white rounded-lg shadow p-6">

      <h2 className="text-2xl font-semibold mb-4">
        Students
      </h2>

      {students.length === 0 ? (

        <p>No students found</p>

      ) : (

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map(
              (student) => (
                <tr
                  key={student.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {student.id}
                  </td>

                  <td className="p-3">
                    {student.name}
                  </td>

                  <td className="p-3">
                    {student.email}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        assignAdmin(
                          student.id
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Make Domain Admin
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      )}

    </div>

    <div className="bg-white rounded-lg shadow p-6 mt-6">

      <h2 className="text-2xl font-semibold mb-4">
        All Verification Requests
      </h2>

      {requests.length === 0 ? (

        <p>No requests found</p>

      ) : (

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Student
              </th>

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Domain
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
                    {request.id}
                  </td>

                  <td className="p-3">
                    {request.student_name}
                  </td>

                  <td className="p-3">
                    {request.title}
                  </td>

                  <td className="p-3">
                    {request.domain_id}
                  </td>

                  <td className="p-3">
                    {request.status}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        updateRequest(
                          request.id,
                          "approved"
                        )
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2"
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
                      className="bg-red-600 text-white px-3 py-1 rounded"
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
