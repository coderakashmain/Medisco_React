import React, { lazy, useRef, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useStatesContext } from '../Context/States';
import { useDistrictsContext } from '../Context/Districts';
import photo1card from '../assets/img/photo-1-card.png'
import { useServiceListContex } from '../Context/Services';
import Pagination from '../components/Pagination';

const Loading = lazy(() => import('../components/Loading'))

const SearchList = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const { statesList } = useStatesContext();
    const searchResultRef = useRef(null);
    const { districtsList, setState, districtLoading } = useDistrictsContext();
    const { services } = useServiceListContex();
    const [searchData, setSearchData] = useState({
        state: '',
        district: '',
        service: ''
    })




    const DataList = [
        { id: 1, service_id: 6, service_name: 'Service 1', service_photo: photo1card, service_desc: 'Lorem ipsum dolor sit amet...', service_address: 'Bhubaneswar, Odisha', service_rating: 520 },
        { id: 2, service_id: 6, service_name: 'Service 2', service_photo: photo1card, service_desc: 'Lorem ipsum dolor sit amet...', service_address: 'Bhubaneswar, Odisha', service_rating: 420 },
        { id: 3, service_id: 6, service_name: 'Service 3', service_photo: photo1card, service_desc: 'Lorem ipsum dolor sit amet...', service_address: 'Bhubaneswar, Odisha', service_rating: 320 },
        { id: 4, service_id: 6, service_name: 'Service 4', service_photo: photo1card, service_desc: 'Lorem ipsum dolor sit amet...', service_address: 'Bhubaneswar, Odisha', service_rating: 220 },
        { id: 5, service_id: 6, service_name: 'Service 4', service_photo: photo1card, service_desc: 'Lorem ipsum dolor sit amet...', service_address: 'Bhubaneswar, Odisha', service_rating: 220 },
        { id: 6, service_id: 6, service_name: 'Service 4', service_photo: photo1card, service_desc: 'Lorem ipsum dolor sit amet...', service_address: 'Bhubaneswar, Odisha', service_rating: 220 },
        { id: 7, service_id: 6, service_name: 'Service 4', service_photo: photo1card, service_desc: 'Lorem ipsum dolor sit amet...', service_address: 'Bhubaneswar, Odisha', service_rating: 220 },
    ]

    //  Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = DataList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(DataList.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
            searchResultRef.current?.scrollIntoView({

                block: "start",
            });
        };

    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        };
        searchResultRef.current?.scrollIntoView({

            block: "start",
        });
    }

    return (
        <div className="sm:pt-100 pt-20 bg-[#F4F4FF]  ">
            <div className="container">
                {/* ---------- Search Form ---------- */}
                <section className="lg:pt-60 md:pt-50 pt-50 lg:pb-60 md:pb-50 sm:hide px-20 pb-50 bg-primary rounded-[20px] shadow" id="search-space-search-result ">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(
                            {
                                pathname: "/search_result",
                                search: `?${createSearchParams(searchData)}`
                            },
                            { replace: true }
                        )
                    }} id="search-form w-[100%] ">
                        <h2 className="text-center text-white pb-70 xxl:text-6xl xl:text-5xl md:text-4xl sm:text-2xl text-xl font-extrabold">
                            Find the Service You Want
                        </h2>
                        <div className='w-full flex flex-row flex-wrap gap-10'>


                            {/* State Dropdown */}
                            <div className="search-form-box flex  m-auto flex-row w-[50%] justify-center flex-nowrap align-center gap-20 ">
                                <div className="border border-lightgary p-7 rounded flex justify-center w-[50%] items-center gap-10 flex-grow md:w-[50%]">
                                    <i className="fa-solid fa-location-dot text-white"></i>
                                    <select
                                        name="states"
                                        className='outline-none text-white flex-grow py-5'
                                        onChange={(e) => {
                                            setSearchData({ ...searchData, state: e.target.value });
                                            setState(e.target.value)
                                        }}
                                        defaultValue={params.get("state")}
                                    >
                                        <option className='text-black'>Search By State</option>
                                        {statesList.status && statesList.data.map((state, index) => (
                                            <option className='text-black' key={index} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* District Dropdown */}



                                <div className="border border-lightgary p-7 rounded flex justify-center w-[50%] items-center gap-10 flex-grow md:w-[50%]">
                                    <i className="fa-solid fa-location-dot text-white"></i>
                                    <select
                                        disabled={districtLoading}
                                        className={`outline-none py-5 text-white flex-grow ${districtLoading ? 'opacity-50' : ''}`}
                                        onChange={(e) => setSearchData({ ...searchData, district: e.target.value })}
                                        defaultValue={params.get("district")}
                                    >
                                        <option className='text-black'>Search By City</option>
                                        {districtsList.status && districtsList.data.map((district, index) => (
                                            <option className='text-black' key={index} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {districtLoading && (<Loading size='20px' />)}
                                </div>
                            </div>

                            {/* Service Input */}


                            <div className="flex flex-row w-[45%] justify-center align-center m-auto gap-10 rounded">
                                <div className="flex justify-center items-center w-full gap-10 p-10 border border-lightgary flex-grow rounded">
                                    <i className="fa-solid fa-magnifying-glass text-white"></i>
                                    <input
                                        type="text"
                                        placeholder="Search By Service"
                                        className="outline-none flex-grow text-white"
                                        value={searchData.service || params.get("service") || ""}
                                        onChange={(e) => setSearchData({ ...searchData, service: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="button cursor-pointer bg-white px-20 py-10 text-secondary rounded">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </section>

                {/*  Search Results */}


                <div className="pt-30" id='search-result' ref={searchResultRef}>
                    <h2 className="text-3xl font-bold mb-30 mt-20 text-secondary">Search Results</h2>
                    <div className="search-result-list-box">

                        <Pagination
                            DataList={DataList}
                            limit={6}
                            targateRef={searchResultRef}
                        >
                            {(currentItems) => (
                                <ul className='flex gap-20 justify-between flex-wrap align-center'>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((data, index) => (
                                            <li key={index} className="bg-white  w-400 shadow rounded overflow-hidden mb-20  min-h-400">
                                                <div className="p-10 pb-15">
                                                    {/* Image */}
                                                    <div className='search-result-left-img-box rounded overflow-hidden'>
                                                        <figure className="overflow-hidden rounded">
                                                            <img
                                                                loading='lazy'
                                                                src={data.service_photo}
                                                                alt="img"
                                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500 h-full object-contain"
                                                            />
                                                        </figure>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="search-result-right-content-box  mt-10  ">
                                                        <h2 className="lg:text-3xl text-center md:text-2xl sm:text-2xl text-xl font-bold text-secondary">{data.service_name}</h2>
                                                        <p className="text-xs mb-20">Specialist : Multi Specialist</p>
                                                        <p className="text-sm mt-10"><span className="font-bold text-secondary">About : </span>{data.service_desc}</p>
                                                        <p className="uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot mr-10"></i>{data.service_address}</p>
                                                    </div>

                                                    {/* Rating + Button */}
                                                    <div className="flex flex-row justify-between mt-20 ">
                                                        <p className="text-primary font-semibold text-xs text-nowrap">
                                                            Customer Rating <br />
                                                            <span className="text-sm pt-10 ">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                ({data.service_rating})
                                                            </span>
                                                        </p>
                                                        <button className="bg-primary button rounded py-5 text-sm px-20 cursor-pointer text-nowrap !text-white">View</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <div>
                                            <p>No Service Found.</p>
                                        </div>
                                    )}
                                </ul>
                            )}


                        </Pagination>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchList
