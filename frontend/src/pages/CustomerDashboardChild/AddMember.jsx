import React, { lazy, useRef, useState } from "react";
import PopUp from "../../components/PopUp";
import { addFamilyMember } from '../../APIs/AddFamilyMemberApi'
import { useSnackbar } from "../../Context/SnackbarContext";
import { useScreen } from "../../Context/ScreenProvider";
import { SaveAadhar } from "../../APIs/SaveAadhar";
import { UploadPhoto } from "../../APIs/UploadPhoto";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
const FallbackLoader = lazy(() => import("../../components/FallbackLoader"))

const AddMember = ({ onClose, customerData }) => {
  const { setSnackbar } = useSnackbar();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const { isMobile } = useScreen();
  const fileInputRef = useRef();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    aadhar: "",
    aadhar_photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.dob || !form.aadhar) {
      setSnackbar({ open: true, message: 'Please fill all required fields', type: 'warning' })
      return setError("Please fill all required fields");
    }

    if (form.aadhar.length !== 12) {
      setSnackbar({ open: true, message: 'Aadhaar must be 12 digits', type: 'warning' })
      return setError("Aadhaar must be 12 digits");
    }

    if (!selectedFiles) {
      setSnackbar({ open: true, message: 'Please select a aadhaar photo!', type: 'warning' })
      return;
    }
    try {



      setLoading(true);

      const path = await handlepdfUpload();

      if (!path) {
        setSnackbar({
          open: true,
          message: "File upload failed",
          type: "error",
        });
        return;
      }

      await addFamilyMember(customerData.token, { name: form.name, dob: form.dob, aadhar: form.aadhar, aadhar_photo: path });


      setSelectedFiles(null);
      setForm(prev => ({
        ...prev,
        name: "",
        dob: "",
        aadhar: "",
      }));

      setSnackbar({ open: true, message: "Member added successfully.", type: 'success' })
      onClose();
    } catch (err) {
      setError(err.message);
      setSnackbar({ open: true, message: err.message, type: 'error' })

    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setSnackbar({ open: true, message: "Please select an image file only", type: 'error' })
      e.target.value = "";
      return;
    }

    setSelectedFiles(file);
  };

  const handlepdfUpload = async () => {
    if (!selectedFiles) return;




    try {
      const res = await UploadPhoto(customerData?.token, selectedFiles, "service");



      return res.data;
    } catch (err) {
      console.error(err);
      alert('');
      setSnackbar({ open: true, message: 'Upload failed', type: 'error' });
    } finally {

    }
  };

  // const saveAadhar = async (path) => {

  //   await SaveAadhar(customerData.token, path);
  // }



  return (
    // <PopUp>
    //   <div style={{ width: isMobile ? "100%" : '420px' }} className=" bg-white rounded shadow-lg p-20  sm:p-10 relative">

    //     {/* Header */}
    //     <div className="flex justify-between items-center mb-10">
    //       <h2 className="text-lg font-semibold text-gray-800">
    //         Add Family Member
    //       </h2>

    //       <button onClick={onClose} className="close-btn"><i className="fa-solid fa-xmark"></i></button>
    //     </div>

    //     {/* Error */}


    //     {/* Form */}
    //     <form onSubmit={handleSubmit} className="space-y-4">

    //       {/* Name */}
    //       <div className="mb-10">
    //         <label style={{ marginBottom: 2 }} className="block text-sm text-gray-500 mb-2">
    //           Full Name *
    //         </label>
    //         <input
    //           type="text"
    //           name="name"
    //           value={form.name}
    //           onChange={handleChange}
    //           className="w-full border border-lightgary outline-none rounded px-10 py-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Enter full name"
    //         />
    //       </div>

    //       {/* DOB */}
    //       <div className="mb-10">
    //         <label style={{ marginBottom: 2 }} className="block text-sm text-gray-500 mb-1">
    //           Date of Birth *
    //         </label>
    //         <input
    //           type="date"
    //           name="dob"
    //           value={form.dob}
    //           onChange={handleChange}
    //           className="w-full border border-lightgary rounded px-10 py-10 outline-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //       </div>

    //       {/* Aadhaar */}
    //       <div className="mb-10">
    //         <label style={{ marginBottom: 2 }} className="block text-sm text-gray-500 mb-1">
    //           Aadhaar Number *
    //         </label>
    //         <input
    //           type="text"
    //           name="aadhar"
    //           value={form.aadhar}
    //           onChange={handleChange}
    //           maxLength={12}
    //           className="w-full border border-lightgary rounded px-10 py-10 outline-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="12 digit Aadhaar"
    //         />
    //       </div>

    //       {/* Aadhaar Photo Path */}
    //       <div className="mb-10">
    //         <label style={{ marginBottom: 2 }} className="block text-sm text-gray-500 mb-1">
    //           Aadhaar Photo
    //         </label>
    //         <button className="px-10 py-5 bg-[#F4F4FF] rounded text-primary border border-lightgary w-full" onClick={(e) => {
    //           e.preventDefault();
    //           fileInputRef.current.click()
    //         }}>
    //           <FileUploadOutlinedIcon />
    //         </button>
    //         {selectedFiles && (<p className="text-xs">{selectedFiles?.name}</p>)}
    //         <input
    //           ref={fileInputRef}
    //           type='file'
    //           accept='image/*'
    //           className='hidden'
    //           onChange={handleFileSelect}
    //         />
    //       </div>

    //       {/* Actions */}
    //       <div className="flex justify-end gap-5 mt-15">
    //         {/* <button
    //           type="button"
    //           onClick={onClose}
    //           className="px-5 py-5  text-sm rounded border border-lightgary cursor-pointer text-gray-600 hover:bg-gray-100"
    //         >
    //           Cancel
    //         </button> */}

    //         <button
    //           type="submit"
    //           disabled={loading}
    //           className="px-10 py-5 font-semibold text-sm rounded  cursor-pointer active bg-primary text-white hover:bg-blue-700 disabled:opacity-60"
    //         >
    //           {loading ? "Saving..." : "Add Member"}
    //         </button>
    //       </div>

    //     </form>
    //   </div>
    //   {loading && <FallbackLoader fixed={true} />}
    // </PopUp>
    <PopUp>
      <div
        style={{
          width: isMobile ? "100%" : "420px",
          borderRadius: "14px",
          padding: "22px",
          background: "#ffffff",
          boxShadow: "0 20px 45px rgba(0,0,0,0.18)",
        }}
        className="relative select-none"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-15">
          <div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#1F2937",
              }}
            >
              Add Family Member
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#6B7280",
                marginTop: "2px",
              }}
            >
              Enter member details carefully
            </p>
          </div>

          <button
            onClick={onClose}
            // style={{
            //   width: "30px",
            //   height: "30px",
            //   borderRadius: "50%",
            //   background: "#F3F4F6",
            //   color: "#374151",
            // }}
            className="flex items-center justify-center close-btn"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                fontSize: "12px",
                color: "#6B7280",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #D1D5DB",
                fontSize: "13px",
              }}
            />
          </div>

          {/* DOB */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", color: "#6B7280" }}>
              Date of Birth *
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #D1D5DB",
                fontSize: "13px",
                marginTop: "4px",
              }}
            />
          </div>

          {/* Aadhaar */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", color: "#6B7280" }}>
              Aadhaar Number *
            </label>
            <input
              type="text"
              name="aadhar"
              value={form.aadhar}
              onChange={handleChange}
              maxLength={12}
              placeholder="12 digit Aadhaar"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #D1D5DB",
                fontSize: "13px",
                marginTop: "4px",
              }}
            />
          </div>

          {/* Upload */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", color: "#6B7280" }}>
              Aadhaar Photo
            </label>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              style={{
                marginTop: "6px",
                padding: "10px",
                borderRadius: "8px",
                width: "100%",
                background: "#F4F4FF",
                border: "1px dashed #C7D2FE",
                color: "var(--color-primary)",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <FileUploadOutlinedIcon fontSize="small" />
              Upload Aadhaar Image
            </button>

            {selectedFiles && (
              <p
                style={{
                  fontSize: "11px",
                  marginTop: "4px",
                  color: "#374151",
                }}
              >
                {selectedFiles.name}
              </p>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileSelect}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                background: "var(--color-primary)",
                color: "#fff",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Saving..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>

      {loading && <FallbackLoader fixed />}
    </PopUp>

  );
};

export default AddMember;
