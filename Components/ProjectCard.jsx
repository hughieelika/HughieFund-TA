import React from "react";
import Image from "next/image";

function ProjectCard() {
  return (
    <div className="w-fit flex flex-col px-6 py-8 bg-white rounded-lg border-2 border-[#A7A7A7]">
      <div className=" items-center justify-center text-center ">
        <div className="w-fit bg-white ml-3">
          <Image src={"/bg-ruanggurau.png"} height={203} width={285} />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold text-[#214098] text-sm my-2">Educational</p>
        <p className="font-bold text-black text-3xl mb-1">Ruang Gurau</p>
        <p className="font-bold text-gray-600 text-md mb-4">DAYS LEFT: 13</p>
        <div className="flex flex-row text-xl">
          <p className="font-bold text-[#214098] mr-2">Target:</p>
          <p>10/1000 USD(10%)</p>
        </div>
        <div className="flex flex-row mt-6">
          <button className="px-4 py-2 bg-[#019F49] text-white font-medium rounded-lg mr-1 text-md">
            Invest Project
          </button>
          <button className="px-4 py-2 bg-[#F16622] text-white font-medium rounded-lg ml-1">
            PDF Whitepaper
          </button>
        </div>
        <button className="w-full my-4 px-4 py-2 bg-red-600 text-white font-medium rounded-lg ml-1">
            Delete
          </button>
      </div>
    </div>
  );
}

export default ProjectCard;
