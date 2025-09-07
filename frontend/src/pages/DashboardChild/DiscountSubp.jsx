import React, { lazy, Suspense, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FallbackLoader from '../../components/FallbackLoader';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from '../../Context/SnackbarContext';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import PopUp from '../../components/PopUp';



const Table = lazy(() => import("../../components/Table"));
import { useUserDataContext } from '../../Context/Userdata';
import NotFound from '../NotFound';
import { GetDiscountsByServiceApi } from '../../APIs/GetDiscountsByServiceApi';
import { UpdateDiscountsApi } from '../../APIs/UpdateDiscountsApi';



const DiscountSubp = () => {
    const [search, setSearch] = useState('');
    const { setSnackbar } = useSnackbar();

    const { userdata, profileLoading, profileDetails } = useUserDataContext();
    const [discountList, setDiscountList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [originalDiscountList, setOriginalDiscountList] = useState([]);





    useEffect(() => {
        if (profileDetails) {
            setDiscountList(profileDetails.data.services);
            setOriginalDiscountList(profileDetails.data.services);
        }

    }, [profileDetails])



    if (profileLoading) {
        return <FallbackLoader />;
    }
    if (!profileDetails) {
        return <NotFound />;
    }



    const handleDiscountChange = (id, value) => {
        setDiscountList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, discount: value } : item
            )
        );
    };
    const handleSaveAll = async () => {
        const hasChanges = JSON.stringify(discountList) !== JSON.stringify(originalDiscountList);

        if (!hasChanges) {
            setSnackbar({
                open: true,
                message: "No changes to save",
                type: "warning",
            });
            return; 
        }



        setLoading(true);
        try {
            await UpdateDiscountsApi(userdata?.token, discountList);
            setIsEditing(false);
            setSnackbar({
                open: true,
                message: "Discounts updated successfully!",
                type: "success",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Failed to update discounts",
                type: "error",
            });
        } finally {
            setLoading(false)
        }
    };



    const columns = [
        { field: "discount_name", headerName: "Name", flex: 1 },
        {
            field: "discount",
            headerName: "Discount (%)",
            flex: 1,
            renderCell: (params) =>
                isEditing ? (
                    <input
                        type="number"
                        value={params.row.discount}
                        onChange={(e) =>
                            handleDiscountChange(params.row.id, e.target.value)
                        }
                        className="border border-lightgary outline-none rounded px-10 w-full"
                    />
                ) : (
                    params.row.discount
                )
        }
    ];



    // const [filterList, setFilterList] = useState(discountList);
    // useEffect(() => {
    //     if (search.trim() === "") {
    //         setFilterList(discountList);
    //     } else {
    //         const filtered = discountList.filter((row) =>
    //             row.discount_name?.toLowerCase().includes(search.toLowerCase())
    //         );
    //         setFilterList(filtered);
    //     }
    // }, [search, discountList]);





    return (
        <section className='h-full w-full flex align-center justify-center'>
            <section className='h-full w-full  p-20 pb-40 sm:p-10 ' >
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-semibold text-secondary'>Discounts</h2>
                    <div className='flex gap-10'>
                        {/* <div className='flex items-center border border-lightgary py-5 px-10 rounded gap-5 bg-[#F4F4FF]   '>
                            <SearchIcon className='text-gary' />

                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='outline-none text-sm  ' placeholder='Seach Discount' />
                        </div> */}
                        {isEditing && (<button onClick={() => setIsEditing(false)} style={{ background: '#767575' }} className='button text-white font-semibold rounded py-5 px-10  text-sm cursor-pointer text-nowrap '>Cancel</button>)}
                        {isEditing ? (
                            <button
                                disabled={loading}
                                onClick={handleSaveAll}
                                className={`button ${loading ? 'opacity-50 ' : ''} bg-primary font-semibold rounded py-5 px-10 text-white text-sm cursor-pointer text-nowrap flex items-center gap-5`}
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>
                        ) : (
                            <Tooltip title='Edit' >
                                <button

                                    onClick={() => setIsEditing(true)}
                                    className={`button  bg-primary font-semibold rounded py-5 px-10 text-white text-sm cursor-pointer text-nowrap flex items-center gap-5`}
                                >
                                    <EditSquareIcon className="mr-2" sx={{ height: 18, width: 18 }} />
                                    Edit
                                </button>
                            </Tooltip>
                        )}

                    </div>
                </div>
                <div className='mt-20 '>
                  

                        <Table rows={discountList} columns={columns} />

                   
                </div>
            </section>




        </section>
    )
}

export default DiscountSubp
