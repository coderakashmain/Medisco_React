import React from "react";

const Terms = () => {
  return (
    <div className="sm:pt-100 pt-80 sm:pt-40 pb-30 lg:pt-80 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Page Heading */}
        <div style={{ marginBottom: 30 }} className="text-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-black mb-3">
            <span className="text-primary">MediscoPluss</span> – Terms & Conditions
          </h1>
          <p className="text-gary text-sm md:text-md">
            Please read carefully before using our <span className="text-primary">services</span>.
          </p>
        </div>

        {/* Intro Box */}
        <div
          style={{ borderRadius: "8px", padding: "13px" }}
          className="border border-lightgary p-5 mb-20"
        >
          <p className="text-gary leading-relaxed">
            Welcome to <span className="font-semibold text-primary">MediscoPluss</span>. 
            By accessing or using our website, mobile application, or services, you agree 
            to these <span className="text-primary font-semibold">Terms & Conditions</span>. 
            If you do not accept these terms, please do not use our services.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
            About <span className="text-primary">MediscoPluss</span>
          </h2>

          <p className="text-gary mb-4">
            <span className="text-primary font-semibold">MediscoPluss</span> is a membership-based healthcare discount program that provides 
            eligible members with discounts on selected healthcare services through our 
            authorized partners:
          </p>

          <ul className="text-gary list-disc pl-6 space-y-2">
            <li>Hospitals</li>
            <li>Doctors & Clinics</li>
            <li>Medical Stores & Diagnostic Centers</li>
            <li>Wellness & Ayurvedic Centers</li>
          </ul>

          <p className="text-gary mt-4">
            - MediscoPluss is <span className="font-semibold text-primary">not insurance</span> 
            and does not guarantee medical outcomes.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
            Membership & <span className="text-primary">Eligibility</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Subscription fees must be paid in full to activate the membership card.</li>
            <li>Membership is valid for 1 year from the date of activation.</li>
            <li>Membership benefits are non-transferable.</li>
            <li>
              Members must present a valid <span className="text-primary font-semibold">MediscoPluss</span> ID / digital card before availing services.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
            Partner Services & <span className="text-primary">Discounts</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Discounts may vary by partner and can change without prior notice.</li>
            <li>
              <span className="text-primary font-semibold">MediscoPluss</span> does not control the quality, pricing, or behavior of healthcare partners.
            </li>
            <li>Any service-related disputes must be handled directly with the service provider.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
            Payments & <span className="text-primary">Fees</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Membership fees once paid are non-refundable (except technical errors).</li>
            <li>All promotional offers and pricing are subject to change.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
            Member <span className="text-primary">Responsibilities</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Provide accurate and complete registration information.</li>
            <li>Do not misuse or share login credentials.</li>
            <li>Follow rules of partner medical institutions.</li>
            <li>Report lost or stolen cards immediately.</li>
          </ul>

          <p className="text-gary mt-4">
            Misuse of services may lead to account suspension or termination.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
            <span className="text-primary">Data</span> Privacy & Security
          </h2>

          <p className="text-gary leading-relaxed">
            We collect and process user data as outlined in our Data Security & Privacy Policy.
            By using <span className="text-primary font-semibold">MediscoPluss</span> services, you consent to the processing of your personal data.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
            Limitations & <span className="text-primary">Liabilities</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>We are not responsible for medical treatment, diagnosis, or prescriptions.</li>
            <li>We do not guarantee partner availability or performance.</li>
            <li>We are not liable for indirect or consequential damages.</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             Modification of <span className="text-primary">Terms</span>
          </h2>

          <p className="text-gary leading-relaxed">
            <span className="text-primary font-semibold">MediscoPluss</span> reserves the right to modify or update these Terms & Conditions at any time.
            Changes will be published on our website or mobile application.
          </p>
        </div>

        {/* Section 9 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
            Account <span className="text-primary">Termination</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Fraudulent activity is detected</li>
            <li>Violation of terms</li>
            <li>Unauthorized or abusive usage</li>
          </ul>

          <p className="text-gary mt-4">
            No refunds will be issued in such cases.
          </p>
        </div>

        {/* Section 10 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-4">
             Governing <span className="text-primary">Law</span>
          </h2>

          <p className="text-gary leading-relaxed">
            These Terms & Conditions shall be governed and interpreted according to the laws of India.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-lightgary pt-6 mt-10 text-center">
          <p className="text-gary text-sm">
            Last updated: 2025 • <span className="text-primary font-semibold">MediscoPluss</span> Legal Team
          </p>
        </div>

      </div>
    </div>
  );
};

export default Terms;
