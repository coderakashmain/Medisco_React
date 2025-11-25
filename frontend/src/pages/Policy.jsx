import React, { useEffect } from "react";

const Policy = () => {
   useEffect(() => {
   window.scrollTo({
     top: 0,
     
   });
 }, []);
 
  return (
    <div className="sm:pt-100 pt-80 sm:pt-40 pb-30 lg:pt-80 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Page Heading */}
        <div style={{marginBottom : 30}} className="text-center mb-12">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-black mb-3">
            <span className="text-primary">MediscoPluss</span> Data Security Policy
          </h1>
          <p className="text-gary text-sm md:text-md ">
            Your <span className="text-primary">data privacy</span>, security, and trust are our priority.
          </p>
        </div>

        {/* Introduction */}
        <div style={{borderRadius : '8px', padding : '13px'}} className="border border-lightgary mb-20">
          <p className="text-gary leading-relaxed">
            At <span className="font-semibold text-primary">MediscoPluss</span>, we are committed 
            to protecting the privacy, confidentiality, and security of the personal information 
            entrusted to us. This <span className="text-primary font-semibold">Data Security Policy</span> 
            explains how we safeguard the data shared through our website and mobile application.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             Information We <span className="text-primary">Collect</span>
          </h2>

          <ul className="space-y-3 text-gary list-disc pl-6">
            <li>Name, contact details, and demographic information</li>
            <li>Health-related service preferences (optional)</li>
            <li>Identification documents provided for verification</li>
            <li>Transaction history for card usage and benefits</li>
            <li>Device and app usage data (for performance and improvement)</li>
          </ul>

          <p className="text-gary mt-4">
            We do not collect or store sensitive medical records without explicit consent.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             How We <span className="text-primary">Use</span> Your Information
          </h2>

          <ul className="space-y-3 text-gary list-disc pl-6">
            <li>Creating and managing your <span className="text-primary">MediscoPluss</span> membership</li>
            <li>Providing discounts and services through authorized partners</li>
            <li>Customer support and app performance improvement</li>
            <li>Regulatory compliance and fraud prevention</li>
          </ul>

          <p className="text-gary mt-4">
            We never sell or share your personal data for marketing without consent.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             <span className="text-primary">Data</span> Security Measures
          </h2>

          <ul className="space-y-3 text-gary list-disc pl-6">
            <li>End-to-end encryption (HTTPS & SSL/TLS)</li>
            <li>Encrypted storage of personal information</li>
            <li>Role-based access control for authorized staff only</li>
            <li>Regular security audits and vulnerability checks</li>
            <li>Secure servers at certified data centers</li>
          </ul>

          <p className="text-gary mt-4">
            We continuously upgrade our systems to protect against unauthorized access, misuse, loss, or alteration.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             Data Sharing & <span className="text-primary">Third Parties</span>
          </h2>

          <ul className="space-y-3 text-gary list-disc pl-6">
            <li>Verified healthcare and service partners (only required data)</li>
            <li>Law enforcement or regulatory bodies when legally required</li>
          </ul>

          <p className="text-gary mt-4">
            All third parties must follow strict confidentiality and security standards.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             <span className="text-primary">Data</span> Retention
          </h2>

          <p className="text-gary leading-relaxed">
            We retain your data only as long as necessary to provide services and meet legal 
            or regulatory requirements. Users can request data deletion as per applicable law.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             Your <span className="text-primary">Rights</span>
          </h2>

          <ul className="space-y-3 text-gary list-disc pl-6">
            <li>Access, update, or correct your information</li>
            <li>Withdraw consent for communications</li>
            <li>Request account and data deletion</li>
          </ul>

          <p className="text-gary mt-4">
            Requests can be submitted through our official support channels.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             Updates to This <span className="text-primary">Policy</span>
          </h2>

          <p className="text-gary leading-relaxed">
            We may update this policy from time to time as we strengthen our security practices. 
            All updates will be clearly posted on our website and mobile application.
          </p>
        </div>

        {/* Footer Note */}
        <div className="border-t border-lightgary pt-6 mt-10 text-center">
          <p className="text-gary text-sm">
            Last updated: 2025 • <span className="text-primary font-semibold">MediscoPluss</span> Data Security & Privacy Team
          </p>
        </div>

      </div>
    </div>
  );
};

export default Policy;
