import React, { useRef, useEffect } from "react";
import Image from "next/image";

function List({ data, onContactClick, onInvestClick, onClose, onPdfDownload }) {
  const popupRefs = useRef([]);

  useEffect(() => {
    function handleClickOutside(event) {
      popupRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target)) {
          const closePopup = document.getElementById(`popup-close-${index}`);
          if (closePopup) {
            closePopup.click();
          }
          onClose(); // Call the onClose handler to close the contact popup
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRefs, onClose]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-4">
      {data.map((contact, index) => (
        <div
          key={contact.id}
          className="flex flex-col px-6 py-8 bg-white rounded-lg border-2 border-[#A7A7A7] cursor-pointer"
          onClick={() => onContactClick(contact)}
          ref={(el) => (popupRefs.current[index] = el)}
        >
          <div className="items-center justify-center text-center">
            <div className="w-fit bg-white ml-3">
              <Image
                src={`/${contact.companyProfile}`}
                height={203}
                width={285}
                alt="mboh"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold text-[#214098] text-sm my-2">{contact.category}</p>
            <p className="font-bold text-black text-3xl mb-1">{contact.companyName}</p>
            <p className="font-bold text-gray-600 text-md mb-4">{contact.deadline}</p>
            <div className="flex flex-row text-xl">
              <p className="font-bold text-[#214098] mr-2">Target:</p>
              <p>{contact.targetAmount}</p>
            </div>
            <div className="flex flex-row mt-6">
              <button
                className="px-4 py-2 bg-[#019F49] text-white font-medium rounded-lg mr-1 text-md"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onContactClick
                  onInvestClick(contact);
                }}
              >
                Invest Project
              </button>
              <button
                className="px-4 py-2 bg-[#F16622] text-white font-medium rounded-lg ml-1"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onContactClick
                  onPdfDownload(contact.companyWhitepaper);
                }}
              >
                Download Whitepaper
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
