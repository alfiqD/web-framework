import CardWrapper from "./CardWrapper";
import SelectYear from "./SelectYear";

export default function RevenueSection() {
  return (
    <CardWrapper title="Revenue" action={<SelectYear />}>
      <div className="h-40 mt-4 relative w-full border-b border-gray-100 flex items-end">
        {/* Simulasi Grafik SVG */}
        <svg className="w-full h-full text-[#B01030]" viewBox="0 0 100 30" preserveAspectRatio="none">
          <path d="M0,25 Q25,15 50,20 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </CardWrapper>
  );
}