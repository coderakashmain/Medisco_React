import React, { useEffect } from "react";

const BusinessPartnerPolicy = () => {
    useEffect(() => {
    window.scrollTo({
      top: 0,
      
    });
  }, []);
  return (
    <div className="sm:pt-100 pt-80 sm:pt-40 pb-30 lg:pt-80 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Page Heading */}
        <div style={{ marginBottom: 30, padding : '13px' }} className="text-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-black mb-5">
            <span className="text-primary">MediscoPluss</span> – Business Partner Policy
          </h1>
          <p className="text-gary text-sm md:text-md">
            Roles, responsibilities and operational guidelines for 
            <span className="text-primary font-semibold"> BPs</span> & 
            <span className="text-primary font-semibold"> BDOs</span>.
          </p>
        </div>

        {/* Intro Box */}
        <div
          style={{ borderRadius: "8px" , padding : '10px' }}
          className="border border-lightgary p-5 mb-20"
        >
          <p className="text-gary leading-relaxed">
            This policy defines the roles, responsibilities, commissions and operational
            guidelines for 
            <span className="font-semibold text-primary"> Business Partners (BP)</span> 
            and 
            <span className="font-semibold text-primary"> Business Development Officers (BDO)</span>
            associated with 
            <span className="text-primary font-semibold"> MediscoPluss</span>.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Objective of the <span className="text-primary">Program</span>
          </h2>

          <p className="text-gary leading-relaxed">
            The objective is to promote 
            <span className="text-primary font-semibold"> MediscoPluss</span> Medical Discount Cards through 
            authorized network partners, helping customers access affordable 
            healthcare benefits across India.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
            Roles <span className="text-primary">Defined</span>
          </h2>

          <div className="text-gary space-y-5">
            <div>
              <h3 className="text-black font-semibold mb-2">
                Business Partner (<span className="text-primary">BP</span>)
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Authorized to enroll customers directly.</li>
                <li>Can appoint and manage Business Development Officers under them.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-2">
                Business Development Officer (<span className="text-primary">BDO</span>)
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Works under a registered Business Partner.</li>
                <li>Authorized to promote and assist in customer enrollment.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 - Commission */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Payment of <span className="text-primary">Commissions</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Commissions are released weekly or monthly based on company payout cycle.</li>
            <li>Commission is valid only for successfully activated memberships.</li>
            <li>Commissions may be withheld for:</li>
          </ul>

          <ul className="text-gary list-disc pl-12 space-y-2 mt-3">
            <li>Cancelled or failed transactions</li>
            <li>Fraudulent or disputed enrollments</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Responsibilities of <span className="text-primary">Partners</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Promote <span className="text-primary font-semibold">MediscoPluss</span> ethically and professionally.</li>
            <li>Provide accurate information to customers.</li>
            <li>Follow company-approved pricing without changes.</li>
            <li>Collect accurate customer documents and details.</li>
            <li>Maintain confidentiality of all customer data.</li>
            <li>Support customers for activation and service queries.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Code of <span className="text-primary">Conduct</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Do not misrepresent <span className="text-primary font-semibold">MediscoPluss</span> as insurance or medical provider.</li>
            <li>Do not promise guaranteed treatment outcomes.</li>
            <li>Do not engage in fraud, fake discounts or false commitments.</li>
            <li>Do not force or mislead customers into purchasing.</li>
            <li>Do not share login access without company permission.</li>
          </ul>

          <p className="text-gary mt-4 font-semibold">
            Violation of these rules may lead to immediate <span className="text-primary">termination</span> without commission rights.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Branding & <span className="text-primary">Promotion</span> Guidelines
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Use only company-approved promotional materials.</li>
            <li>Custom advertisements require written approval.</li>
            <li>Digital promotions must maintain brand dignity.</li>
            <li>Misuse of logo/name may lead to legal action.</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
            Account <span className="text-primary">Termination & Suspension</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Partnership may be terminated for rule violations.</li>
            <li>Fraud-related commissions may be withheld.</li>
            <li>Inactive partners may be removed after review.</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
            Non-Disclosure & <span className="text-primary">Data Protection</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Customer data must remain confidential.</li>
            <li>Partners must comply with <span className="text-primary font-semibold">MediscoPluss</span> Data Security & Privacy Policy.</li>
          </ul>
        </div>

        {/* Section 9 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
            Legal <span className="text-primary">Compliance</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Partners must follow applicable Indian laws and tax regulations.</li>
            <li>Company policies and updates must be strictly followed.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="border-t border-lightgary pt-6 mt-10 text-center">
          <p className="text-gary text-sm mt-5">
            Last updated: 2025 • 
            <span className="text-primary font-semibold"> MediscoPluss</span> Partner Relations Department
          </p>
        </div>

      </div>
    </div>
  );
};

export default BusinessPartnerPolicy;
