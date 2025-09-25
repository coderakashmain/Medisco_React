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
import defaultOrganizationlogo from '../assets/img/defaultOrganizationlogo.png'
const Loading = lazy(() => import('../components/Loading'))
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const SearchList = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const { isTablet } = useScreen();
    const { setSnackbar } = useSnackbar();
    const { userdata } = useUserDataContext;
    const params = new URLSearchParams(search);
    const { statesList } = useStatesContext();
    const searchResultRef = useRef(null);
    const { districtsList, setState, districtLoading, setDistrictsList } = useDistrictsContext();
    const { services } = useServiceListContex();
    const { state } = useLocation();
    const [hideDropdown, setHideDropdown] = useState(false);
    const [filterList, setFilterList] = useState([])
    const dropdownRef = useRef(null);
    const [resultList, setResultList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchData, setSearchData] = useState(() => {
        if (state) {
            return {
                state: state?.searchData?.state || '',
                city: state?.searchData?.city || '',
                organization_name: state?.searchData?.organization_name || '',
                service_id: state?.searchData?.service_id || '',
                service_name: state?.searchData?.service_name || '',
            };
        }
        const saved = sessionStorage.getItem('searchItems');
        if (saved) {
            return JSON.parse(saved);
        }

    });









    const fetchList = async () => {
        if (!searchData.state && !searchData.city && !searchData.organization_name && !searchData.service_id) return;

        setLoading(true);
        try {
            const data = await GetServiceResult(userdata?.token, searchData)

            setResultList(data.data);
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: 'Error getting service.', type: 'error' })
        } finally {
            setLoading(false);
        }
    }

    //Get Search result form backend

    useEffect(() => {


        if (!searchData.state) {
            setDistrictsList([])
        }

        sessionStorage.setItem('searchItems', JSON.stringify(searchData));
        if (!searchData.service_id) return;




        navigate(
            {
                pathname: "/search_result",
                search: `?${createSearchParams(searchData)}`
            },
            { replace: true }
        )
        setResultList([]);



        //Calling the api 

        fetchList();

    }, [searchData.state, searchData.city, searchData.service_id]);






     

    const findeServiceName = (serviceId) => {
        if (!services?.data) return;

        const matched = services.data.find(
            (value) => value.service_id === serviceId
        );

        if (!matched) return undefined;

        
        let name = decodeURIComponent(matched.service_name);

       
        name = name.replace(/\//g, " ");

        return name.trim();
    };






    useEffect(() => {
        if (!services?.data || !searchData.service_name.trim()) {
            setSearchData((prev) => ({
                ...prev,
                service_id: '',
            }));
            return;
        }

        const matched = services.data.find(
            (value) =>
                value.service_name.toLowerCase() === searchData.service_name.toLowerCase()
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
    }, [searchData.service_name, services]);



    //handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchData.state && !searchData.organization_name) {
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
        fetchList();
    };


    const handleNavigate = (data) => {
        sessionStorage.setItem(
            "servicedetails",
            JSON.stringify(data)
        );

        navigate(`/servicedetails/${data.service_type}/${findeServiceName(data.service_type)}/${data.hospital_name}`, { state: { data } })

    }




    return (
        <div className="sm:pt-100 pt-80 sm:pt-40 lg:pt-80 bg-[#F4F4FF]  ">
            <div className="container">
                {/* ---------- Search Form ---------- */}
                <section className="lg:pt-60 md:pt-50 pt-30 lg:pb-60 md:pb-50  px-20 pb-50 bg-primary rounded-[10px] shadow" id="search-space-search-result ">
                    <form onSubmit={handleSubmit} id="search-form ">
                        <h2 className="text-center text-white  xxl:text-6xl xl:text-5xl md:text-4xl sm:text-2xl text-xl font-extrabold">
                            Searching for
                        </h2>
                        <div className='text-sm mt-30 lg:pb-20 sm:pb-10   flex justify-center items-center rounded'>
                            <select
                                name="service_name"
                                id="service_name"
                                className='text-white outline-none max-sm:w-full px-5 py-10 rounded  border border-lightgary  font-semibold'
                                value={searchData.service_name}
                                onChange={(e) => setSearchData({ ...searchData, service_name: e.target.value })}
                            >
                                <option disabled className='text-sm text-black' value="" >Search By Service</option>
                                {services.status && services.data.map((service, index) => (
                                    <option className='text-sm p-10 text-black' key={index} value={service.service_name}>{service.service_name}</option>

                                ))}

                            </select>
                            {/* <IconButton >
                                <Tooltip title="Change Service type">

                                    <SwapHorizIcon className='text-white' />
                                </Tooltip>

                            </IconButton> */}
                        </div>


                        <div className='search-space-box lg:pt-20 sm:pt-20 pt-10'>


                            {/* State Dropdown */}
                            <div className="search-space-left-box ">
                                <div className="search-space-left-box-1 border border-lightgary  rounded ">
                                    <i className="fa-solid fa-location-dot text-white"></i>
                                    <select
                                        name="state"
                                        className='outline-none text-white text-sm  '
                                        onChange={(e) => {
                                            setSearchData(() => ({
                                                ...searchData,
                                                state: e.target.value,
                                                city: ''
                                            }));

                                            setState(e.target.value);
                                        }}
                                        value={searchData.state}
                                    >
                                        <option value="" className='text-black text-sm '>Search By State</option>
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
                                        <option value="" className='text-black text-sm'>Search By City</option>
                                        {districtsList.status && districtsList.data.map((district, index) => (
                                            <option className='text-black text-sm' key={index} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {districtLoading && (<Loading size='20px' />)}
                                </div>
                            </div>

                            {/* Service Input */}


                            <div className="search-space-right-box ">
                                <div className='search-space-right-box-1 gap-10'>
                                    {/* <div className='border border-lightgary relative rounded  '>
                                        <select
                                            name="service_name"
                                            id="service_name"
                                            className='text-white outline-none   px-5  rounded !w-full text-sm'
                                            value={searchData.service_name}
                                            onChange={(e) => setSearchData({ ...searchData, service_name: e.target.value })}
                                        >
                                            <option disabled className='text-sm text-black' value="" >Search By Service</option>
                                            {services.status && services.data.map((service, index) => (
                                                <option className='text-sm p-10 text-black' key={index} value={service.service_name}>{service.service_name}</option>

                                            ))}

                                        </select>
                                    </div> */}

                                    <div className="  border border-lightgary overflow-hidden flex items-center relative rounded w-full">
                                        <i className="fa-solid fa-magnifying-glass text-white"></i>
                                        <input
                                            type="text"
                                            placeholder="Search By Organization Name"
                                            className="outline-none flex-grow text-sm text-white"
                                            value={searchData.organization_name}
                                            onChange={(e) => setSearchData({ ...searchData, organization_name: e.target.value })}
                                        />
                                        {/* <DropdownOff setDropdownOpen={setHideDropdown} dropdownRef={dropdownRef}>
                                        <div ref={dropdownRef} className='search-space-right-box-dropdown'>
                                            <ul className='shadow'>
                                                {searchData.organization_name && hideDropdown && filterList && (filterList.length > 0 && filterList.map((service, index) => (
                                                    <li key={index} onClick={() => {
                                                        setHideDropdown(false);
                                                        setSearchData({
                                                            ...searchData,
                                                            organization_name: service.service_name,
                                                            service_id: service.service_id
                                                        })

                                                    }} className='text-sm p-10 cursor-pointer  hover:bg-primary hover:text-white bg-white'>
                                                        {service.service_name}
                                                    </li>

                                                )))}

                                            </ul>
                                        </div>
                                    </DropdownOff> */}
                                    </div>
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
                                <ul className='flex gap-10 justify-around  flex-wrap align-center'>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((data, index) => (
                                            <li style={{ flexBasis: '325px', maxWidth: '400px' }} key={index} className="bg-white flex-grow    shadow rounded overflow-hidden mb-20  min-h-400">
                                                <div className="p-10 pb-15 flex flex-col justify-between h-full">
                                                    {/* Image */}
                                                    <div className=''>
                                                        <div style={{ minHeight: '10rem', background: 'lightgray' }} className='search-result-left-img-box rounded overflow-hidden '>
                                                            <figure className="overflow-hidden rounded">
                                                                <img
                                                                    loading='lazy'
                                                                    style={{ height: '15rem' }}
                                                                    src={data?.hospital_logo ? ` https://api.medisco.in/${data?.hospital_logo}` : defaultOrganizationlogo}
                                                                    alt={data.hospital_name}
                                                                    className="w-full  object-fill"
                                                                />
                                                            </figure>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="search-result-right-content-box  mt-10  ">
                                                            <h2 className="lg:text-3xl text-center md:text-2xl sm:text-2xl text-xl font-bold text-secondary">{data.hospital_name}</h2>
                                                            <p className="text-xs mb-20 text-center mt-5">{findeServiceName(data.service_type)}</p>
                                                            {data?.service_desc && (<p className="text-sm mt-10"><span className="font-bold text-secondary"> </span>{sliceText(data?.service_desc, 60)}</p>)}
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
                                        <img src={loadingdata} style={{ width: "20rem" }} className=' h-full w-full object-cover' alt="loadingdata" />
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
