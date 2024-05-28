import React from "react";

export default function Footer() {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "support@cryptoking.com",
    "info@example.com",
    "Contact us",
  ];

  const usefullLink = ["Home", "About Us", "Company Bio"];
  return (
    <footer className="text-center text-white backgroundMain lg:text-left">
      <div className="backgroundMain p-32 text-center">
        <span>HughieFund @2024 - Tugas Akhir</span>
      </div>
    </footer>
  );
}
