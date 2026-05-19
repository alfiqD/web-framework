export default function CardWrapper({ children, title, action }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm w-full">
      {(title || action) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h3 className="font-bold text-gray-800 text-lg">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}