import React, { useState } from 'react'
import { useUserDataContext } from '../../Context/Userdata'
import { UpdateAboutus } from '../../APIs/UpdateAboutus';
import { useSnackbar } from '../../Context/SnackbarContext';

const UpdateAbout = React.memo(({ setUpdateAbout }) => {
    const { profileDetails, userdata, setProfileDetails } = useUserDataContext();
    const [about, setAbout] = useState(profileDetails?.data?.about || "");
    const [loading, setLoading] = useState(false);
    const { setSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!about) return;
        setLoading(true);
        try {

            const data = await UpdateAboutus(userdata?.token, about);
            setSnackbar({ open: true, message: 'Updated.', type: 'success' })
            setUpdateAbout(false);
            setProfileDetails((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    about: about,   
                },
            }));
        } catch (error) {
            setApiError(error.message);
            setSnackbar({ open: true, message: error.message, type: 'error' })
        } finally {

            setLoading(false);
        }

    }


    return (
        <section className='h-full w-full p-20 pb-40 sm:p-10'>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-primary'>About Service</h3>
                <button
                    onClick={() => setUpdateAbout(false)}
                    className='close-btn  '><i className="fa-solid fa-xmark"></i></button>

            </div>
            <form onSubmit={handleSubmit}>
                <textarea value={about} onChange={(e) => setAbout(e.target.value)} className='w-full  border border-lightgary   outline-none resize-none h-200   rounded mt-30 p-7'>

                </textarea>

                <button type='submit' disabled={loading} style={{ opacity: loading ? '0.5' : '' }} className='rounded px-10 mt-20 mb-10  py-5 bg-primary text-white block float-right  text-sm font-semibold cursor-pointer'>{loading ? "Updating..." : 'Update'}</button>
            </form>

        </section>
    )
})

export default UpdateAbout
