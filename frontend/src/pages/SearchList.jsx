import React, { lazy, useState } from 'react'
import { createSearchParams, replace, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useStatesContext } from '../Context/States';
import { useDistrictsContext } from '../Context/Districts';
import photo1card from '../assets/img/photo-1-card.png'

const Loading = lazy(()=> import('../components/Loading'))

const SearchList = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const { statesList } = useStatesContext();
    const { districtsList, setState, districtLoading } = useDistrictsContext();
    const [searchData, setSearchData] = useState({
        state: '',
        district: '',
        service: ''
    })




    return (
        <div className="pt-100 bg-[#F4F4FF] ">

            <div className="container">


                <section className="lg:pt-60 md:pt-50 pt-50" id="search-space-search-result ">

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(
                            {
                                pathname :  "/search_result",
                              search: `?${createSearchParams(searchData)}`
                               
                            },
                            {
                                 replace : true
                            }
                        )
                    }} id="search-form w-[100%] ">
                        <h2
                            className="text-center text-secondary pb-70 xxl:text-6xl xl:text-5xl md:text-4xl sm:text-3xl text-3xl font-extrabold"
                        >
                            Find the Service You Want
                        </h2>
                        <div className='w-full flex flex-row flex-wrap gap-10'>


                            <div
                                className="search-form-box flex  m-auto   flex-row w-[50%] justify-center flex-nowrap align-center gap-20 "
                            >

                                <div className="border border-lightgary p-7 rounded flex justify-center w-[50%] items-center gap-10 flex-grow md:w-[50%]   ">
                                    <i className="fa-solid fa-location-dot text-gary"></i>
                                    <select name="states" id="states" className='outline-none flex-grow py-5' onChange={(e) => {
                                        setSearchData({ ...searchData, state: e.target.value });
                                        setState(e.target.value)
                                    }} defaultValue={params.get("state")}>
                                        <option  >Search By State</option>
                                        {statesList.status && statesList.data.map((state, index) => (
                                            <option key={index} value={state}>{state}</option>

                                        ))}

                                    </select>

                                </div>
                                <div className="border border-lightgary p-7 rounded flex justify-center w-[50%] items-center gap-10 flex-grow  md:w-[50%] ">
                                    <i className="fa-solid fa-location-dot text-gary"></i>

                                    <select disabled={districtLoading} name="states" id="states" className={`outline-none  py-5 flex-grow ${districtLoading ? 'opacity-50' : ''} `}
                                        onChange={(e) => setSearchData({ ...searchData, district: e.target.value })}
                                        defaultValue={params.get("district")}>
                                        <option  >Search By City</option>
                                        {districtsList.status && districtsList.data.map((district, index) => (
                                            <option key={index} value={district}>{district}</option>

                                        ))}
                                    </select>
                                    {districtLoading && (<Loading size='20px' />)}
                                </div>

                            </div>

                            <div className="flex flex-row w-[45%]  justify-center align-center m-auto   gap-10  rounded  ">
                                <div className="  flex justify-center items-center w-full gap-10 p-10 border border-lightgary flex-grow rounded">
                                    <i className="fa-solid fa-magnifying-glass text-gary"></i>

                                    <input
                                        type="text"
                                        
                                        placeholder="Search By Service"
                                        className=" outline-none flex-grow"
                                         value={searchData.service || params.get("service") || ""} 
                                        onChange={(e) => setSearchData({ ...searchData, service: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="button cursor-pointer bg-primary px-20 py-10 text-white rounded "><i className="fa fa-search"></i>
                                </button>



                            </div>
                        </div>
                    </form>

                </section>

                <div className="pt-30">

                    <h2 className="text-3xl font-bold mb-30 mt-20 text-secondary">Search Results</h2>
                    <div className="search-result-list-box">
                        <ul>
                            <li className="bg-white shadow rounded overflow-hidden  mb-20 h-200">
                                <div className="w-full h-full flex flex-row gap-20 p-10 pr-20 h-full ">
                                    <div className='search-result-left-img-box w-[31%]  rounded overflow-hidden '>
                                        <figure className="overflow-hidden rounded ">
                                            <img
                                                src={photo1card}
                                                alt="img"
                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500 h-full object-cover  object-fill "
                                            />


                                        </figure>
                                    </div>
                                    <div className="search-result-right-content-box w-[60%] ">

                                        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl text: xl font-bold text-secondary  ">Name of The particular Service</h2>



                                        <p className="text-sm  mb-20">Specialist : Multi Specialist</p>
                                        <p className="text-sm mt-10 "><span className="font-bold text-secondary">About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus expedita. Et repellendus fugit quasi in....</p>

                                        <p className=" uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot"></i> D NO : Service Rd, Bhoinagar Basti, Bhoi Nagar, Bhubaneswar, Odisha 751022</p>

                                    </div>
                                    <div className="flex flex-col justify-between h-10">
                                        <p className="text-primary font-semibold text-xs text-end text-nowrap">
                                            Customer Rating <br />
                                            <span className="text-sm pt-10 ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                (540)
                                            </span>
                                        </p>
                                        <button className=" bg-primary button rounded py-10 px-20 cursor-pointer  text-nowrap !text-white">View More</button>
                                    </div>

                                </div>

                            </li>
                            <li className="bg-white shadow rounded overflow-hidden  mb-20 h-200">
                                <div className="w-full h-full flex flex-row gap-20 p-10 pr-20 h-full ">
                                    <div className='search-result-left-img-box w-[31%]  rounded overflow-hidden '>
                                        <figure className="overflow-hidden ">
                                            <img
                                                src={photo1card}
                                                alt="img"
                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500 h-full object-cover  object-fill "
                                            />


                                        </figure>
                                    </div>
                                    <div className="search-result-right-content-box w-[60%] ">

                                        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl text: xl font-bold text-secondary  ">Name of The particular Service</h2>



                                        <p className="text-sm  mb-20">Specialist : Multi Specialist</p>
                                        <p className="text-sm mt-10 "><span className="font-bold text-secondary">About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus expedita. Et repellendus fugit quasi in....</p>

                                        <p className=" uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot"></i> D NO : Service Rd, Bhoinagar Basti, Bhoi Nagar, Bhubaneswar, Odisha 751022</p>

                                    </div>
                                    <div className="flex flex-col justify-between h-10">
                                        <p className="text-primary font-semibold text-xs text-end text-nowrap">
                                            Customer Rating <br />
                                            <span className="text-sm pt-10 ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                (540)
                                            </span>
                                        </p>
                                        <button className=" bg-primary button rounded py-10 px-20 cursor-pointer  text-nowrap !text-white">View More</button>
                                    </div>

                                </div>

                            </li>
                            <li className="bg-white shadow rounded overflow-hidden  mb-20 h-200">
                                <div className="w-full h-full flex flex-row gap-20 p-10 pr-20 h-full ">
                                    <div className='search-result-left-img-box w-[31%]  rounded overflow-hidden '>
                                        <figure className="overflow-hidden ">
                                            <img
                                                src={photo1card}
                                                alt="img"
                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500 h-full object-cover  object-fill "
                                            />


                                        </figure>
                                    </div>
                                    <div className="search-result-right-content-box w-[60%] ">

                                        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl text: xl font-bold text-secondary  ">Name of The particular Service</h2>



                                        <p className="text-sm  mb-20">Specialist : Multi Specialist</p>
                                        <p className="text-sm mt-10 "><span className="font-bold text-secondary">About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus expedita. Et repellendus fugit quasi in....</p>

                                        <p className=" uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot"></i> D NO : Service Rd, Bhoinagar Basti, Bhoi Nagar, Bhubaneswar, Odisha 751022</p>

                                    </div>
                                    <div className="flex flex-col justify-between h-10">
                                        <p className="text-primary font-semibold text-xs text-end text-nowrap">
                                            Customer Rating <br />
                                            <span className="text-sm pt-10 ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                (540)
                                            </span>
                                        </p>
                                        <button className=" bg-primary button rounded py-10 px-20 cursor-pointer  text-nowrap !text-white">View More</button>
                                    </div>

                                </div>

                            </li>
                            <li className="bg-white shadow rounded overflow-hidden  mb-20 h-200">
                                <div className="w-full h-full flex flex-row gap-20 p-10 pr-20 h-full ">
                                    <div className='search-result-left-img-box w-[31%]  rounded overflow-hidden '>
                                        <figure className="overflow-hidden ">
                                            <img
                                                src={photo1card}
                                                alt="img"
                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500 h-full object-cover  object-fill "
                                            />


                                        </figure>
                                    </div>
                                    <div className="search-result-right-content-box w-[60%] ">

                                        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl text: xl font-bold text-secondary  ">Name of The particular Service</h2>



                                        <p className="text-sm  mb-20">Specialist : Multi Specialist</p>
                                        <p className="text-sm mt-10 "><span className="font-bold text-secondary">About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus expedita. Et repellendus fugit quasi in....</p>

                                        <p className=" uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot"></i> D NO : Service Rd, Bhoinagar Basti, Bhoi Nagar, Bhubaneswar, Odisha 751022</p>

                                    </div>
                                    <div className="flex flex-col justify-between h-10">
                                        <p className="text-primary font-semibold text-xs text-end text-nowrap">
                                            Customer Rating <br />
                                            <span className="text-sm pt-10 ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                (540)
                                            </span>
                                        </p>
                                        <button className=" bg-primary button rounded py-10 px-20 cursor-pointer  text-nowrap !text-white">View More</button>
                                    </div>

                                </div>

                            </li>
                            <li className="bg-white shadow rounded h-200 mb-20 overflow-hidden">
                                <div className="w-full h-full flex flex-row gap-20 p-10 pr-20 ">
                                    <div className='search-result-left-img-box w-[31%]  '>
                                        <figure className="overflow-hidden rounded">
                                            <img
                                                src={photo1card}
                                                alt="img"
                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500"
                                            />
                                        </figure>
                                    </div>
                                    <div className="search-result-right-content-box w-[60%] ">

                                        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl text: xl font-bold text-secondary  ">Name of The particular Service</h2>



                                        <p className="text-sm mb-20">Specialist : Multi Specialist</p>
                                        <p className="text-sm mt-10 "><span className="font-bold text-secondary">About - </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus expedita. Et repellendus fugit quasi in....</p>

                                        <p className=" uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot"></i> D NO : Service Rd, Bhoinagar Basti, Bhoi Nagar, Bhubaneswar, Odisha 751022</p>

                                    </div>
                                    <div className="flex flex-col justify-between h-10">
                                        <p className="text-primary font-semibold text-xs text-end text-nowrap">
                                            Customer Rating <br />
                                            <span className="text-sm pt-10 ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                (540)
                                            </span>
                                        </p>
                                        <button className=" bg-primary button rounded py-10 px-20 cursor-pointer  text-nowrap !text-white">View More</button>
                                    </div>

                                </div>

                            </li>
                            <li className="bg-white shadow rounded  mb-20 h-200 overflow-hidden">
                                <div className="w-full h-full flex flex-row gap-20 p-10 pr-20 ">
                                    <div className='search-result-left-img-box w-[31%] '>
                                        <figure className="overflow-hidden rounded overflow-hidden">
                                            <img
                                                src={photo1card}
                                                alt="img"
                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500 aspect-ratio object-contain"
                                            />
                                        </figure>
                                    </div>
                                    <div className="search-result-right-content-box w-[60%] ">

                                        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl text: xl font-bold text-secondary ">Name of The particular Service</h2>



                                        <p className="text-sm  mb-20">Specialist : Multi Specialist</p>
                                        <p className="text-sm mt-10 "><span className="font-bold text-secondary">About - </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus expedita. Et repellendus fugit quasi in....</p>

                                        <p className=" uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot"></i> D NO : Service Rd, Bhoinagar Basti, Bhoi Nagar, Bhubaneswar, Odisha 751022</p>

                                    </div>
                                    <div className="flex flex-col justify-between h-10">
                                        <p className="text-primary font-semibold text-xs text-end text-nowrap">
                                            Customer Rating <br />
                                            <span className="text-sm pt-10 ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                (540)
                                            </span>
                                        </p>
                                        <button className=" bg-primary button rounded py-10 px-20 cursor-pointer  text-nowrap !text-white">View More</button>
                                    </div>

                                </div>

                            </li>
                            <li className="bg-white shadow rounded  pb-20  h-200 overflow-hidden">
                                <div className="w-full h-full flex flex-row gap-20 p-10 pr-20 ">
                                    <div className='search-result-left-img-box w-[31%] '>
                                        <figure className="overflow-hidden rounded overflow-hidden">
                                            <img
                                                src={photo1card}
                                                alt="img"
                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500 aspect-ratio object-contain"
                                            />
                                        </figure>
                                    </div>
                                    <div className="search-result-right-content-box w-[60%] ">

                                        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl text: xl font-bold text-secondary mb-20 ">Name of The particular Service</h2>



                                        <p className="text-sm mt-5">Specialist : Multi Specialist</p>
                                        <p className="text-sm mt-10 "><span className="font-bold text-secondary">About - </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus expedita. Et repellendus fugit quasi in....</p>

                                        <p className=" uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot"></i> D NO : Service Rd, Bhoinagar Basti, Bhoi Nagar, Bhubaneswar, Odisha 751022</p>

                                    </div>
                                    <div className="flex flex-col justify-between h-10">
                                        <p className="text-primary font-semibold text-xs text-end text-nowrap">
                                            Customer Rating <br />
                                            <span className="text-sm pt-10 ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                (540)
                                            </span>
                                        </p>
                                        <button className=" bg-primary button rounded py-10 px-20 cursor-pointer  text-nowrap !text-white">View More</button>
                                    </div>

                                </div>

                            </li>

                        </ul>
                        <div className="flex align-center justify-center mt-76">
                            <button className="cursor-pointer hover:text-primary">Prev</button>
                            <pre>         </pre>
                            <button className="cursor-pointer hover:text-primary">Next</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SearchList
