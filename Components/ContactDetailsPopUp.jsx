import React, { useRef, useEffect } from "react";

function ContactDetailsPopUp({ contact, onClose, onInvestClick, onPdfDownload }) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={popupRef} className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <p className="mb-4">{contact.description}</p>
        <p className="text-lg mb-2">
          <strong className="text-[#323685]">Target:</strong>{" "}
          {contact.targetAmount} USD
        </p>
        <div className="w-full bg-[#B9BBD9] rounded-full dark:bg-gray-700">
          <div
            className={`w-[45%] bg-[#323685] text-white text-md text-center p-0.5 leading-none rounded-full py-4`}
          >
            {" "}
            <strong>Raised: </strong> {contact.raised} USD
          </div>
        </div>
        <div className="flex flex-row mt-6">
          <div className="flex flex-col w-1/2">
            <p className="text-xl text-[#323685] mb-2">
              <strong className="font-black">Contact</strong>
            </p>
            <p>
              <strong>Call</strong>
            </p>
            <p>{contact.contactPerson}</p>
            <p>
              <strong>Website</strong>{" "}
            </p>
            <p>{contact.emailCompany}</p>
            <p>
              <strong>HQ</strong>
            </p>
            <p>{contact.companyAddress}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-xl text-[#323685] mb-2">
              <strong className="font-black">Fund</strong>
            </p>
            <p>
              <strong>ROI :</strong> {contact.returnOnInvestment}
            </p>
            <p>
              <strong>Min Investment :</strong> {contact.minimumInvestment} USD
            </p>
            <p>
              <strong>Time Period :</strong> {contact.timePeriod}
            </p>
          </div>
        </div>
        <div className="flex flex-row mt-6 w-full items-center text-center justify-center">
          <button
            className="w-1/2 px-4 py-2 bg-[#019F49] text-white font-medium rounded-lg mr-1 text-md"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing the popup
              onInvestClick();
            }}
          >
            Invest Project
          </button>
          <button
            className="w-1/2 px-4 py-2 bg-[#F16622] text-white font-medium rounded-lg ml-1"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing the popup
              onPdfDownload(contact.pdfFileName);
            }}
          >
            PDF Whitepaper
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactDetailsPopUp;
