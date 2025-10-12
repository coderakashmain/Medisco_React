import React, { lazy, useEffect, useRef, useState } from 'react'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './Home.css'
import { useSnackbar } from '../Context/SnackbarContext'
import shape3 from '../assets/img/shaps-3.png'
import shape1 from '../assets/img/shaps-1.png'
import shape2 from '../assets/img/shaps-2.png'
import shape4 from '../assets/img/shaps-4.png'
import shape5 from '../assets/img/shaps-5.png'
import shape6 from '../assets/img/shaps-6.png'
import shape7 from '../assets/img/shaps-7.png'
import shape8 from '../assets/img/shaps-8.png'
import hero from '../assets/img/hero-img-3.png'
import team1 from '../assets/img/team-1.png'
import team2 from '../assets/img/team-2.png'
import team3 from '../assets/img/team-3.png'
import dotsimg from '../assets/img/dots-img.png'
import photo1card from '../assets/img/photo-1-card.png'
import signature from '../assets/img/signature.png'
import about2 from '../assets/img/about-2.jpg'
import healthimg3 from '../assets/img/health-img-3.png'
import healthimg2 from '../assets/img/health-img-2.png'
import healthimg1 from '../assets/img/health-img-1.png'
import whyusphoto1 from '../assets/img/why-us-photo-1.png'
import chooseuslogo from '../assets/img/choose-us-logo.png'
import circleimage from '../assets/img/circle-image.png'
import pricingplanshap from '../assets/img/pricing-plan-shap.png'
import pricingplanshap1 from '../assets/img/pricing-plan-shap-1.png'
import { useServiceListContex } from '../Context/Services';
import { createSearchParams, NavLink, useNavigate } from 'react-router-dom';
import { useStatesContext } from '../Context/States';
import { useDistrictsContext } from '../Context/Districts';
import Loading from '../components/Loading';
import ServicesSlider from '../components/ServicesSlider ';
import ReviewSlider from '../components/ReviewSlider';
import BrandSlider from '../components/BrandSlider';
import DropdownOff from '../components/DropdownOff';


