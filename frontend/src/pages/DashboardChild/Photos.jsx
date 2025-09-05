import React, { useRef } from 'react'
import './Photos.css'
import { useUserDataContext } from '../../Context/Userdata'
import Pagination from '../../components/Pagination'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import NotFound from '../NotFound'
import FallbackLoader from '../../components/FallbackLoader'

const Photos = () => {
  const photoboxRef = useRef();
  const { userdata, profileLoading, profileDetails } = useUserDataContext();

  if (profileLoading) {
    return <FallbackLoader />;
  }
  if (!profileDetails) {
    return <NotFound />;
  }
 
  return (
    <section className='h-full w-full  p-20 pb-40 sm:p-10 ' ref={photoboxRef}>

      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold text-secondary'>Photo Gallery</h2>
        <button className='button bg-primary  font-semibold rounded py-5 px-15 text-white text-sm cursor-pointer text-nowrap flex items-center gap-5'>
          <FileUploadIcon className='mr-2' />
          Upload Photo
        </button>
      </div>

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
                    <img loading='lazy' className='' src={photo} alt={`dashbord-img-${index}`} />
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
