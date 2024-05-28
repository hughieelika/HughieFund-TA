import React from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";

function Hero() {
  return (
    <div className="flex flex-row w-full bg-[#2F2F2F] pb-8 -mt-20">
      <div className="w-1/2 flex flex-col ">
        <div className="px-20 py-40  ">
          <div className="text-white font-bold text-5xl px-40">
            Unlock New Ways to Invest Through
          </div>
          <div className="text-[#F16622] font-black text-5xl pl-40 mt-2">
            Securities CrowdFunding
          </div>
          <div className="text-white font-light text-lg pl-40 pr-64 mt-8">
            Join our business community and elevate your entrepreneurial
            experience to the next level!
          </div>
        </div>
        
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="-mb-8">
          <Image src={"/hand.png"} height={749} width={975} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
