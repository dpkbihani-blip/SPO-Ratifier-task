"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
const [requests, setRequests] = useState<any[]>([]);

const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:8080";

async function loadRequests() {
try {
const response = await fetch(
`${API_URL}/admin/requests?admin_id=1`
);
  const data = await response.json();

  setRequests(data);
} catch (err) {
  console.error(err);
  alert("Failed to load requests");
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
loadRequests();
}, []);

return ( <div> <h1>
Domain Admin Dashboard </h1>

  <h2>
    Verification Requests
  </h2>

  {requests.length === 0 ? (
    <p>
      No requests available
    </p>
  ) : (
    <table border={1}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Student</th>
          <th>Title</th>
          <th>Description</th>
          <th>Domain</th>
          <th>Proof</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {requests.map(
          (request) => (
            <tr key={request.id}>
              <td>
                {request.id}
              </td>

              <td>
                {
                  request.student_name
                }
              </td>

              <td>
                {request.title}
              </td>

              <td>
                {
                  request.description
                }
              </td>

              <td>
                {
                  request.domain_id
                }
              </td>

              <td>
                <a
                  href={
                    request.proof_link
                  }
                  target="_blank"
                >
                  Proof
                </a>
              </td>

              <td>
                {request.status}
              </td>

              <td>
                <button
                  onClick={() =>
                    updateRequest(
                      request.id,
                      "approved"
                    )
                  }
                >
                  Approve
                </button>

                {" "}

                <button
                  onClick={() =>
                    updateRequest(
                      request.id,
                      "rejected"
                    )
                  }
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

);
}
