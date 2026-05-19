export default function UserProfile({ name = "Moni Roy", role = "Admin" }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold overflow-hidden border border-gray-200">
        <img src="https://ui-avatars.com/api/?name=Moni+Roy&background=f3f4f6&color=B01030" alt={name} />
      </div>
      <div className="text-left">
        <h4 className="text-sm font-bold text-gray-800 leading-tight">{name}</h4>
        <p className="text-xs text-gray-400 font-medium">{role}</p>
      </div>
    </div>
  );
}