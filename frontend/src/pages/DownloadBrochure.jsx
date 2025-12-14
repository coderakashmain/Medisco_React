import React, { useEffect } from "react";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const DownloadBrochure = () => {
      useEffect(() => {
      window.scrollTo({
        top: 0,
        
      });
    }, []);
  return (
    <div className="sm:pt-100 pt-80 sm:pt-40 pb-80 lg:pt-80 bg-white ">
      <div className="container mx-auto px-4 max-w-5xl text-center">

        {/* Heading */}
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-black mb-8">
          Download Our Brochures
        </h1>
        <p className="text-gary mb-20 text-md">
          Access MediscoPluss brochures to learn more about our services & benefits.
        </p>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-10 mt-10">

          {/* Website Brochure */}
          <div
            className=" p-5 rounded-lg hover:shadow-md transition"
            style={{ borderRadius: "8px" }}
          >
            <PictureAsPdfOutlinedIcon className="text-primary mx-auto mb-10" style={{ fontSize: 45 }} />
            <h2 className="text-black font-semibold text-lg mb-2">MediscoPluss Brochure</h2>
            <p className="text-gary mb-20 text-sm">
              Full details of MediscoPluss services & card benefits.
            </p>
            <a
              href="https://medisco.in/documents/MeDiScoPluSSInstitutionalBenefitsGuide.pdf"
              target="_blank"
              download
              className="btn  mx-auto"
            >
              <span className="flex items-center gap-2 justify-center">
                <DownloadOutlinedIcon /> Download
              </span>
            </a>
          </div>

          {/* Hiring Brochure */}
          <div
            className=" p-5 rounded-lg hover:shadow-md transition"
            style={{ borderRadius: "8px" }}
          >
            <PictureAsPdfOutlinedIcon className="text-primary mx-auto mb-10" style={{ fontSize: 45 }} />
            <h2 className="text-black font-semibold text-lg mb-2">Hiring Brochure</h2>
            <p className="text-gary mb-20 text-sm">
              Information for hiring, onboarding & business collaboration.
            </p>
            <a
              href="https://medisco.in/documents/Hiring.pdf" 
              target="_blank"
              download
              className="btn mx-auto"
            
            >
              <span className="flex items-center gap-2 justify-center">
                <DownloadOutlinedIcon /> Download
              </span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DownloadBrochure;
