import React, { lazy, useEffect, useRef, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useStatesContext } from '../Context/States';
import { useDistrictsContext } from '../Context/Districts';
import { useSnackbar } from '../Context/SnackbarContext'
import photo1card from '../assets/img/photo-1-card.png'
import { useServiceListContex } from '../Context/Services';
import Pagination from '../components/Pagination';
import './Home.css'
import DropdownOff from '../components/DropdownOff';
import { GetServiceResult } from '../APIs/GetServiceResult';
import { useUserDataContext } from '../Context/Userdata';
import nodatafound from '../assets/img/nodatafound.png'
import loadingdata from '../assets/img/loadingdata.png'
import { useScreen } from '../Context/ScreenProvider';
import './SearchList.css'
import sliceText from '../components/SliceTest';
const Loading = lazy(() => import('../components/Loading'))

const SearchList = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const {isTablet} = useScreen();
    const { setSnackbar } = useSnackbar();
    const { userdata } = useUserDataContext;
    const params = new URLSearchParams(search);
    const { statesList } = useStatesContext();
    const searchResultRef = useRef(null);
    const { districtsList, setState, districtLoading } = useDistrictsContext();
    const { services } = useServiceListContex();
    const { state } = useLocation();
    const [hideDropdown, setHideDropdown] = useState(false);
    const [filterList, setFilterList] = useState([])
    const dropdownRef = useRef(null);
    const [resultList, setResultList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchData, setSearchData] = useState({
        state: state?.searchData.state || '',
        city: state?.searchData.city || '',
        service: state?.searchData.service || '',
        service_id: state?.searchData.service_id || ''
    })


    








    //Get Search result form backend

    useEffect(() => {
        if (!searchData) return;
        navigate(
            {
                pathname: "/search_result",
                search: `?${createSearchParams(searchData)}`
            },
            { replace: true }
        )
        setResultList([]);
        setLoading(true);
        const fetchList = async () => {
            try {
                const data = await GetServiceResult(userdata?.token, searchData)

                setResultList(data.data);
            } catch (err) {
                console.error(err);
                setSnackbar({ open: true, message: 'Error getting service.' })
            } finally {
                setLoading(false);
            }
        }

        fetchList();

    }, [searchData.state, searchData.city, searchData.service_id])



    //fetch service name 

    const findeServiceName = (serviceId) => {
        if (!services?.data) return;

        const matched = services.data.find(
            (value) => value.service_id === serviceId
        );

        return matched ? matched.service_name : undefined;
    };





    useEffect(() => {
        if(!services) return;
        if (!searchData.service.trim()) {
            setFilterList([]);
            return;
        } else {
            setHideDropdown(true);
        }

        const filterList = services?.data?.filter((data) =>
            data.service_name.toLowerCase().includes(searchData.service.toLowerCase())
        );

        setFilterList(filterList);
    }, [searchData.service, services]);



    useEffect(() => {
        if (!services?.data || !searchData.service.trim()) {
            setSearchData((prev) => ({
                ...prev,
                service_id: '',
            }));
            return;
        }

        const matched = services.data.find(
            (value) =>
                value.service_name.toLowerCase() === searchData.service.toLowerCase()
        );

        if (matched) {
            setSearchData((prev) => ({
                ...prev,
                service_id: matched.service_id,
            }));
        } else {
            setSearchData((prev) => ({
                ...prev,
                service_id: "",
            }));
        }
    }, [searchData.service, services]);



    //handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchData.state && !searchData.service && !searchData.service_id) {
            setSnackbar({ open: true, message: 'Enter atleast one field.', type: "warning" })
            return;
        }
        navigate(
            {
                pathname: "/search_result",
                search: `?${createSearchParams(searchData)}`
            },
            { replace: true }
        )
    };


    const handleNavigate = (data) => {
         sessionStorage.setItem(
        "servicedetails",
        JSON.stringify(data)
      );
        navigate(`/servicedetails/${data.service_type}/${findeServiceName(data.service_type)}`, { state: { data } })

    }



    return (
        <div className="sm:pt-100 pt-80 sm:pt-40 lg:pt-80 bg-[#F4F4FF]  ">
            <div className="container">
                {/* ---------- Search Form ---------- */}
                <section className="lg:pt-60 md:pt-50 pt-50 lg:pb-60 md:pb-50  px-20 pb-50 bg-primary rounded-[10px] shadow" id="search-space-search-result ">
                    <form onSubmit={handleSubmit} id="search-form ">
                        <h2 className="text-center text-white lg:pb-70 sm:pb-50 pb-40 xxl:text-6xl xl:text-5xl md:text-4xl sm:text-2xl text-xl font-extrabold">
                            Find the Service You Want
                        </h2>
                        <div className='search-space-box'>


                            {/* State Dropdown */}
                            <div className="search-space-left-box">
                                <div className="search-space-left-box-1 border border-lightgary  rounded ">
                                    <i className="fa-solid fa-location-dot text-white"></i>
                                    <select
                                        name="state"
                                        className='outline-none text-white text-sm '
                                        onChange={(e) => {
                                            setSearchData({ ...searchData, state: e.target.value });
                                            setState(e.target.value)
                                        }}
                                        value={searchData.state}
                                    >
                                        <option className='text-black text-sm'>Search By State</option>
                                        {statesList.status && statesList.data.map((state, index) => (
                                            <option className='text-black text-sm' key={index} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* District Dropdown */}



                                <div className=" search-space-left-box-2 border border-lightgary rounded">
                                    <i className="fa-solid fa-location-dot text-white"></i>
                                    <select
                                        disabled={districtLoading}
                                        className={`outline-none py-5 text-sm text-white flex-grow ${districtLoading ? 'opacity-50' : ''}`}
                                        onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
                                        value={searchData.city}
                                        name='city'
                                    >
                                        <option className='text-black text-sm'>Search By City</option>
                                        {districtsList.status && districtsList.data.map((district, index) => (
                                            <option className='text-black text-sm' key={index} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {districtLoading && (<Loading size='20px' />)}
                                </div>
                            </div>

                            {/* Service Input */}


                            <div className="search-space-right-box ">
                                <div className="search-space-right-box-1   border border-lightgary flex items-center relative rounded">
                                    <i className="fa-solid fa-magnifying-glass text-white"></i>
                                    <input
                                        type="text"
                                        placeholder="Search By Service"
                                        className="outline-none flex-grow text-sm text-white"
                                        value={searchData.service}
                                        onChange={(e) => setSearchData({ ...searchData, service: e.target.value })}
                                    />
                                    <DropdownOff setDropdownOpen={setHideDropdown} dropdownRef={dropdownRef}>
                                        <div ref={dropdownRef} className='search-space-right-box-dropdown'>
                                            <ul className='shadow'>
                                                {searchData.service && hideDropdown && (filterList.length > 0 ? filterList.map((service, index) => (
                                                    <li key={index} onClick={() => {
                                                        setHideDropdown(false);
                                                        setSearchData({
                                                            ...searchData,
                                                            service: service.service_name,
                                                            service_id: service.service_id
                                                        })

                                                    }} className='text-sm p-10 cursor-pointer  hover:bg-primary hover:text-white bg-white'>
                                                        {service.service_name}
                                                    </li>

                                                ))
                                                    :
                                                    (
                                                        <li style={{ userSelect: 'none' }} className='text-sm p-10  bg-white'>No Service Found</li>
                                                    )
                                                )}

                                            </ul>
                                        </div>
                                    </DropdownOff>
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
                    <h2 className="text-1xl font-bold mb-30 mt-40 text-secondary">Search Results</h2>
                    <div className="search-result-list-box">

                        {!loading ? (<Pagination
                            DataList={resultList}
                            limit={6}
                            targateRef={searchResultRef}
                        >
                            {(currentItems) => (
                                <ul className='flex gap-20  flex-wrap align-center'>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((data, index) => (
                                            <li style={{flexBasis : '400px'}} key={index} className="bg-white    shadow rounded overflow-hidden mb-20  min-h-400">
                                                <div className="p-10 pb-15 flex flex-col justify-between h-full">
                                                    {/* Image */}
                                                    <div className=''>
                                                    <div style={{minHeight : '8rem',background : 'lightgray'}} className='search-result-left-img-box rounded overflow-hidden '>
                                                        <figure className="overflow-hidden rounded">
                                                            <img
                                                                loading='lazy'
                                                                src={data?.hospital_logo}
                                                                alt={data.hospital_name}
                                                                className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500 h-full object-contain"
                                                            />
                                                        </figure>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="search-result-right-content-box  mt-10  ">
                                                        <h2 className="lg:text-3xl text-center md:text-2xl sm:text-2xl text-xl font-bold text-secondary">{data.hospital_name}</h2>
                                                        <p className="text-xs mb-20 text-center mt-5">{findeServiceName(data.service_type)}</p>
                                                        <p className="text-sm mt-10"><span className="font-bold text-secondary">About : </span>{sliceText(data?.service_desc,60) }</p>
                                                        <p className="uppercase text-sm font-semibold mt-30"><i className="fa-solid fa-location-dot mr-10"></i>{data?.address} || {data.pincode}</p>
                                                    </div>
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
                                                                ({data?.service_rating})
                                                            </span>
                                                        </p>
                                                        <button onClick={() => handleNavigate(data)} className="bg-primary button rounded py-5 text-sm px-20 cursor-pointer text-nowrap !text-white">View</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <div className='w-full flex flex-col items-center justify-center'>
                                            <div style={{ height: '20rem', width: '20rem' }} >
                                                <img src={nodatafound} className='aspect-square h-full w-full object-cover' alt="nodatafound" />
                                            </div>
                                            <p className='font-semibold mt-10'>No Service Found.</p>
                                        </div>
                                    )}
                                </ul>
                            )}


                        </Pagination>) :
                            (
                                <div className='search-list-service-loading w-full flex flex-col items-center justify-center'>
                                    <div  >
                                        <img src={loadingdata} style={{  width: "20rem"}} className=' h-full w-full object-cover' alt="loadingdata" />
                                    </div>
                                    <p className='font-semibold mt-10 text-2xl'>Loading....</p>
                                </div>
                            )
                        }



                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchList
