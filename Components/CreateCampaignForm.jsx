import React, { useState, useEffect } from "react";
import axios from "axios";
import { uid } from "uid";
import Image from "next/image";

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-base text-black">
    {children}
  </label>
);

const TextInput = ({ name, id, value, onChange, placeholder }) => (
  <input
    type="text"
    name={name}
    id={id}
    value={value}
    onChange={onChange}
    className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
    placeholder={placeholder}
    required
  />
);

const SelectInput = ({ name, id, value, onChange, options }) => (
  <select
    name={name}
    id={id}
    value={value}
    onChange={onChange}
    className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Popup = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-lg shadow-lg px-20 py-20 text-center">
      <Image src={"/sukses.png"} height={203} width={285} alt="mboh" />
      <h2 className="text-3xl font-bold text-[#171E6E] mt-12">{message}</h2>
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-[#019F49] text-white font-medium rounded-lg mt-12"
      >
        Finish
      </button>
    </div>
  </div>
);

export default function CreateCampaignForm() {
  const [contacts, setContacts] = useState([]);
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  const [files, setFiles] = useState({
    companyProfile: null,
    companyWhitepaper: null,
  });
  const [popupVisible, setPopupVisible] = useState(false);

  const [campaign, setCampaign] = useState({
    companyName: "",
    description: "",
    category: "",
    contactPerson: "",
    emailCompany: "",
    companyAddress: "",
    deadline: "",
    targetAmount: "",
    minimumInvestment: "",
    raised: 0,
    timePeriod: "",
    returnOnInvestment: "",
    companyProfile: "",
    companyWhitepaper: "",
    investors: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleChange(e) {
    const { name, value, files: inputFiles } = e.target;
    if (inputFiles) {
      const file = inputFiles[0];
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: file,
      }));
    } else {
      setCampaign((prevCampaign) => ({
        ...prevCampaign,
        [name]: value,
      }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (campaign.companyName === "" || campaign.description === "") {
      return false;
    }

    const formData = new FormData();
    formData.append("photo", files.companyProfile);
    formData.append("whitepaper", files.companyWhitepaper);

    const uploadResponse = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    const updatedCampaign = {
      ...campaign,
      companyProfile: uploadResponse.image,
      companyWhitepaper: uploadResponse.pdf,
    };

    if (isUpdate.status) {
      axios
        .put(`http://localhost:5000/contacts/${isUpdate.id}`, updatedCampaign)
        .then(() => {
          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact.id === isUpdate.id
                ? { ...contact, ...updatedCampaign }
                : contact
            )
          );
          setIsUpdate({ id: null, status: false });
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      const newCampaign = {
        id: uid(),
        ...updatedCampaign,
      };

      axios
        .post("http://localhost:5000/contacts", newCampaign)
        .then((response) => {
          setContacts([...contacts, response.data]);
          setCampaign({
            companyName: "",
            description: "",
            category: "",
            contactPerson: "",
            emailCompany: "",
            companyAddress: "",
            deadline: "",
            targetAmount: "",
            minimumInvestment: "",
            raised: 0,
            timePeriod: "",
            returnOnInvestment: "",
            companyProfile: "",
            companyWhitepaper: "",
          });
          setPopupVisible(true); // Show the popup
          setTimeout(() => setPopupVisible(false), 2000); // Hide after 2 seconds
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  };

  return (
    <div className="flex flex-row w-full items-center justify-center">
      <div className="flex flex-col mx-40 my-20 border-2 rounded-3xl shadow-lg bg-white w-full">
        <div className="mx-24 my-12 font-bold">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label
                htmlFor="companyName"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Company Name
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter company name"
                required
                type="text"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="companyName"
                name="companyName"
                value={campaign.companyName}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="description"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Description
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter description"
                required
                type="text"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="description"
                name="description"
                value={campaign.description}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="category"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Category
              </label>
              <SelectInput
                name="category"
                id="category"
                value={campaign.category}
                onChange={handleChange}
                options={[
                  "Educational",
                  "Consumer",
                  "Industrial",
                  "Healthcare",
                  "Real estate",
                  "Financial",
                  "Energy",
                  "Transportation",
                  "Commodities",
                ]}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="contactPerson"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Contact Person
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                type="text"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="contactPerson"
                name="contactPerson"
                value={campaign.contactPerson}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="emailCompany"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Email Company
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter email"
                required
                type="text"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="emailCompany"
                name="emailCompany"
                value={campaign.emailCompany}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="companyAddress"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Company Address
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter company address"
                required
                type="text"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="companyAddress"
                name="companyAddress"
                value={campaign.companyAddress}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="deadline"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Deadline
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter time"
                required
                type="date"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="deadline"
                name="deadline"
                value={campaign.deadline}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="targetAmount"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Target Amount
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter number"
                required
                type="number"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="targetAmount"
                name="targetAmount"
                value={campaign.targetAmount}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="minimumInvestment"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Minimum Investment
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter amount"
                required
                type="number"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="minimumInvestment"
                name="minimumInvestment"
                value={campaign.minimumInvestment}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="timePeriod"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Time Period
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter time"
                required
                type="date"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="timePeriod"
                name="timePeriod"
                value={campaign.timePeriod}
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="returnOnInvestment"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Return on Investment
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter number"
                required
                type="number"
                className="w-full rounded-md border border-[#2F2F2F] mt-4 px-4 py-3 text-[#5C5C5C] font-light"
                id="returnOnInvestment"
                name="returnOnInvestment"
                value={campaign.returnOnInvestment}
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="companyProfile"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Company Profile (.png)
              </label>
              <div className="flex items-center justify-center w-full mt-4">
                <label
                  htmlFor="companyProfile"
                  className="flex flex-col items-end justify-center w-full h-40 rounded-md border border-[#2F2F2F] cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center bg-[#214098] px-4 py-2 mx-8 font-medium border rounded-xl">
                    <p className="text-lg text-white ">Choose File</p>
                  </div>
                  <input
                    type="file"
                    className="form-control hidden"
                    id="companyProfile"
                    name="companyProfile"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="companyWhitepaper"
                className="inline-block mb-1 font-bold font-[#2F2F2F]"
              >
                Company Whitepaper (.pdf)
              </label>
              <div className="flex items-center justify-center w-full mt-4">
                <label
                  htmlFor="companyWhitepaper"
                  className="flex flex-col items-end justify-center w-full h-40 rounded-md border border-[#2F2F2F] cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center bg-[#214098] px-4 py-2 mx-8 font-medium border rounded-xl">
                    <p className="text-lg text-white ">Choose File</p>
                  </div>
                  <input
                    type="file"
                    className="form-control hidden"
                    id="companyWhitepaper"
                    name="companyWhitepaper"
                    onChange={handleChange}
                    accept=".pdf"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 mb-4 flex flex-col items-center justify-center mx-40">
              <button
                type="submit"
                className="bg-[#019F49] rounded-lg py-4 px-12 w-full"
              >
                <p className="text-lg text-white ">Submit & Create Campaign</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      {popupVisible && (
        <Popup
          message="Campaign Submitted"
          onClose={() => setPopupVisible(false)}
        />
      )}
    </div>
  );
}
