import React from "react";

const RefundPolicy = () => {
  return (
    <div className="sm:pt-100 pt-80 sm:pt-40 pb-30 lg:pt-80 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Page Header */}
        <div style={{ marginBottom: 30 ,padding : '13px' }} className="text-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-black mb-5">
            <span className="text-primary">MediscoPluss</span> – Refund & Cancellation Policy
          </h1>
          <p className="text-gary text-sm md:text-md">
            Please review our <span className="text-primary">refund & cancellation</span> rules carefully.
          </p>
        </div>

        {/* Intro Box */}
        <div
          style={{ borderRadius: "8px", padding : '13px' }}
          className="border border-lightgary p-5 mb-20"
        >
          <p className="text-gary leading-relaxed">
            Thank you for choosing <span className="font-semibold text-primary">MediscoPluss</span>.
            We strive to provide reliable and transparent services to all our members.
            This policy explains the conditions under which <span className="text-primary font-semibold">refunds & cancellations</span>
            are processed for our subscription services.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Subscription <span className="text-primary">Cancellation</span>
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Once a membership is activated, it cannot be canceled for personal reasons.</li>
            <li>The membership remains active until the completion of its 1-year validity.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-6">
            <span className="text-primary">Refund</span> Policy
          </h2>

          <p className="text-gary mb-5">
            Refunds are allowed only under the following conditions:
          </p>

          {/* Refund Table */}
          <div
            style={{ borderRadius: "8px" }}
            className="border border-lightgary overflow-hidden"
          >
            <table className="w-full text-sm text-left text-gary">
              <thead className="bg-gray-50 text-black ">
                <tr>
                  <th className="p-4 border-b border-lightgary">Reason</th>
                  <th className="p-4 border-b border-lightgary">Eligibility</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lightgary">
                  <td className="p-4">Payment deducted but membership not activated</td>
                  <td className="p-4 text-primary font-semibold">Full refund</td>
                </tr>
                <tr className="border-b border-lightgary">
                  <td className="p-4">Duplicate payment for same membership</td>
                  <td className="p-4 text-primary font-semibold">Refund for extra payment</td>
                </tr>
                <tr className="border-b border-lightgary">
                  <td className="p-4">Wrong amount charged due to technical issue</td>
                  <td className="p-4 text-primary font-semibold">Refund of excess amount</td>
                </tr>
                <tr>
                  <td className="p-4">Legal / Regulatory requirement</td>
                  <td className="p-4 text-primary font-semibold">Case-by-case</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Not Eligible */}
          <div className="mt-10">
            <p className="text-gary font-semibold mb-2">
              Refunds will <span className="text-primary">NOT</span> be provided for:
            </p>

            <ul className="text-gary list-disc pl-6 space-y-2">
              <li>Personal dissatisfaction with partner services</li>
              <li>Disputes with service providers</li>
              <li>Misuse of card or violation of terms</li>
              <li>Partial usage of benefits</li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             <span className="text-primary">Refund</span> Process
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li>Refund requests must be submitted within <span className="text-primary font-semibold">7 working days</span>.</li>
            <li>Supporting screenshots or proof may be required.</li>
            <li>
              Refunds will be processed to the original payment method within
              <span className="font-semibold text-primary"> 7–14 working days</span> after approval.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Service <span className="text-primary">Partner</span> Issues
          </h2>

          <ul className="text-gary list-disc pl-6 space-y-3">
            <li><span className="text-primary font-semibold">MediscoPluss</span> is not responsible for partner service delivery or quality.</li>
            <li>We are not liable for financial or service-related disputes.</li>
            <li>All disputes must be resolved directly with the respective service provider.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Account <span className="text-primary">Termination</span> Due to Misuse
          </h2>

          <p className="text-gary leading-relaxed">
            If a membership is terminated due to violation of Terms & Conditions or misuse 
            of services, <span className="text-primary font-semibold">no refund</span> will be provided under any circumstances.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-black mb-5">
             Changes to This <span className="text-primary">Policy</span>
          </h2>

          <p className="text-gary leading-relaxed">
            <span className="text-primary font-semibold">MediscoPluss</span> reserves the right to update this Refund & Cancellation Policy 
            at any time. Any changes will be published on our website or mobile 
            application along with a revised effective date.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-lightgary pt-6 mt-10 text-center">
          <p className="text-gary text-sm mt-5">
            Last updated: 2025 • <span className="text-primary font-semibold">MediscoPluss</span> Support Team
          </p>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;
