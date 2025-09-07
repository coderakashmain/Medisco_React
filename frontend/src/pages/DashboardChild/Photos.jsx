import React, { Suspense, useRef, useState } from 'react'
import './Photos.css'
import { useUserDataContext } from '../../Context/Userdata'
import Pagination from '../../components/Pagination'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import NotFound from '../NotFound'
import FallbackLoader from '../../components/FallbackLoader'
import PopUp from '../../components/PopUp';
import { UploadPhoto } from '../../APIs/UploadPhoto';
import { SavePhoto } from '../../APIs/SavePhoto';
import { useScreen } from '../../Context/ScreenProvider';
import { useSnackbar } from '../../Context/SnackbarContext';

const Photos = () => {
  const photoboxRef = useRef();
  const fileInputRef = useRef();
  const {setSnackbar} = useSnackbar();
  const { userdata, profileLoading, profileDetails, setProfileDetails } = useUserDataContext();
  const [imagePopUp, setImagePopUp] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [saveState, setSaveState] = useState(false);
  const [imagePath, setImagePath] = useState([])
   const {isMobile} = useScreen();
  



  // console.log(profileDetails)

  if (profileLoading) {
    return <FallbackLoader />;
  }
  if (!profileDetails) {
    return <NotFound />;
  }


  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFiles(file);
  };

  const handleSubmit = async () => {
    if (!selectedFiles) return     setSnackbar({open : true ,message : 'Please select an image first',type : 'warning'});





    setUploading(true);

    try {
      const res = await UploadPhoto(userdata?.token, selectedFiles, "service");
      setImagePath(prev => [...prev, res.data]);

      setSaveState(true);
      

    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {


    setUploading(true)
    try {
      const updatedImages = [...profileDetails.data.images, ...imagePath];
      const res = await SavePhoto(userdata?.token, updatedImages);
      
      setProfileDetails(prev => ({
        ...prev,
        data: {
          ...prev.data,
          images: [...prev.data.images, imagePath],
        }
      }));
        setSnackbar({open : true,message : 'Photo Upload Successfully.',type : 'success'})
     
      setImagePath([]);
      setImagePopUp(false);
      setSaveState(false);
      setSelectedFiles(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }

  }


  return (
    <section className='h-full w-full  p-20 pb-40 sm:p-10 ' ref={photoboxRef}>

      <div className='flex justify-between items-center'>
        <h2 className='text-2xl max-sm:text-md font-semibold text-secondary'>Photo Gallery</h2>
        <button onClick={() => setImagePopUp(true)} className={`button bg-primary items-center  font-semibold rounded  ${isMobile ? 'text-xs px-5 py-5' : 'py-5 px-15'} text-white text-sm cursor-pointer text-nowrap flex items-center gap-5`}>
          <FileUploadIcon className='mr-2' />
          Upload Photo
        </button>
      </div>


      {imagePopUp && (<Suspense fallback={<FallbackLoader fixed={true} />}>
        <PopUp>
          <div className={`photo-popup  relative md:w-[80%] lg:w-[80%] w-full p-20  bg-white shadow ${isMobile ? "max-h-[80vh]" : 'max-h-[90vh]'} h-[80vh]  rounded-[10px] overflow-auto`}>

            <div className=' border border-dashed border-lightgary h-full flex items-center justify-center flex-col  rounded  gap-10 text-secondary relative'>
              <button onClick={() => {
                setImagePath([]);
                setSaveState(false);
                setSelectedFiles(null);
                setImagePopUp(false)
              }} style={{ transform: 'translateY(-32%)' }} className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
              {selectedFiles ? (
                <div style={{ height: '6rem', width: '5rem' }} className='p-2 border rounded'>
                  <img
                    src={URL.createObjectURL(selectedFiles)}
                    style={{ height: '6rem', width: '5rem' }}
                    alt="preview"
                    className='h-40 w-40 object-cover'
                  />
                </div>

              ) : (<>

                <span className='p-20 rounded-full border border-lightgary'><FileUploadIcon className='text-primary ' sx={{ height: 40, width: 40 }} /></span>
                <h2 className='  text-xl  text-secondary text-gary mt-30'>Drag Image here to Upload</h2>
              </>)}
              <p className='text-sm text-gary text-center'>First  images Should be logo , Then other Gallary  image</p>

              <div className='flex gap-10'>
                {saveState ? (
                  <button
                    onClick={handleSave}
                    className={`bg-primary rounded text-white px-10 py-5 cursor-pointer mt-10 ${uploading ? 'opacity-50' : ''}`}>{uploading ? 'Saving..' :'Save'}</button>
                ) :
                  (
                    <>
                      <button
                        onClick={() => fileInputRef.current.click()}
                        className={`bg-primary rounded text-white px-10 py-5 cursor-pointer mt-10 ${selectedFiles ? 'opacity-50' : ''}`}>Choose Here</button>
                      {selectedFiles && (<button
                        onClick={handleSubmit}
                        className={`bg-primary rounded text-white px-10 py-5 cursor-pointer mt-10 ${uploading ? 'opacity-50' : ''}`}>{uploading ? "Confirming..." :"Confirm"}</button>)}
                    </>

                  )}


              </div>
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileSelect}
              hidden
            />
          </div>

        </PopUp>
      </Suspense>)}





      <div className='dashboard-gallary mt-40 ' id='photo-box'>
        <Pagination
          DataList={profileDetails.data.images}
          limit={12}
          targateRef={photoboxRef}
        >
          {(currentItems) => (
            <ul className='flex gap-10 '>
              {currentItems.length > 0 ?

                (currentItems.map((photo, index) => (
                  <li className='rounded overflow-hidden cursor-pointer ' key={index}>
                    <img loading='lazy' className='' src={`https://api.medisco.in/${photo}`} alt={`dashbord-img-${index}`} />
                  </li>
                )))
                :

                (
                  <p className='text-center m-auto'>No Photos in Gallary</p>
                )}
            </ul>
          )}

        </Pagination>

      </div>

    </section>
  )
}

export default Photos