const Home = () => {
  const [searchData, setSearchData] = useState({
    state: '',
    city: '',
    organization_name: '',
    service_id: '',
    service_name: ''
  })
  const { setSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { services } = useServiceListContex();
  const { statesList, stateLoading } = useStatesContext();
  const { districtsList, setState, districtLoading } = useDistrictsContext();
  const [hideDropdown, setHideDropdown] = useState(false);
  const [filterList, setFilterList] = useState([])
 



useEffect(() => { 
  if (districtsList.length === 0) {
    setSearchData((prev) => ({
      ...prev,
      city: '',
    }));
  }
},[districtsList]);


  useEffect(() => {
    if (!services) return;
    if (!searchData.organization_name.trim()) {
      setFilterList([]);
      return;
    } else {
      setHideDropdown(true);
    }

    const filterList = services?.data.filter((data) =>
      data.service_name.toLowerCase().includes(searchData.organization_name.toLowerCase())
    );

    setFilterList(filterList);
  }, [searchData.organization_name, services]);



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
  }, [searchData.service_name, services, searchData.organization_name]);








  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchData.service_id) {
      setSnackbar({ open: true, message: 'Service name is required.', type: "error" })
      return;
    }
    navigate({
      pathname: "/search_result",
      search: `?${createSearchParams(searchData)}`
    }, { state: { searchdata : searchData } });
  }







  return (
    <>
      <section className="bg-[#F4F4FF] pt-100 overflow-hidden" >
        <div className="container lg:pb-80">
          <div className="grid grid-cols-12 items-center">
            <div className="lg:col-span-6 col-span-12">
              <div className="relative">
                <span
                  className="xxl:text-xxl sm:text-lg text-sm uppercase font-bold text-secondary"
                ><i className="fa-solid fa-heart pr-10 text-[#FC4F4F]"></i> Affordable Care, Better Living</span
                >
                <div className="relative">
                  <h1
                    className="xxl:text-7.3xl xl:text-6xl md:text-5.2xl sm:text-4.3xl text-4.75xl font-bold mb-20 uppercase font-sora text-secondary leading-[1.2]"
                  >
                    Your <span className="text-primary">Health</span> Your Savings
                  </h1>
                  <img
                    src={shape3}
                    alt="img"
                    className="absolute xl:-top-40 -top-26 xxl:right-0 xl:right-66 lg:right-55 md:right-148 sm:right-50 right-8 shaps-3 animate-bellring max-xl:w-50"
                  />
                </div>
                <p
                  className="xxl:text-xxl xl:text-xl text-lg leading-32 xl:leading-34 pb-45 text-gary font-normal"
                >
                  With MeDiSco Discount Cards, you can access top hospitals,
                  pharmacies, and diagnostic centers at affordable prices.
                  Better healthcare doesn’t have to mean higher costs.
                </p>
                <div className="flex items-center gap-18 max-xl:flex-wrap">
                  <a href="about.html" className="btn"
                  ><span>Learn More<i className="fa-solid fa-arrow-right"></i></span
                  ></a>
                  <ul className="flex ml-14 experience-team">
                    <li className="-ml-15">
                      <img
                        src={team1}
                        alt="img"
                        className="max-xxl:w-50"
                      />
                    </li>
                    <li className="-ml-15">
                      <img
                        src={team2}
                        alt="img"
                        className="max-xxl:w-50"
                      />
                    </li>
                    <li className="-ml-15">
                      <img
                        src={team3}
                        alt="img"
                        className="max-xxl:w-50"
                      />
                    </li>
                    <li className="-ml-15"><a href="javascript:void(0);">+</a></li>
                  </ul>
                  <div>
                    <h6 className="font-bold text-secondary font-sora text-base">
                      2000+
                    </h6>
                    <span className="text-secondary max-xxl:text-xs"
                    >   Members Saved</span
                    >
                  </div>
                </div>
              </div>
              <div className="flex xl:gap-60 sm:gap-40 gap-20 pt-50">
                <div>
                  <h2
                    data-max="500"
                    className="counter xl:text-5.1xl md:text-4.5xl text-2.3xl font-bold text-secondary font-sora"
                  >
                    <span>+</span>
                  </h2>
                  <span
                    className="text-secondary max-md:text-xs max-md:leading-18 max-md:block"
                  >     Partner Hospitals</span
                  >
                </div>
                <div>
                  <h2
                    data-max="2"
                    className="counter xl:text-5.1xl md:text-4.5xl text-2.3xl font-bold text-secondary font-sora"
                  >
                    <span>K+</span>
                  </h2>
                  <span
                    className="text-secondary max-md:text-xs max-md:leading-18 max-md:block"
                  >     Diagnostics Covered</span
                  >
                </div>
                <div>
                  <h2
                    data-max="100"
                    className="counter xl:text-5.1xl md:text-4.5xl text-2.3xl font-bold text-secondary font-sora"
                  >
                    <span>%</span>
                  </h2>
                  <span
                    className="text-secondary max-md:text-xs max-md:leading-18 max-md:block"
                  > Savings on Bills</span
                  >
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 lg:h-full ">
              <div className="relative  lg:h-full">
                <img
                  src={hero}
                  alt="img"
                  className="4xl:max-w-[125%] max-xl:mt-150 max-lg:mt-50 lg:absolute lg:bottom-0  "
                />
                <ul className="shaps">
                  <li className="absolute">
                    <img
                      src={shape1}
                      alt="img"
                      className="max-w-[125%] animate-topshap max-md:w-70"
                    />
                  </li>
                  <li className="absolute">
                    <img
                      src={shape2}
                      alt="img"
                      className="max-w-[125%] animate-topshap max-md:w-130 max-sm:w-70"
                    />
                  </li>
                  <li className="absolute">
                    <img
                      src={shape4}
                      alt="img"
                      className="max-w-[125%] animate-fa-spin"
                    />
                  </li>
                  <li className="absolute">
                    <img
                      src={shape5}
                      alt="img"
                      className="max-w-[125%] animate-fa-spin"
                    />
                  </li>
                  <li className="absolute">
                    <img
                      src={shape6}
                      loading='lazy'
                      alt="img"
                      className="max-w-[125%] animate-fa-spin"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Search Space Section --> */}

      <section className="lg:pt-100 md:pt-90 pt-50 " id="search-space ">
        <div className="container ">
          <form onSubmit={handleSubmit} id="search-form ">
            <h2
              className="text-center text-secondary lg:pb-70 sm:pb-50 pb-40 xxl:text-6xl xl:text-5xl md:text-4xl sm:text-3xl text-xl font-extrabold"
            >
              Find The Service You Want
            </h2>
            <div className='search-space-box '>

             


              <div style={{width : '40%'}}  className="search-space-right-box ">
                <div className=" search-space-right-box-1 border border-lightgary p-7 rounded  ">
                  <i className="fa-solid fa-magnifying-glass text-gary"></i>

                  <select
                    name="service_name"
                    id="services"
                    className={`bg-white rounded   flex-grow outline-none overflow-hidden text-sm ${searchData.service_name ? '' : 'text-gary'}`}
                    value={searchData.service_name}
                    onChange={(e) => setSearchData({ ...searchData, service_name: e.target.value })}
                  >
                    <option className='text-sm' value="" >Search By Service</option>
                    {services.status && services.data.map((service, index) => (
                      <option className='text-sm p-10' key={index} value={service.service_name}>{service.service_name}</option>

                    ))}



                  </select>

                </div>

                



              </div>

               <div  style={{width : '60%'}}
                className="search-space-left-box "
              >

                <div className="search-space-left-box-1  border border-lightgary  rounded ">
                  <i className="fa-solid fa-location-dot text-gary "></i>
                  <select name="states" id="states-box" className={`bg-white rounded text-sm ${searchData.state ? '' : 'text-gary'}`} onChange={(e) => {
                    setSearchData({ ...searchData, state: e.target.value });
                    setState(e.target.value)
                  }} defaultValue="">
                    <option className='text-sm' value="">Search By State</option>
                    {statesList.status && statesList.data.map((state, index) => (
                      <option className='text-sm ' key={index} value={state}>{state}</option>

                    ))}
                    {stateLoading && (<option className='text-sm' disabled>Loading...</option>)}
                  </select>

                </div>
                <div className=" search-space-left-box-2 border border-lightgary p-7 rounded  ">
                  <i className="fa-solid fa-location-dot text-gary"></i>

                  <select disabled={districtLoading} name="city" id="city" className={`bg-white outline-none text-sm  py-5 flex-grow ${districtLoading ? 'opacity-50' : ''} ${searchData.city ? '' : 'text-gary'}`}
                    onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
                    defaultValue="">
                    <option className='text-sm' >Search By City</option>
                    {districtsList.status && districtsList.data.map((district, index) => (
                      <option className='text-sm' key={index} value={district}>{district}</option>

                    ))}
                  </select>
                  {districtLoading && (<Loading size='20px' />)}
                </div>
                <button type="submit" className="cursor-pointer button bg-primary px-20 py-10 text-white rounded "><i className="fa fa-search"></i>
                </button>

              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="lg:pt-120 md:pt-80 pt-60" id="services">
        <div className="container">
          <div className="xl:pb-50 lg:pb-40 pb-30 w-[fit-content]">
            <span
              className="capitalize font-semibold xxl:text-xxl xl:text-xl sm:text-lg text-base text-primary font-sora pb-5 block"
            ># Our Services</span
            >
            <h2
              className="xl:text-5xl md:text-4xl sm:text-3xl text-2.5xl font-semibold text-secondary font-sora leading-[1.2]"
            >
              Services We Offered.
            </h2>
          </div>

          <ServicesSlider services={services} />

        </div>
      </section>

      <section className="lg:py-120 md:py-80 py-60" id="about">
        <div className="container">
          <div className="grid grid-cols-12 gap-25">
            <div className="lg:col-span-6 col-span-12">
              <div className="w-full group">
                <figure className="overflow-hidden">
                  <img
                    loading='lazy'
                    src={photo1card}
                    alt="img"
                    className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500"
                  />
                </figure>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12">
              <div className="lg:ml-16">
                <span
                  className="capitalize font-semibold xxl:text-xxl xl:text-xl sm:text-lg text-base text-primary font-sora pb-6 block"
                ># About Us</span
                >
                <h2
                  className="xxl:text-4.8xl xl:text-4xl sm:text-3xl text-2xl font-semibold text-secondary xl:leading-[1.2] font-sora"
                >
                  Making Healthcare Affordable and Accessible.
                </h2>
                <p
                  className="text-base leading-28 text-gary font-normal xl:mt-25 mt-20 leading-30"
                >
                  At MeDiSco, we believe quality healthcare should never be out of reach.
                  Our medical discount cards help individuals and families save on hospital
                  visits, medicines, diagnostics, and wellness services. By partnering with
                  trusted healthcare providers, we bring affordability, convenience, and
                  support under one roof—empowering you to focus on your health without
                  financial stress.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 lg:mt-40 mt-15 gap-25">
            <div className="lg:col-span-5 col-span-12">
              <div className="max-lg:pb-15">
                <ul className="pt-40 pb-34">
                  <li
                    className="pb-21 font-semibold font-sora pl-20 relative text-secondary before:absolute before:size-10 before:bg-primary before:rounded-full before:left-0 before:top-8 max-xl:text-sm"
                  >
                    Making healthcare affordable with exclusive discounts
                  </li>
                  <li
                    className="pb-21 font-semibold font-sora pl-20 relative text-secondary before:absolute before:size-10 before:bg-primary before:rounded-full before:left-0 before:top-8 max-xl:text-sm"
                  >
                    Partnering with trusted hospitals, pharmacies, and wellness centers
                  </li>
                  <li
                    className="pb-21 font-semibold font-sora pl-20 relative text-secondary before:absolute before:size-10 before:bg-primary before:rounded-full before:left-0 before:top-8 max-xl:text-sm"
                  >
                    Ensuring savings on medicines, diagnostics, and treatments
                  </li>
                  <li
                    className="pb-21 font-semibold font-sora pl-20 relative text-secondary before:absolute before:size-10 before:bg-primary before:rounded-full before:left-0 before:top-8 max-xl:text-sm"
                  >
                    Empowering individuals and families with accessible healthcare
                  </li>
                </ul>
                <div className="flex items-center">
                  <a href="about.html" className="btn two"
                  ><span
                  >More About Us<i className="fa-solid fa-arrow-right"></i></span
                    ></a>
                  <img
                    loading='lazy'
                    src={signature}
                    alt="img"
                    className="sm:ml-30 ml-20 sm:border-l sm:border-[#D8D8D8] sm:pl-30 py-20 sm:py-10"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="w-full group">
                <figure className="overflow-hidden">
                  <img
                    loading='lazy'
                    src={about2}
                    alt="img"
                    className="w-full group-hover:scale-[1.1] group-hover:rotate-[3deg] duration-500"
                  />
                </figure>
              </div>
            </div>
            <div
              className="lg:col-span-3 col-span-12 flex justify-center flex-wrap max-lg:gap-30"
            >
              <div className="sm:pb-17 lg:flex justify-center flex-wrap">
                <div className="xl:w-150 progressbar text-center">
                  <div className="circle" data-percent="85">
                    <div
                      className="text-secondary absolute top-[44%] left-1/2 -mt-20 -ml-86 w-full text-center xl:leading-40 leading-28 text-4xl xl:[transform:translate(10px,10px)] [transform:translate(5px,10px)] font-bold"
                    >
                      85%
                    </div>
                  </div>
                </div>
                <h2
                  className="xxl:text-lg sm:text-base text-sm font-semibold capitalize font-sora text-secondary xxl:pt-10"
                >
                  Partnered providers
                </h2>
              </div>
              <div className="sm:pb-17 lg:flex justify-center flex-wrap">
                <div className="xl:w-150 progressbar text-center">
                  <div className="circle" data-percent="60">
                    <div
                      className="text-secondary absolute top-[44%] left-1/2 -mt-20 -ml-86 w-full text-center xl:leading-40 leading-28 text-4xl xl:[transform:translate(10px,10px)] [transform:translate(5px,10px)] font-bold"
                    >
                      60%
                    </div>
                  </div>
                </div>
                <h2
                  className="xxl:text-lg sm:text-base text-sm font-semibold capitalize font-sora text-secondary xxl:pt-10"
                >
                  Average savings
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex overflow-hidden relative z-[11]">
        <div className="py-20 bg-primary flex">
          <div className="animate-scroll-one flex">
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg3}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Discounted Care
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg2}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Partner Hospitals
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg1}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Medicine Savings
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg2}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Wellness & More
              </h3>
            </div>
          </div>
          <div className="animate-scroll-one ml-60 gap-30 flex items-center">
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg3}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Discounted Care
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg2}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Partner Hospitals
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg1}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Medicine Savings
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg2}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Wellness & More
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div
        className="gap-30 flex items-center -mt-70 z-[1] md:pb-120 pb-70 -ml-10 overflow-hidden relative"
      >
        <div className="flex bg-secondary py-20 rotate-[357deg]">
          <div className="animate-scroll-two flex">
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg3}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Medical group
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg2}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Core Services
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg1}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Technology
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg2}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Health blogs
              </h3>
            </div>
          </div>
          <div className="animate-scroll-two ml-[-100%] gap-30 flex items-center">
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg3}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Medical group
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg2}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Core Services
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg1}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Technology
              </h3>
            </div>
            <div
              className="lg:ml-60 ml-33 w-[max-content] lg:gap-30 gap-20 flex items-center"
            >
              <img
                loading='lazy'
                src={healthimg2}
                alt="img"
                className="max-xxl:w-60 max-lg:w-36"
              />
              <h3
                className="xxl:text-5.2xl lg:text-4.65xl text-3xl uppercase font-bold text-white font-sora"
              >
                Health blogs
              </h3>
            </div>
          </div>
        </div>
      </div>

      <section className="xxl:pb-200 lg:pb-120 md:pb-80 pb-60">
        <div className="container">
          <div className="grid grid-cols-12 gap-25">
            <div className="lg:col-span-6 col-span-12">
              <div
                className="text-end relative before:absolute before:w-[71%] before:h-full before:bg-primary before:-left-38 before:z-[-1] before:rotate-[5deg] before:top-[13%] mt-50 lg:mr-40 max-lg:before:hidden"
              >
                <figure className="overflow-hidden">
                  <img src={whyusphoto1} alt="img" loading='lazy' className="w-full" />
                </figure>
                <div
                  className="absolute xl:top-[-15%] xl:left-[-10%] lg:top-[-11%] lg:left-[-11%] top-[-12%] left-[-6%] xl:size-200 size-170 bg-white rounded-full flex items-center justify-center max-md:size-165"
                >
                  <img
                    loading='lazy'
                    alt="img"
                    src={chooseuslogo}
                    className="size-80 p-17 bg-primary rounded-full"
                  />
                  <img
                    loading='lazy'
                    alt="img"
                    src={circleimage}
                    className="circle absolute size-auto bg-transparent p-17 mx-auto mt-10 text-center z-[1] animate-fa-spin"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12">
              <div className="pb-50 w-[fit-content]">
                <span
                  className="capitalize font-semibold xxl:text-xxl xl:text-xl sm:text-lg text-base text-primary font-sora pb-6 block"
                ># Why Choose Us</span
                >
                <h2
                  className="xl:text-5xl md:text-4xl sm:text-3xl text-2.5xl font-semibold text-secondary font-sora leading-[1.2]"
                >
                  Affordable Care Backed by Trusted Partners.
                </h2>
                <p
                  className="text-base leading-28 text-gary font-normal border-l-3 border-primary pl-27 mt-25"
                >
                  At MeDiSco, we focus on reducing the financial burden of healthcare. With
                  exclusive discounts on hospitals, medicines, diagnostics, and wellness
                  services, our platform bridges the gap between quality healthcare and
                  affordability—ensuring that individuals and families get the care they
                  need without compromise.
                </p>
              </div>
              <div
                className="sm:flex gap-20 mb-25 border-b border-[#D8D8D8] pb-25 group"
              >
                <i
                  className="bg-[#F05DA8] size-90 flex items-center justify-center mb-25 relative shadow-[#f05da866_0px_0px_24px_0px] rounded-full"
                >
                  <svg
                    className="size-90 p-20 group-hover:[transform:rotate3d(1,1,1,360deg)] duration-500"
                    width="45"
                    height="49"
                    viewBox="0 0 45 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.762 18.3703C33.762 18.0993 33.6541 17.8395 33.4621 17.6479C33.2701 17.4563 33.0097 17.3486 32.7381 17.3486H27.6191V12.2402C27.6191 11.9693 27.5112 11.7094 27.3192 11.5178C27.1272 11.3262 26.8668 11.2185 26.5953 11.2185H18.4048C18.1333 11.2185 17.8729 11.3262 17.6809 11.5178C17.4889 11.7094 17.381 11.9693 17.381 12.2402V17.3486H12.2619C11.9904 17.3486 11.73 17.4563 11.538 17.6479C11.346 17.8395 11.2381 18.0993 11.2381 18.3703V26.5437C11.2381 26.8147 11.346 27.0746 11.538 27.2662C11.73 27.4578 11.9904 27.5654 12.2619 27.5654H17.381V32.6738C17.381 32.9448 17.4889 33.2047 17.6809 33.3963C17.8729 33.5879 18.1333 33.6955 18.4048 33.6955H26.5953C26.8668 33.6955 27.1272 33.5879 27.3192 33.3963C27.5112 33.2047 27.6191 32.9448 27.6191 32.6738V27.5654H32.7381C33.0097 27.5654 33.2701 27.4578 33.4621 27.2662C33.6541 27.0746 33.762 26.8147 33.762 26.5437V18.3703Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 7.69417V23.2993C1.06016 28.4557 2.70685 33.4691 5.71707 37.6605C8.72728 41.8519 12.9556 45.0189 17.8294 46.7326L20.1248 47.5785C21.6582 48.1405 23.3418 48.1405 24.8752 47.5785L27.1706 46.7326C32.0444 45.0189 36.2727 41.8519 39.2829 37.6605C42.2932 33.4691 43.9398 28.4557 44 23.2993V7.69417C43.9979 7.08107 43.8156 6.48205 43.4757 5.97136C43.1357 5.46067 42.6531 5.06076 42.0875 4.82121C35.8846 2.23873 29.2209 0.939488 22.5 1.00216C15.7791 0.939488 9.11545 2.23873 2.91248 4.82121C2.34694 5.06076 1.86428 5.46067 1.52432 5.97136C1.18436 6.48205 1.00206 7.08107 1 7.69417Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </i>
                <div>
                  <h4
                    className="font-bold xl:text-2.3xl text-2xl pb-7 text-secondary leading-[1.2] font-sora"
                  >
                    Wide Network Access
                  </h4>
                  <p className="text-base leading-30 text-gary fobt-normal">
                    MeDiSco partners with hospitals, pharmacies, diagnostic labs, and
                    wellness centers to ensure members get trusted services with exclusive
                    discounts at every step of care.
                  </p>
                </div>
              </div>
              <div className="sm:flex gap-20 group">
                <i
                  className="bg-[#58CBF2] size-90 flex items-center justify-center mb-25 relative shadow-[#f05da866_0px_0px_24px_0px] rounded-full"
                >
                  <svg
                    className="size-90 p-20 group-hover:[transform:rotate3d(1,1,1,360deg)] duration-500"
                    width="49"
                    height="49"
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1661 36.9778C15.9035 36.3659 17.5836 35.6021 19.1869 34.6952M43.629 45.9939L42.7544 47.8331L32.2999 41.1938C31.3479 40.5881 30.6499 39.6555 30.3372 38.5713C30.0245 37.4871 30.1186 36.3261 30.6018 35.3064C31.0843 34.2865 31.9227 33.478 32.9595 33.0328C33.9962 32.5877 35.1598 32.5365 36.2316 32.889L48 36.7594L47.1254 38.5985M26.523 29.7911C31.9403 25.6919 40.8478 17.9388 40.8478 11.2811C40.8478 0.0745119 26.7846 -2.98257 22.4565 7.2043C18.1284 -2.98257 4.0652 0.0745119 4.0652 11.2811C4.0652 20.8467 21.7066 32.1841 22.4565 32.6745C24.8617 34.248 29.3185 36.1485 30.4731 35.6049M1 40.8477C1 42.7446 1.75353 44.5638 3.09483 45.9052C4.43612 47.2465 6.25531 48 8.15218 48C10.0491 48 11.8682 47.2465 13.2095 45.9052C14.5508 44.5638 15.3044 42.7446 15.3044 40.8477C15.3044 38.9508 14.5508 37.1316 13.2095 35.7903C11.8682 34.449 10.0491 33.6955 8.15218 33.6955C6.25531 33.6955 4.43612 34.449 3.09483 35.7903C1.75353 37.1316 1 38.9508 1 40.8477ZM6.10864 40.848C6.10864 41.39 6.32394 41.9097 6.70716 42.293C7.09039 42.6762 7.61016 42.8915 8.15212 42.8915C8.69409 42.8915 9.21385 42.6762 9.59708 42.293C9.98031 41.9097 10.1956 41.39 10.1956 40.848C10.1956 40.306 9.98031 39.7862 9.59708 39.403C9.21385 39.0198 8.69409 38.8045 8.15212 38.8045C7.61016 38.8045 7.09039 39.0198 6.70716 39.403C6.32394 39.7862 6.10864 40.306 6.10864 40.848Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </i>
                <div>
                  <h4
                    className="font-bold xl:text-2.3xl text-2xl pb-7 text-secondary leading-[1.2] font-sora"
                  >
                    Real Savings
                  </h4>
                  <p className="text-base leading-30 text-gary fobt-normal">
                    With discounts on doctor visits, medicines, diagnostics, and wellness
                    services, MeDiSco ensures that quality healthcare is accessible without
                    overwhelming medical costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="overflow-hidden relative bg-[#F4F4FF] lg:py-120 md:py-80 py-60 bg-[url(../img/graph.png)] " id='section-pricing'
      >
        <div className="container">
          <div className="text-center lg:mx-auto lg:w-[60%] w-full pb-50">
            <span
              className="pb-10 block font-sora font-semibold font-sora text-primary xxl:text-xxl xl:text-xl sm:text-lg text-base"
            ># Pricing Plans</span
            >
            <h2
              className="xl:text-5xl md:text-4xl sm:text-3xl text-2.5xl font-semibold text-secondary font-sora leading-[1.2]"
            >
              Simple & Affordable Options for Everyone
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-25">
            <div className="lg:col-span-4 col-span-12">
              <div
                className="bg-white p-30 relative z-[1] hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] duration-500"
              >
                <img
                  loading='lazy'
                  src={pricingplanshap}
                  className="absolute right-30 top-30"
                  alt="img"
                />
                <h5 className="font-bold pb-5 text-secondary font-sora text-xl">
                  Basic Plan
                </h5>
                <h3 className="text-5.2xl font-bold pb-10 text-secondary font-sora">
                  ₹590<span className="pl-6 text-base">/Year</span>
                </h3>
                <span>Discount Card Access</span>

                <ul
                  className="list-style border-t border-[#D8D8D8] pt-26 mt-21 pb-30 relative before:absolute before:w-1/2 before:bg-primary before:-top-px before:h-px"
                >
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                  >
                    Discounts on medicines at partnered pharmacies
                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                  >
                    Savings on doctor consultations
                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                  >
                    Access to diagnostic test discounts
                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                  >
                    Use at select healthcare providers
                  </li>

                </ul>
                <a href="pricing-table.html" className="btn two"
                ><span
                >Pick This Plan<i
                  className="fa-solid fa-arrow-right"
                ></i></span
                  ></a>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div
                className="pricing-plan two bg-primary p-30 relative z-[1] hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] duration-500"
              >
                <img
                  loading='lazy'
                  src={pricingplanshap1}
                  className="absolute right-30 top-30"
                  alt="img"
                />
                <h5 className="font-bold pb-5 text-white font-sora text-xl">
                  Standard Plan
                </h5>
                <h3 className="text-5.2xl font-bold pb-10 text-white font-sora">
                  ₹1490<span className="pl-6 text-base">/Year</span>
                </h3>
                <span className="text-white">Extended Savings</span>
                <ul
                  className="list-style border-t border-[#D8D8D8] pt-26 mt-21 pb-30 relative"
                >
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-white max-xxl:text-sm"
                  >
                    All benefits of the Basic Plan
                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-white max-xxl:text-sm"
                  >
                    Bigger discounts on hospital services
                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-white max-xxl:text-sm"
                  >
                    Dental & vision care savings
                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-white max-xxl:text-sm"
                  >
                    Priority access at partnered centers
                  </li>

                </ul>
                <a href="pricing-table.html" className="btn two"
                ><span
                >Pick This Plan<i
                  className="fa-solid fa-arrow-right"
                ></i></span
                  ></a>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div
                className="bg-white p-30 relative z-[1] hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] duration-500"
              >
                <img
                  loading='lazy'
                  src={pricingplanshap}
                  className="absolute right-30 top-30"
                  alt="img"
                />
                <h5 className="font-bold pb-5 text-secondary font-sora text-xl">
                  Premium Plan
                </h5>
                <h3 className="text-5.2xl font-bold pb-10 text-secondary font-sora">
                  ₹2990<span className="pl-6 text-base">/Year</span>
                </h3>
                <span>Comprehensive Coverage</span>
                <ul
                  className="list-style border-t border-[#D8D8D8] pt-26 mt-21 pb-30 relative before:absolute before:w-1/2 before:bg-primary before:-top-px before:h-px"
                >
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                  >
                    All benefits of the Standard Plan
                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                  >
                    Higher discounts on major treatments

                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                  >
                    Rehab, wellness & spa discounts included
                  </li>
                  <li
                    className="font-normal pb-21 font-sora pl-20 relative text-secondary max-xxl:text-sm"
                  >
                    Extended partner network coverage
                  </li>

                </ul>
                <a href="pricing-table.html" className="btn two"
                ><span
                >Pick This Plan<i
                  className="fa-solid fa-arrow-right"
                ></i></span
                  ></a>
              </div>
            </div>
          </div>
        </div>
        <ul className="shaps">
          <li className="absolute">
            <img loading='lazy' src={shape7} alt="img" className="animate-fa-spin" />
          </li>
          <li className="absolute">
            <img loading='lazy' src={shape8} alt="img" className="animate-fa-spin" />
          </li>
          <li className="absolute">
            <img
              loading='lazy'
              src={dotsimg}
              alt="img"
              className="animate-fa-spin"
            />
          </li>
          <li className="absolute">
            <img
              loading='lazy'
              src={dotsimg}
              alt="img"
              className="animate-fa-spin"
            />
          </li>
        </ul>
      </section>

      <section className="lg:py-120 md:py-80 py-60">
        <div className="container">
          <div className="text-center lg:mx-auto lg:w-[60%] w-full pb-50">
            <span
              className="pb-10 block font-sora font-semibold capitalize xxl:text-xxl xl:text-xl sm:text-lg text-base text-primary"
            ># Testimonials</span
            >
            <h2
              className="xl:text-5xl md:text-4xl sm:text-3xl text-2.5xl font-semibold text-secondary font-sora leading-[1.2]"
            >
              What Our Members Say
            </h2>
          </div>
          <ReviewSlider />

        </div>
      </section>
      <div className='overflow-hidden'>

        <BrandSlider />
      </div>



    </>
  )
}

export default Home
