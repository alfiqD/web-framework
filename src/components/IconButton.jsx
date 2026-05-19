export default function IconButton({ icon = "🔔", badgeCount = 0 }) {
  return (
    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors text-xl">
      <span>{icon}</span>
      {badgeCount > 0 && (
        <span className="absolute top-0 right-0 bg-[#B01030] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
          {badgeCount}
        </span>
      )}
    </button>
  );
}