import CardWrapper from "./CardWrapper";

export default function ScheduleList() {
  const schedules = [
    { id: 1, doctor: "Dr. Olivia Grant", patient: "Sarah Miller", time: "09:00 AM", isDone: true },
    { id: 2, doctor: "Dr. David Carter", patient: "Michael Brown", time: "12:00 PM", isDone: false },
  ];

  return (
    <CardWrapper title="Surgery Schedules">
      <div className="space-y-4 mb-6">
        {schedules.map(s => (
          <div key={s.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${s.isDone ? 'bg-[#00B69B]' : 'bg-gray-300'}`}>
              {s.isDone ? '✔' : ''}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">{s.doctor}</h4>
              <p className="text-xs text-gray-500">{s.patient} • {s.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full bg-[#B01030] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#8A0C25] transition-colors">
        View Full Schedule
      </button>
    </CardWrapper>
  );
}