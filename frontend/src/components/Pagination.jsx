import React, { useEffect, useState } from 'react'

const Pagination = React.memo(({ DataList, limit = 6, children, targateRef }) => {


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = limit;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = DataList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(DataList.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
            targateRef.current?.scrollIntoView({

                block: "start",
            });
        };

    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        };
        targateRef.current?.scrollIntoView({

            block: "start",
        });
    }

    return (
        <>
            {children(currentItems)}

            {DataList.length > itemsPerPage && (
                <div className="flex items-center justify-center mt-10 gap-10 mt-10">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="cursor-pointer hover:text-primary bg-white px-10 py-5 rounded shadow disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="cursor-pointer px-10 py-5 rounded shadow bg-white hover:text-primary disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

        </>
    )
})

export default Pagination
