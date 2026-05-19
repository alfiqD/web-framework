import { MdOutlineAutoAwesome } from "react-icons/md";
import CardWrapper from "./CardWrapper";

export default function PopularSection() {
  return (
    <CardWrapper title="Most Popular">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#F5F6FA] rounded-2xl border border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B01030] text-white flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-bold text-[#202224] text-[14px]">Rhinoplasty</p>
              <p className="text-[11px] text-gray-400 font-bold">45% Popularity</p>
            </div>
          </div>
          <MdOutlineAutoAwesome className="text-[#B01030] text-xl" />
        </div>
      </div>
    </CardWrapper>
  );
}