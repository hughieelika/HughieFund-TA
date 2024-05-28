import React, { useState } from "react";
import Image from "next/image";

function DetailInvesKu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-row w-full bg-white">
      <div className="flex flex-col w-full px-32 pt-20 pb-12 gap-20">
        <Image src={"/jumbo.png"} height={1800} width={1800} />
        <div className="flex flex-row">
          <p>Target:</p>
          <p>1000 USD</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: "45%" }}
          >
            45%
          </div>
        </div>
        <div>
          <p className="font-black text-2xl mb-4 text-[#214098]">Educational</p>
          <p className="font-black text-5xl mb-4">Ruang Gurau</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            ut ligula mauris. Nullam id nisl vehicula risus posuere tincidunt ac
            id ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur ut ligula mauris. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Curabitur ut ligula mauris. Nullam id nisl vehicula
            risus posuere tincidunt ac id ante. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Curabitur ut ligula mauris. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Curabitur ut ligula
            mauris. Nullam id nisl vehicula risus posuere tincidunt ac id ante.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            ut ligula mauris.
          </p>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p className="font-black text-2xl text-[#214098]">Contact</p>
            <div className="flex flex-row mt-4">
              <div className="flex flex-col mr-12">
                <p className="font-bold">Call</p>
                <p>+6285711207595</p>
                <p className="font-bold">Website</p>
                <p>ruanggurau.com</p>
              </div>
              <div className="flex flex-col mr-20 w-60">
                <p className="font-bold">HQ</p>
                <p>
                  Jl. Gambir No.25, Samoja, Kec. Batununggal, Kota Bandung, Jawa
                  Barat 40273
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-black text-2xl text-[#214098]">Fund</p>
            <div className="flex flex-row mt-4">
              <p className="font-bold">ROI :</p>
              <p>150%</p>
            </div>
            <div className="flex flex-row">
              <p className="font-bold">Min Investment :</p>
              <p>10 USD</p>
            </div>
            <div className="flex flex-row">
              <p className="font-bold">Time Period :</p>
              <p>1-2 years</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-6">
          <button className="px-4 py-2 bg-[#019F49] text-white font-medium rounded-lg mr-1 text-md">
            Invest Project
          </button>
          <button className="px-4 py-2 bg-[#F16622] text-white font-medium rounded-lg ml-1">
            PDF Whitepaper
          </button>
        </div>

        {/* Modal toggle */}
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Toggle modal
        </button>

        {/* Main modal */}
        {isModalOpen && (
          <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={toggleModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5 space-y-4">
                  <div className="w-full bg-black">
                  <Image src={"/sukses.png"} height={500} width={500} />
                  </div>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Investment Success!
                  </p>
                </div>
                {/* Modal footer */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    I accept
                  </button>
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailInvesKu;
