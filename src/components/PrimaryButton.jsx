export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#B01030] hover:bg-[#8A0C25] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
    >
      {children}
    </button>
  );
}