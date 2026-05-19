import StatusBadge from "./StatusBadge";

export default function PatientTable() {
  const patients = [
    { id: 1, name: "Sarah Miller", treatment: "Facial", date: "12.09.2024", status: "Delivered" },
    { id: 2, name: "Michael Brown", treatment: "Consultation", date: "12.09.2024", status: "Pending" },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-400">
          <tr>
            <th className="py-3 px-4">Patient</th>
            <th className="py-3 px-4">Treatment</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {patients.map(p => (
            <tr key={p.id}>
              <td className="py-3 px-4 font-semibold text-gray-800">{p.name}</td>
              <td className="py-3 px-4 text-gray-600">{p.treatment}</td>
              <td className="py-3 px-4"><StatusBadge status={p.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}