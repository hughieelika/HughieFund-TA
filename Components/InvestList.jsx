import React from "react";
import DonutChartComponent from "./DonutChartComponent.jsx";

export default function InvestList() {
  return (
    <div className="h-full border-gray-700 shadow flex flex-col justify-between py-16 bg-srengenge">
      <div className="flex flex-row w-full sm:px-6 lg:px-32 ">
        <div className="mt-10 w-full text-black mx-20">
          <div className="flex flex-row justify-center ">
            <div className="w-1/2">
              <p className="text-5xl text-blue-800 font-semibold text-justify mb-2 ">
                Investation List
              </p>
              <hr className="h-2 bg-blue-800 border-0 dark:bg-gray-700 w-40 rounded-lg mb-8" />
            </div>
            <div className="w-1/2 text-right">
              <button
                className="inline-block text-2xl align-middle px-8 py-4 leading-none  text-white hover:text-white hover:bg-yellow-500 mt-4 mb-8 lg:mt-0 bg-orange-500 font-semibold border rounded-lg "
                type="button"
              >
                Lihat detail
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-12 ">
            <div className="pt-48 pb-2 pl-2 pr-16 overflow-hidden shadow-lg bg-[url('../public/bg-ruanggurau.png')]">
              <div class="px-6 py-2">
                <div class="font-bold text-sm text-orange-600">
                  DAYS LEFT: 13
                </div>
                <div class="font-bold text-2xl text-white">Ruang Gurau</div>
              </div>
              <div class="flex flex-row pl-6 pr-8 pb-2">
                <div className="text-white font-bold mr-8">Target:1000 USD</div>
                <div className="text-white font-bold">Raised:100 USD</div>
              </div>
            </div>
            <div className="pt-48 pb-2 pl-2 pr-16 overflow-hidden shadow-lg bg-[url('../public/bg-ruanggurau.png')]">
              <div class="px-6 py-2">
                <div class="font-bold text-sm text-orange-600">
                  DAYS LEFT: 13
                </div>
                <div class="font-bold text-2xl text-white">Ruang Gurau</div>
              </div>
              <div class="flex flex-row pl-6 pr-8 pb-2">
                <div className="text-white font-bold mr-8">Target:1000 USD</div>
                <div className="text-white font-bold">Raised:100 USD</div>
              </div>
            </div>
            <div className="pt-48 pb-2 pl-2 pr-16 overflow-hidden shadow-lg bg-[url('../public/bg-ruanggurau.png')]">
              <div class="px-6 py-2">
                <div class="font-bold text-sm text-orange-600">
                  DAYS LEFT: 13
                </div>
                <div class="font-bold text-2xl text-white">Ruang Gurau</div>
              </div>
              <div class="flex flex-row pl-6 pr-8 pb-2">
                <div className="text-white font-bold mr-8">Target:1000 USD</div>
                <div className="text-white font-bold">Raised:100 USD</div>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full my-20">
            <div className="flex flex-col w-1/2 pr-12">
              <div className="bg-blue-950 text-white font-semibold text-3xl text-center px-36 py-4 border rounded-lg">
                <p className="mb-2">Total Investment</p>
                <p>3000 USD</p>
              </div>
              <div className="bg-orange-500 text-white font-semibold text-3xl text-center my-4 px-36 py-4 border rounded-lg">
                <p className="mb-2">Total Raised</p>
                <p>300 USD</p>
              </div>
            </div>
            <div className="flex flex-col w-1/2 ">
              <div className="text-black font-semibold text-3xl mb-2">
                <p>Invest Category</p>
              </div>
              <div className="flex flex-row h-64 ">
                <DonutChartComponent />
                <div className="flex flex-row mt-20 gap-4">
                  <div className="flex flex-col">
                    <p>Category 1</p>
                    <p>$50,000</p>
                  </div>
                  <div className="flex flex-col">
                    <p>Category 1</p>
                    <p>$50,000</p>
                  </div>
                  <div className="flex flex-col">
                    <p>Category 1</p>
                    <p>$50,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center ">
            <div className="w-full">
              <p className="text-5xl text-blue-800 font-semibold text-justify mb-2 ">
                Type of Investment
              </p>
              <hr className="h-2 bg-blue-800 border-0 dark:bg-gray-700 w-40 rounded-lg mb-8" />
            </div>
          </div>
          <div className="flex flex-row justify-center gap-12 mb-40">
            <div className="py-32 px-32 overflow-hidden shadow-lg bg-[url('../public/bg-ruanggurau.png')]">
              <div class="font-bold text-4xl text-white py-1 px-1">Obligasi</div>
            </div>
            <div className="py-32 px-32 overflow-hidden shadow-lg bg-[url('../public/bg-ruanggurau.png')]">
              <div class="font-bold text-4xl text-white py-1 px-1">Stock</div>
            </div>
            <div className="py-32 px-32 overflow-hidden shadow-lg bg-[url('../public/bg-ruanggurau.png')]">
              <div class="font-bold text-4xl text-white py-1 px-1">Bond</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
