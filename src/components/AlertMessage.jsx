export default function AlertMessage({ message, type = "success" }) {
  return (
    <div className={`p-4 rounded-lg flex items-center gap-3 w-full max-w-md ${type === "success" ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
      <span>{type === "success" ? '✅' : '⚠️'}</span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}