import React from 'react'
import './Photos.css'
import photo1 from '../../assets/img/portfolio-1.jpg'
import photo2 from '../../assets/img/portfolio-2.jpg'
import photo3 from '../../assets/img/portfolio-3.jpg'
import photo4 from '../../assets/img/portfolio-4.jpg'
import photo5 from '../../assets/img/portfolio-5.jpg'

const Photos = () => {

  const photoes = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
  ]
  return (
    <section className='h-full w-full  p-20 pb-40 sm:p-10'>
      
      <div  className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold text-secondary'>Photo Gallery</h2>
          <button className='button bg-primary rounded py-5 px-24 text-white text-sm cursor-pointer text-nowrap flex items-center gap-5'>
            Upload Photo
          </button>
      </div>

      <div className='dashboard-gallary mt-40'>
        <ul className='flex gap-10 '>
        {photoes.length > 0 ? 
        
         ( photoes.map((photo,index)=>(
              <li className='rounded overflow-hidden' key={index}>
                  <img loading='lazy' src={photo} alt={`dashbord-img-${index}`} />
              </li>
          )))
        :
        
        (
          <li className='text-center'>No Photoes in Galary</li>
        )}
        </ul>

      </div>

    </section>
  )
}

export default Photos
