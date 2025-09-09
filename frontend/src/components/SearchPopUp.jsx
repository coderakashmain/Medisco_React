import React from 'react'

const SearchPopUp = () => {
  return (
      <div className="search-popup">
            <button className="close-search"><i className="fa-solid fa-xmark"></i></button>
            
            <form method="post" action="#">
              <div className="form-group relative  overflow-hidden rounded">
                <input
                  type="search"
                  name="search-field"
                  value=""
                  placeholder="Search Here"
                  required=""
                  className="placeholder:text-black"
                />
                <button type="submit"><i className="fa fa-search"></i></button>
              </div>
              <div className="form-group relative overflow-hidden mt-5 rounded">
                <input
                  type="search"
                  name="search-field"
                  value=""
                  placeholder="Search Here"
                  required=""
                  className="placeholder:text-black"
                />
                <button type="submit"><i className="fa fa-search"></i></button>
              </div>
              <div className="form-group relative overflow-hidden mt-5 rounded">
                <input
                  type="search"
                  name="search-field"
                  value=""
                  placeholder="Search Here"
                  required=""
                  className="placeholder:text-black"
                />
                <button type="submit"><i className="fa fa-search"></i></button>
              </div>
            </form>
          </div> 
  )
}

export default SearchPopUp
