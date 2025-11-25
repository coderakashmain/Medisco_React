import React, { useEffect } from "react";

const About = () => {

  useEffect(() => {
  window.scrollTo({
    top: 0,
    
  });
}, []);
  return (
    <div className="sm:pt-100 pt-80 sm:pt-40 pb-80 lg:pt-80 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Heading */}
        <div  style={{marginBottom : 30}} className="text-center ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
             About <span className="text-primary">Mediscopluss</span>
          </h1>
          <p className=" text-sm md:text-md text-gary italic">
            “Affordable Health for Every Home”
          </p>
        </div>

        {/* About Content */}
        <div className="space-y-8 text-gary leading-relaxed">

          <p>
            <strong className="text-primary">Mediscopluss (Medical Discount Card Network)</strong> 
            is a social initiative designed to make healthcare more accessible, affordable, 
            and transparent for everyone. Our goal is to build a strong network connecting 
            patients, hospitals, diagnostic centers, pharmacies, and charitable organizations 
            under one platform.
          </p>

          <p>
            Through the <strong>Mediscopluss Discount Card</strong>, members can avail special 
            discounts and offers on hospital services, diagnostic tests, and medicines 
            at partner healthcare centers across various cities and towns.
          </p>

          <p>
            Beyond discounts, Mediscopluss acts as an information bridge, helping people find 
            free or concessional medical services offered by charitable hospitals, trusts, 
            and Section 8 companies.
          </p>

        </div>

        {/* Learn More Section */}
        <div className="mt-30">
          <h2 className="text-2xl font-bold text-black mb-10">
            Why Choose <span className="text-primary">Mediscopluss?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gary">
            {[
              "We make healthcare more affordable.",
              "We connect you to trusted medical care.",
              "We help you save on every treatment.",
              "We make medical services easier to access.",
              "We reduce your healthcare expenses.",
              "We guide you toward better, affordable care.",
              "We simplify your healthcare journey.",
              "We help families access essential care.",
              "We make health savings simple for you.",
              "We ensure your care is affordable and transparent.",
              "We help you access discounted medical services."
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <span className="text-primary text-lg">✔ </span>
                <p> - {item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-black mb-6">
             Our Objectives
          </h2>

          <div style={{gap: 6 , marginTop : '10px'}} className="grid md:grid-cols-3 gap-6 text-gary">

            {[
              {
                title: "Affordable Healthcare Access",
                text: "Ensure everyone can access discounted healthcare services near them."
              },
              {
                title: "Healthcare Information Channel",
                text: "Create a reliable network for accessing free or concessional medical services."
              },
              {
                title: "Employment Generation",
                text: "Create job opportunities in healthcare and supporting service sectors."
              },
              {
                title: "Medical Business Growth",
                text: "Support new medical shops, diagnostic centers, and hospitals."
              },
              {
                title: "CSR & Charity Promotion",
                text: "Promote CSR initiatives and charitable healthcare services."
              },
              {
                title: "Claim Assistance",
                text: "Help people understand and complete medical insurance claims smoothly."
              }
            ].map((obj, index) => (
              <div
                key={index}
                style={{borderRadius : '8px', padding : '13px'}}
                className="border border-lightgary p-4  hover:border-primary transition"
              >
                <h3 className="font-semibold text-primary mb-2">
                  {obj.title}
                </h3>
                <p>{obj.text}</p>
              </div>
            ))}
          </div>
        </div>

        
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-black mb-6">
            How Mediscopluss Works
          </h2>

          <div className="grid md:grid-cols-3 mt-10 gap-8">

            {/* Service Providers */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Service Providers
              </h3>
              <p className="text-gary">
                Hospitals, diagnostic centers, pharmacies, and charitable organizations 
                join Mediscopluss and offer special discounts or concessional healthcare 
                services to cardholders.
              </p>
            </div>

            {/* Customers */}
            <div className="bg-gray-50 mt-5 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Customers
              </h3>
              <p className="text-gary">
                Individuals register for the Mediscopluss membership and use their 
                digital or physical card to receive discounts on treatments, 
                tests, and medicines.
              </p>
            </div>

            {/* Channels */}
            <div className="bg-gray-50 mt-5 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Providing Channels
              </h3>
              <p className="text-gary">
                Mediscopluss works through a web/app platform and a physical discount 
                card for easy access to healthcare benefits.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
