import React, { useState } from "react";
import { updateSpecialization } from "../../APIs/updateSpecialization";
import { useUserDataContext } from "../../Context/Userdata";
import { useSnackbar } from "../../Context/SnackbarContext";
import { getSpecializationByService } from "../../APIs/getSpecializationByService";

const UpdateSpecialization = React.memo(
    ({ setUpdateSpecialization, specializationList }) => {
        const { setSnackbar } = useSnackbar();
        const { profileDetails, userdata,fetchProfile } = useUserDataContext();
        // Pre-select already chosen specializations
        const [selected, setSelected] = useState(
            profileDetails?.data?.specialization?.map(item => item.specialized_id) || []
        );

        const [loading, setLoading] = useState(false);


        const handleToggle = (id) => {
            setSelected(prev =>
                prev.includes(id)
                    ? prev.filter(item => item !== id)
                    : [...prev, id]
            );
        };

         

        // Submit API
        const handleSubmit = async () => {
            try {
                setLoading(true);

                const res = await updateSpecialization(userdata?.token, selected);

               
                setSnackbar({ open: true, message: 'Specialization updated.', type: 'success' })
                setUpdateSpecialization(false);
               fetchProfile();
                
            } catch (error) {
                console.error("Failed:", error.message);
                setSnackbar({open : true, message : error.message , type : 'error'})
            } finally {
                setLoading(false);
            }
        };

        return (
            <section className="h-full w-full p-20 pb-40 sm:p-10">

                {/* Header */}
                <div className="flex justify-between items-center mb-20">
                    <h3 className="font-semibold text-primary text-lg">Update Specialization</h3>
                    <button
                        onClick={() => setUpdateSpecialization(false)}
                        className="close-btn"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Specialization List */}
                <div style={{ gap: 10 }} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    {specializationList.map((item) => (
                        <label
                            key={item.specialized_id}
                            style={{ gap: 5 }}
                            className={`border border-lightgary p-3 py-5 rounded cursor-pointer flex items-start 
              ${selected.includes(item.specialized_id) ? "border-primary bg-blue-50" : "border-gray-300"}`}
                        >
                            <input
                                type="checkbox"
                              
                                checked={selected.includes(item.specialized_id)}
                                onChange={() => handleToggle(item.specialized_id)}
                            />
                            <div>
                                <h4 className="text-sm font-semibold">{item.name}</h4>
                                <p
                                    className="text-xs text-gray-500"
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                ></p>
                            </div>
                        </label>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-20 gap-5">
                    <button
                        onClick={() => setUpdateSpecialization(false)}
                        className="px-10 py-5 border rounded border-lightgary text-gray-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{ opacity: loading ? '0.5' : '' }}
                        className="px-10 py-5 rounded bg-primary text-white font-medium cursor-pointer"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </section>
        );
    }
);

export default UpdateSpecialization;
