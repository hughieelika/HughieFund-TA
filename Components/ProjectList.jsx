import React, { useEffect, useContext, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

// INTERNAL IMPORT
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PopUp, CampaignsDisplay, List } from "../Components";
import ProjectCard from "./ProjectCard";
import ContactDetailsPopUp from "./ContactDetailsPopUp";

export default function ProjectList() {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState([]);
  const [usercampaign, setUsercampaign] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [investmentSuccess, setInvestmentSuccess] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const popupRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const getCampaignsData = getCampaigns();
    const userCampaignsData = getUserCampaigns();
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();

    return async () => {
      const allData = await getCampaignsData;
      const userData = await userCampaignsData;
      setAllcampaign(allData);
      setUsercampaign(userData);
    };
  }, [getCampaigns, getUserCampaigns]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedContact(null);
      }
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setOpenModel(false);
        setDonateCampaign(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, modelRef]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleClosePopUp = () => {
    setSelectedContact(null);
  };

  const handleInvestClick = (contact) => {
    setDonateCampaign(contact);
    setOpenModel(true);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
    setDonateCampaign(null);
    setInvestmentAmount(0); // Reset investment amount
  };

  const handleInvestmentChange = (e) => {
    setInvestmentAmount(Number(e.target.value));
  };

  const handleAcceptInvestment = async () => {
    try {
      const updatedContact = {
        ...donateCampaign,
        raised: donateCampaign.raised + investmentAmount,
      };

      await axios.put(
        `http://localhost:5000/contacts/${donateCampaign.id}`,
        updatedContact
      );

      const updatedContacts = contacts.map((contact) => {
        if (contact.id === donateCampaign.id) {
          return updatedContact;
        }
        return contact;
      });

      setContacts(updatedContacts);
      handleCloseModel();
      setInvestmentSuccess(true);
      setTimeout(() => setInvestmentSuccess(false), 2000); // Hide after 2 seconds
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handlePdfDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `/uploads/${fileName}`;
    link.download = fileName;
    link.click();
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 2000); // Hide after 2 seconds
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearchTerm = contact.companyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category === "" || contact.category === category;
    return matchesSearchTerm && matchesCategory;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="w-full bg-white mb-20">
      <div className="flex flex-row p-4 bg-[#2F2F2F] -mt-20 mb-20">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-1/2 mb-4 ml-20 mr-60 p-2 border border-gray-300 rounded"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-1/2 mb-4 ml-80 mr-20 p-2 border border-gray-300 rounded"
        >
          <option value="">All Categories</option>
          {Array.from(new Set(contacts.map((contact) => contact.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>
      <div>
        <List
          data={filteredContacts}
          onContactClick={handleContactClick}
          onInvestClick={handleInvestClick}
          onClose={handleClosePopUp}
          onPdfDownload={handlePdfDownload}
        />
      </div>
      {selectedContact && (
        <ContactDetailsPopUp
          contact={selectedContact}
          onClose={handleClosePopUp}
          onInvestClick={() => handleInvestClick(selectedContact)}
          onPdfDownload={() => handlePdfDownload(selectedContact.pdfFileName)} // Pass the correct file name
        />
      )}
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div ref={modelRef} className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Invest Project</h2>
            <form>
              <input
                type="number"
                placeholder="Input Amount (Min 10 USD)"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={investmentAmount}
                onChange={handleInvestmentChange}
              />
              <button
                type="button"
                className="w-full bg-green-500 text-white p-2 rounded"
                onClick={handleAcceptInvestment}
              >
                Accept
              </button>
            </form>
            {donateCampaign && donateCampaign.investors && (
              <ul className="mt-4">
                <h3 className="font-bold">Investors:</h3>
                {donateCampaign.investors.map((investor, index) => (
                  <li key={index}>
                    {index + 1}. {investor}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {investmentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg px-20 py-20 text-center">
            <Image src={"/sukses.png"} height={203} width={285} alt="mboh" />
            <h2 className="text-3xl font-bold text-[#171E6E] mt-12">Investment Successful</h2>
            <button
                className="w-full px-4 py-2 bg-[#019F49] text-white font-medium rounded-lg mt-12"
              >
                Finish
              </button>
          </div>
        </div>
      )}
      {pdfDownloaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg px-20 py-20 text-center">
            <Image src={"/sukses.png"} height={203} width={285} alt="mboh" />
            <h2 className="text-3xl font-bold text-[#171E6E] mt-12">PDF Downloaded</h2>
            <button
                className="w-full px-4 py-2 bg-[#019F49] text-white font-medium rounded-lg mt-12"
              >
                Finish
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
