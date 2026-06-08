"use client";

import { useEffect, useState } from "react";

export default function VerifiedCardPage() {
const [card, setCard] = useState<any>(null);
const [loading, setLoading] = useState(true);

const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:8080";

async function loadCard() {
try {

  const role =
    localStorage.getItem(
      "role"
    );

  if (role !== "student") {

    window.location.href =
      "/login";

    return;
  }

  const studentID =
    localStorage.getItem(
      "user_id"
    );

  const response =
    await fetch(
      `${API_URL}/student/verified-card?student_id=${studentID}`
    );

  const data =
    await response.json();

  setCard(data);

} catch (err) {

  console.error(err);

  alert(
    "Failed to load verified card"
  );

} finally {

  setLoading(false);

}

}

useEffect(() => {
loadCard();
}, []);

function getDomainName(
domainID: number
) {
switch (domainID) {
case 1:
return "GnS";
case 2:
return "AnC";
case 3:
return "SnT";
case 4:
return "MnC";
default:
return "Unknown";
}
}

if (loading) {
return ( <div className="min-h-screen flex items-center justify-center">

    <h1 className="text-2xl font-bold">
      Loading...
    </h1>

  </div>
);

}

if (!card) {
return ( <div className="min-h-screen flex items-center justify-center">

    <h1 className="text-red-600 text-2xl font-bold">
      Failed to load card
    </h1>

  </div>
);

}

const records =
card.records || [];

return ( <div className="min-h-screen bg-slate-100 p-8">

  <div className="max-w-5xl mx-auto">

    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

      <div className="bg-green-700 text-white p-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Verified Student Card
            </h1>

            <p className="mt-2 text-green-100">
              Students' Placement Office
            </p>

          </div>

          <button
            onClick={() => {

              localStorage.clear();

              window.location.href =
                "/login";

            }}
            className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="p-8">

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-gray-50 p-5 rounded-lg">

            <p className="text-gray-500 text-sm">
              Name
            </p>

            <p className="font-semibold text-lg">
              {card.student.name}
            </p>

          </div>

          <div className="bg-gray-50 p-5 rounded-lg">

            <p className="text-gray-500 text-sm">
              Email
            </p>

            <p className="font-semibold text-lg">
              {card.student.email}
            </p>

          </div>

          <div className="bg-green-50 p-5 rounded-lg">

            <p className="text-green-700 text-sm">
              Verified Records
            </p>

            <p className="font-bold text-3xl text-green-700">
              {records.length}
            </p>

          </div>

        </div>

        <h2 className="text-2xl font-bold mb-6">
          Approved Records
        </h2>

        {records.length === 0 ? (

          <div className="bg-gray-50 p-8 rounded-xl text-center">

            <p className="text-gray-600">
              No approved records found.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {records.map(
              (record: any) => (

                <div
                  key={record.id}
                  className="border rounded-xl p-6 bg-white shadow-sm"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-xl font-bold">
                        {record.title}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        {record.description}
                      </p>

                    </div>

                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      VERIFIED
                    </span>

                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Domain
                      </p>

                      <p className="font-medium">
                        {getDomainName(
                          record.domain_id
                        )}
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Event Date
                      </p>

                      <p className="font-medium">
                        {record.event_date}
                      </p>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  </div>

</div>

);
}
