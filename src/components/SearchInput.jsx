export default function SearchInput({ placeholder = "Search..." }) {
  return (
    <div className="relative w-64">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#B01030]"
      />
    </div>
  );
}