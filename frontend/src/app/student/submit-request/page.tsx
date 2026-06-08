"use client";

import { useEffect, useState } from "react";

export default function SubmitRequestPage() {
  const [title, setTitle] = useState("");
  const [domainID, setDomainID] = useState("1");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [proofLink, setProofLink] = useState("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8080";

useEffect(() => {

  const role =
    localStorage.getItem(
      "role"
    );

  if (role !== "student") {

    window.location.href =
      "/login";

  }

}, []);

  async function submitRequest() {
    try {
      const response = await fetch(
        `${API_URL}/requests`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            student_id: Number(
            localStorage.getItem(
            "user_id"
            )
            ),
            domain_id: Number(domainID),
            title,
            description,
            event_date: eventDate,
            proof_link: proofLink,
          }),
        }
      );

      const data =
        await response.json();

      alert(
        data.message ||
          "Request submitted"
      );

      if (response.ok) {
        window.location.href =
          "/student";
      }
    } catch (err) {
      console.error(err);

      alert(
        "Failed to submit request"
      );
    }
  }

  return (
    <div className="min-h-screen p-8">

      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Submit Verification Request
        </h1>

        <div className="space-y-4">

          <input
            className="border p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <select
            className="border p-2 w-full"
            value={domainID}
            onChange={(e) =>
              setDomainID(e.target.value)
            }
          >
            <option value="1">
              GnS
            </option>

            <option value="2">
              AnC
            </option>

            <option value="3">
              SnT
            </option>

            <option value="4">
              MnC
            </option>
          </select>

          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <input
            type="date"
            className="border p-2 w-full"
            value={eventDate}
            onChange={(e) =>
              setEventDate(
                e.target.value
              )
            }
          />

          <input
            className="border p-2 w-full"
            placeholder="Proof Link"
            value={proofLink}
            onChange={(e) =>
              setProofLink(
                e.target.value
              )
            }
          />

          <button
            onClick={submitRequest}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
}