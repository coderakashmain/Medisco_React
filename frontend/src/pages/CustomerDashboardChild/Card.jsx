import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useScreen } from '../../Context/ScreenProvider'
import CardLayout from '../../components/CardLayout';
import { useQrcode } from '../../Context/QrCodeProvider';
const PopUp = lazy(() => import('../../components/PopUp'))
const AddMember = lazy(() => import('./AddMember'))
import FallbackLoader from '../../components/FallbackLoader';
import { updateCardNo } from '../../APIs/updateCardNo';
import { useSnackbar } from '../../Context/SnackbarContext';
import { useCustomerData } from '../../Context/CustomerData';
import { useNavigate } from 'react-router-dom';
import { getFamilyMembers } from '../../APIs/GetFamilyMembersApi';
import MemberCard from './MemberCard';
const Card = () => {
    const { isMobile } = useScreen();
    const { qrCode, fetchQrcode } = useQrcode();
    const [activecard, setActiveCard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cardNo, setCardNo] = useState(null);
    const { setSnackbar } = useSnackbar();
    const { customerData, profileDetails } = useCustomerData();
    const navigate = useNavigate();
    const [addMemberPage, setAddMemberPage] = useState(false);
    const [memberList, setMemberList] = useState([])

    const fetchMemberList = async () => {
        const memberlist = await getFamilyMembers(customerData?.token)
        setMemberList(memberlist.data);
        sessionStorage.setItem("memberlist", JSON.stringify(memberlist));
    }

    useEffect(() => {
        if (customerData?.token) {
            const data = sessionStorage.getItem("memberlist");

            const memberlist = JSON.parse(data);
            if (memberlist) {
                setMemberList(memberlist.data);
            } else {

                fetchMemberList();
            }
        }

    }, [])




    const handlechange = (e) => {
        let input = e.target.value.replace(/\D/g, "");

        if (input.length > 16) return;

        const formattedCardNumber = input
            .replace(/(.{4})/g, "$1 ")
            .trim();

        setCardNo(formattedCardNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cardNo) return;
        const cleanNumber = cardNo.replace(/\s/g, "");

        if (cleanNumber.length !== 16) {
            return setSnackbar({
                open: true,
                message: 'Enter valid sixteen digit number!',
                type: 'warning'
            });
        }
        setLoading(true);
        try {
            const res = await updateCardNo(customerData.token, cleanNumber);


            setSnackbar({
                open: true,
                message: "Card number updated successfully",
                type: "success"
            });
            fetchQrcode();
            setActiveCard(false);

        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message,
                type: "error"
            });
        }
    }

    const hanldeFamillyAdd = () => {
        setAddMemberPage(true);
    };

    const handleClick = () => {
        navigate("/#payment-button");
    };
    const planId = profileDetails?.data?.plan_id;
    const maxMembers = planId === 1 ? 1 : 4;

    const canAddMember =
        profileDetails?.data?.card_no &&
        memberList.length < maxMembers;
    return (
        <section style={{ minHeight: '500px' }} className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>
            <div className='flex justify-between items-center mb-20'>
                <h1 className=' text-xl font-semibold'>Card</h1>

                <div className='flex gap-5'>
                    {!profileDetails?.data?.plan && (<button onClick={handleClick} style={{ background: 'purple', borderRadius: '1rem' }} className=' font-bold active px-10 py-5 rounded text-white text-sm cursor-pointer'>
                        Buy a Plan
                    </button>)}
                    {canAddMember&& (<button onClick={hanldeFamillyAdd} className='bg-primary font-bold active px-10 py-5 rounded text-white text-sm cursor-pointer'>
                        Add Family Member
                    </button>)}
                    {!qrCode?.data?.card_no && profileDetails?.data.plan && (<button onClick={() => {
                        const aadhaar = profileDetails?.data?.adhaar_no;

                        if (!aadhaar || aadhaar.trim().toLowerCase() === "xxxx") {
                            setSnackbar({
                                open: true,
                                message: "Update your Aadhaar card first!",
                                type: "error"
                            });
                            return;
                        }

                        setActiveCard(true);
                    }} className='bg-primary font-bold active px-10 py-5 rounded text-white text-sm cursor-pointer'>
                        Activate Card
                    </button>)}

                </div>



            </div>

            <div className={`flex flex-wrap gap-20 ${qrCode?.data?.card_no ? "flex-row" : 'flex-col'}`}>
                <CardLayout />

                {profileDetails?.data?.plan && (
                    <div style={{ maxWidth: "25rem", flex: 1 }} className="select-none">
                        <div
                            style={{
                                background: "#ffffff",
                                borderRadius: "14px",
                                padding: "22px",
                                border: "1px solid #E5E7EB",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Header */}
                            <div style={{ marginBottom: "18px" }}>
                                <h1
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        color: "#1F2937",
                                        letterSpacing: "0.2px",
                                    }}
                                >
                                    Plan Details
                                </h1>
                                <div
                                    style={{
                                        height: "2px",
                                        width: "36px",
                                        background: "var(--color-primary)",
                                        borderRadius: "4px",
                                        marginTop: "6px",
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div style={{ fontSize: "13px", color: "#374151" }}>
                                {/* Plan Name */}
                                <div className="flex justify-between" style={{ marginBottom: "10px" }}>
                                    <span style={{ color: "#6B7280" }}>Plan Name</span>
                                    <span style={{ fontWeight: 600 }}>
                                        {profileDetails?.data.plan_name}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex justify-between" style={{ marginBottom: "10px" }}>
                                    <span style={{ color: "#6B7280" }}>Plan Price</span>
                                    <span style={{ fontWeight: 600 }}>
                                        ₹{profileDetails?.data.price}
                                    </span>
                                </div>

                                {/* Members */}
                                <div className="flex justify-between" style={{ marginBottom: "14px" }}>
                                    <span style={{ color: "#6B7280" }}>Members Allowed</span>
                                    <span style={{ fontWeight: 600 }}>
                                        {profileDetails?.data.plan_id === 1 && "1"}
                                        {profileDetails?.data.plan_id === 2 && "4"}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="flex justify-between items-center">
                                    <span style={{ color: "#6B7280" }}>Plan Status</span>

                                    {profileDetails?.data.valid_plan === "Yes" ? (
                                        <span
                                            style={{
                                                background: "#DCFCE7",
                                                color: "#15803D",
                                                padding: "4px 14px",
                                                borderRadius: "999px",
                                                fontSize: "11px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Active
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                background: "#FEE2E2",
                                                color: "#B91C1C",
                                                padding: "4px 14px",
                                                borderRadius: "999px",
                                                fontSize: "11px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Not Active
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className="mt-40">
                <h2 className="font-semibold select-none text-xl mb-6">
                    Members
                </h2>

                <div className="space-y-10 mt-10">
                    {memberList.length > 0 ? memberList.map(member => (
                        <div key={member.id} className='mb-10'>

                            <MemberCard member={member} />
                        </div>
                    )) : (<div style={{
                        borderRadius: '4rem',
                        padding: "10px 0",
                        fontSize: "13px",
                        // color: "#444",
                        color: "#777",
                        background: "#f3f3f3",
                    }}
                        className='text-center flex itemc-center justify-center select-none'
                    >
                        No member
                    </div>)}
                </div>
            </div>





            {activecard && (


                <Suspense fallback={<FallbackLoader fixed={true} />}>
                    <PopUp>

                        <div style={{ width: isMobile ? '97vw' : '30rem' }} className={`profile-edit-box  relative   bg-white shadow  rounded-[10px] max-h-[80vh]  `}>
                            <div className='h-full w-full p-20 pb-40 sm:p-10'>
                                <div className='flex justify-between items-center'>
                                    <h3 className='font-semibold text-primary'>Active your Card</h3>
                                    <button
                                        onClick={() => setActiveCard(false)}
                                        className='close-btn  '><i className="fa-solid fa-xmark"></i></button>

                                </div>
                                <div className='mt-50 '>

                                    <form onSubmit={handleSubmit} >
                                        <p className='text-gary text-xs select-none'>Enter a Card Number</p>
                                        <input
                                            type="text"
                                            value={cardNo}
                                            onChange={handlechange}
                                            maxLength={19}
                                            placeholder="xxxx xxxx xxxx xxxx"
                                            className="border border-lightgary px-10 py-5 outline-none w-full rounded"
                                        />

                                        <button type='submit' disabled={loading} style={{ opacity: loading ? '0.5' : '' }} className='rounded px-10 mt-20 mb-20  py-5 bg-primary text-white block float-right  text-sm font-semibold cursor-pointer'>{loading ? "Activating..." : 'Active'}</button>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </PopUp>
                </Suspense>


            )}

            {addMemberPage && (
                <Suspense fallback={<FallbackLoader fixed={true} />}>

                    <AddMember customerData={customerData} onClose={() => {
                        setAddMemberPage(false);
                        fetchMemberList()
                    }} />
                </Suspense>
            )}
        </section>
    )
}

export default Card
