import React, { lazy, useEffect, useMemo, useRef, useState } from 'react'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useStatesContext } from '../Context/States';
import { useDistrictsContext } from '../Context/Districts';
import { useSnackbar } from '../Context/SnackbarContext'
import { useServiceListContex } from '../Context/Services';
import Pagination from '../components/Pagination';
import './Home.css'
import { GetServiceResult } from '../APIs/GetServiceResult';
import { useUserDataContext } from '../Context/Userdata';
import nodatafound from '../assets/img/nodatafound.png'
import loadingdata from '../assets/img/loadingdata.png'
import { useScreen } from '../Context/ScreenProvider';
import './SearchList.css'
import sliceText from '../components/SliceTest';
import defaultOrganizationlogo from '../assets/img/defaultOrganizationlogo.png'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
const Loading = lazy(() => import('../components/Loading'))
import { motion } from 'framer-motion';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { getSpecializationByService } from '../APIs/getSpecializationByService';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Divider
} from "@mui/material";



const SearchList = () => {
    const navigate = useNavigate();
    const { setSnackbar } = useSnackbar();
    const { userdata } = useUserDataContext;
    const { statesList } = useStatesContext();
    const searchResultRef = useRef(null);
    const { districtsList, setState, districtLoading, setDistrictsList } = useDistrictsContext();
    const { services } = useServiceListContex();
    const location = useLocation();
    const { searchdata } = location?.state || {};
    const [resultList, setResultList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isMobile, width, isLargeDesktop } = useScreen();
    const [searchCollapsed, setSearchCollapsed] = useState(false);
    const [specializationList, setSpecializationList] = useState([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);

    const [searchData, setSearchData] = useState(() => {
        if (searchdata) {

            return {
                state: searchdata?.state || '',
                city: searchdata?.city || '',
                organization_name: searchdata?.organization_name || '',
                service_id: searchdata?.service_id || '',
                service_name: searchdata?.service_name || '',
            };
        }
        const saved = sessionStorage.getItem('searchItems');
        if (saved) {
            return JSON.parse(saved);
        }

    });

    useEffect(() => {


        const fetchSpecialization = async () => {
            try {

                const serviceId = Number(searchData?.service_id);

                if (!serviceId || isNaN(serviceId)) {
                    console.warn("Invalid service_id:", searchData?.service_id);
                    return;
                }
                const list = await getSpecializationByService(null, serviceId);

                setSpecializationList(list.data);

            } catch (error) {
                console.error(error.message)
            }
        }


        if (searchData?.service_id) {

            fetchSpecialization();
        }

    }, [searchData?.service_id])


    const filteredResultList = useMemo(() => {
        if (selectedSpecializations.length === 0) return resultList;

        return resultList.filter((hospital) =>
            hospital.specialization.some(spec =>
                selectedSpecializations.includes(String(spec.specialized_id))
            )
        );
    }, [resultList, selectedSpecializations]);










    const fetchList = async () => {
        if (!searchData?.state && !searchData?.city && !searchData?.organization_name && !searchData?.service_id) return;

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


        if (!searchData?.state) {
            setDistrictsList([])
        }

        sessionStorage.setItem('searchItems', JSON.stringify(searchData));
        if (!searchData?.service_id) return;

        let name = decodeURIComponent(searchData.service_name);


        name = name.replace(/\//g, " ");



        navigate(
            `/search_result/${searchData.state || 'ns'}/${searchData.city || 'ns'}/${searchData.organization_name || 'ns'}/${name}`,
            { replace: true }
        )
        setResultList([]);



        //Calling the api 

        fetchList();

    }, [searchData?.state, searchData?.city, searchData?.service_id]);








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
        if (!services?.data || !searchData?.service_name?.trim()) {
            setSearchData((prev) => ({
                ...prev,
                service_id: '',
            }));
            return;
        }

        const matched = services.data.find(
            (value) =>
                value.service_name.toLowerCase() === searchData?.service_name.toLowerCase()
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
    }, [searchData?.service_name, services]);



    //handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchData?.state && !searchData?.organization_name) {
            setSnackbar({ open: true, message: 'Enter atleast one field.', type: "warning" })
            return;
        }

        let name = decodeURIComponent(matched.service_name);


        name = name.replace(/\//g, " ");

        navigate(
            `/search_result/${searchData.state || 'ns'}/${searchData.city || 'ns'}/${searchData.organization_name || 'ns'}/${name}`,
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
        <div className="sm:pt-100 pt-80 sm:pt-40 pb-80 lg:pt-80 bg-white min-h-screen  ">
            <div className="container">


                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0, height: searchCollapsed ? isLargeDesktop ? 140 : width >= 576 ? 190 : isMobile ? 350 : 400 : 0, overflow: 'hidden' }}
                    transition={{
                        type: "spring",
                        stiffness: 110, // lower = smoother
                        damping: 20,    // lower = more bounce
                        duration: 0.3,  // extra smooth
                    }}
                    className=''
                >

                    <motion.form
                        initial={{ opacity: 0, y: 50, marginTop: 0 }}
                        animate={{ opacity: searchCollapsed ? 1 : 0, y: searchCollapsed ? 0 : 50, marginTop: searchCollapsed ? 30 : 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 110, // lower = smoother
                            damping: 20,    // lower = more bounce
                            duration: 0.3,  // extra smooth
                        }}
                        onSubmit={handleSubmit} id="search-form ">
                        <div className={`flex items-center ${isMobile ? 'flex-col' : 'flex-row  '} justify-center gap-10`}>



                        </div>


                        <div className='search-space-box lg:pt-20 sm:pt-20 pt-10'>



                            <div className="search-space-left-box ">
                                <div className={`search-space-right-box-2 `}>
                                    <div className='  border border-lightgary h-full p-7  flex justify-center items-center rounded '>

                                        <i className="fa-solid fa-magnifying-glass "></i>
                                        <select
                                            name="service_name"
                                            id="service_name"
                                            className={`outline-none py-5  ${searchData?.service_name === "" ? ' opacity-50' : ''}  text-sm  flex-grow ${districtLoading ? 'opacity-50' : ''}`}
                                            value={searchData?.service_name}
                                            onChange={(e) => setSearchData({ ...searchData, service_name: e.target.value })}
                                        >
                                            <option disabled className='text-sm text-black' value="" >Search By Service</option>
                                            {services.status && services.data.map((service, index) => (
                                                <option className='text-sm p-10 text-black' key={index} value={service.service_name}>{service.service_name}</option>

                                            ))}

                                        </select>

                                    </div>
                                </div>

                                <div className="search-space-left-box-1 border border-lightgary  p-7 rounded ">
                                    <i className="fa-solid fa-location-dot "></i>
                                    <select
                                        name="state"
                                        className={`outline-none ${searchData?.state === "" ? ' opacity-50' : ''}   text-sm  `}

                                        onChange={(e) => {
                                            setSearchData(() => ({
                                                ...searchData,
                                                state: e.target.value,
                                                city: ''
                                            }));

                                            setState(e.target.value);
                                        }}
                                        value={searchData?.state}
                                    >
                                        <option value="" className='text-black text-sm '>Search By State</option>
                                        {statesList.status && statesList.data.map((state, index) => (
                                            <option className='text-black text-sm' key={index} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>






                            </div>




                            <div className="search-space-right-box ">


                                <div className=" search-space-left-box-2 border border-lightgary rounded p-7">
                                    <i className="fa-solid fa-location-dot "></i>
                                    <select
                                        disabled={districtLoading}
                                        className={`outline-none py-5  ${searchData?.city === "" ? ' opacity-50' : ''}  text-sm  flex-grow ${districtLoading ? 'opacity-50' : ''}`}
                                        onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
                                        value={searchData?.city}
                                        name='city'
                                    >
                                        <option value="" className='text-black text-sm'>Search By City</option>
                                        {districtsList.status && districtsList.data.map((district, index) => (
                                            <option className='text-black text-sm' key={index} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {districtLoading && (<Loading size='20px' />)}
                                </div>
                                <div className='search-space-right-box-1 gap-10'>


                                    <div className="  border border-lightgary p-7 overflow-hidden flex items-center relative rounded w-full">
                                        <i className="fa-solid fa-magnifying-glass "></i>
                                        <input
                                            type="text"
                                            placeholder="Search By Organization Name"
                                            className="outline-none flex-grow text-sm "
                                            value={searchData?.organization_name}
                                            onChange={(e) => setSearchData({ ...searchData, organization_name: e.target.value })}
                                        />

                                    </div>
                                </div>
                                <button type="submit" className="button cursor-pointer bg-primary text-white px-20 py-10 text-secondary rounded">
                                    {isMobile ? "Search" : (<i className="fa fa-search"></i>)}
                                </button>
                            </div>
                        </div>
                    </motion.form>

                </motion.section>

                {/*  Search Results */}


                <div className="" id='search-result' ref={searchResultRef}>
                    <div style={{ gap: isMobile ? 4 : 10 }} className="flex  justify-between mb-30   ">
                        <h2 className="text-1xl font-bold text-nowrap  text-secondary">Search Results</h2>
                        <div className='flex items-center gap-10 '>
                            {specializationList?.length > 1 && (
                                <FormControl
                                    size="small"
                                    sx={{ width: isMobile ? "8rem" : "20rem" }}
                                >
                                    <InputLabel sx={{ fontSize: "0.8rem" }}>
                                        Filter Specializations
                                    </InputLabel>

                                    <Select
                                        multiple
                                        value={selectedSpecializations}
                                        onChange={(e) => {
                                            const value = e.target.value;


                                            if (value.includes("__clear__")) return;

                                            setSelectedSpecializations(value);
                                        }}
                                        input={<OutlinedInput label="Filter Specializations" />}
                                        renderValue={(selected) =>
                                            selected.length === 0
                                                ? "Select Specialization"
                                                : specializationList
                                                    .filter((item) => selected.includes(String(item.specialized_id)))
                                                    .map((item) => item.name)
                                                    .join(", ")
                                        }
                                        sx={{
                                            fontSize: "0.8rem",
                                            height: "2.2rem"
                                        }}
                                    >


                                        <MenuItem
                                            value="__clear__"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setSelectedSpecializations([]);
                                            }}
                                            sx={{
                                                fontSize: "0.75rem",
                                                fontWeight: "bold",
                                                color: "red",
                                                justifyContent: "center"
                                            }}
                                        >
                                            ✖ Clear Selection
                                        </MenuItem>

                                        <Divider />

                                        {specializationList.map((item) => (
                                            <MenuItem
                                                key={item.specialized_id}
                                                value={String(item.specialized_id)}
                                                sx={{ fontSize: "0.8rem" }}
                                            >
                                                <Checkbox
                                                    size="small"
                                                    checked={selectedSpecializations.includes(String(item.specialized_id))}
                                                />
                                                <ListItemText
                                                    primary={item.name}
                                                    primaryTypographyProps={{ fontSize: "0.8rem" }}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}

                            <div className='flex items-center  justify-center'>

                                <IconButton style={{ background: !searchCollapsed ? "" : 'var(--color-primary)' }} onClick={() => setSearchCollapsed(!searchCollapsed)} >
                                    <Tooltip title="Filter">
                                        <FilterAltIcon className={` ${searchCollapsed ? 'text-white' : 'text-primary'}`} />
                                    </Tooltip>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="search-result-list-box">

                        {!loading ? (<Pagination
                            DataList={filteredResultList}
                            limit={12}
                            targateRef={searchResultRef}
                        >
                            {(currentItems) => (
                                <ul className='flex gap-10 justify-around  flex-wrap align-center'>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((data, index) => (
                                            <li style={{ flexBasis: '325px', maxWidth: '400px' }} key={index} className="bg-white flex-grow     shadow rounded overflow-hidden mb-20  min-h-400">
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
                                                            <div className=' mb-10 select-none  mt-5 flex items-center justify-center flex-wrap gap-5'>

                                                                {/* <p className="text-xs font-semibold text-primary">{findeServiceName(data.service_type)}</p> */}
                                                                {data.specialization.length > 0 && data.specialization.map((item) => (
                                                                    <Tooltip title={
                                                                        <div
                                                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                                                            style={{
                                                                                fontSize: "0.75rem",
                                                                                maxWidth: "200px",
                                                                                lineHeight: "1.4"
                                                                            }}
                                                                        />
                                                                    } arrow>
                                                                        <span
                                                                            key={item.specialized_id}
                                                                            style={{ padding: "3px 10px" }}
                                                                            className="bg-primary text-white text-xs rounded-full shadow-sm"
                                                                        >
                                                                            {item.name}
                                                                        </span>
                                                                    </Tooltip>
                                                                ))}
                                                            </div>
                                                            {/* {data?.about && (<p className="text-sm mt-10"><span className="font-bold text-secondary"> </span>{sliceText(data?.about, 60)}</p>)} */}
                                                            <p className="uppercase text-xs md:text-sm font-semibold mt-15 flex items-center gap-4 "><LocationCityIcon className='text-primary' />{data?.address} || {data.pincode}</p>
                                                        </div>
                                                    </div>
                                                    {/* Rating + Button */}
                                                    <div className="flex flex-row justify-between mt-20 ">
                                                        <p className="text-primary font-semibold text-xs text-nowrap">
                                                            Customer Rating <br />
                                                            <span className="text-xs pt-10 flex gap-4 items-center ">
                                                                <i className="fa-solid fa-star"></i>
                                                                <span className='text-black flex items-center'> {data?.service_rating || '0'}  Rating</span>
                                                            </span>
                                                        </p>
                                                        <button onClick={() => handleNavigate(data)} className="bg-primary button rounded text-sm  px-20 py-5  cursor-pointer text-nowrap !text-white">View</button>
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
                                    <p className='font-semibold mt-10  text-md xl:text-xl'>Loading....</p>
                                </div>
                            )
                        }



                    </div>
                </div>
            </div>
        </div >
    )
}

export default SearchList
