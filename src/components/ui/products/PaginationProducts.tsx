import React from 'react'

import ReactPaginate from 'react-paginate'

interface PaginationProps {
    pageCount: number
    onPageChange: (event: { selected: number }) => void
    currentPage: number
}

export default function PaginationProducts({ pageCount, onPageChange, currentPage }: PaginationProps) {
    return (
        <div className="flex flex-row justify-between items-center gap-4 mt-16">
            <div className="text-orange-500 font-medium">
                Menu {currentPage + 1} of {pageCount}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                className="flex items-center gap-2"
                pageClassName="px-3 py-1 rounded-md hover:bg-orange-100 transition-colors duration-200"
                previousClassName="px-3 py-1 rounded-md hover:bg-orange-100 transition-colors duration-200"
                nextClassName="px-3 py-1 rounded-md hover:bg-orange-100 transition-colors duration-200"
                activeClassName="bg-orange-500 font-bold text-white"
                activeLinkClassName="text-white"
                disabledClassName="opacity-50 cursor-not-allowed"
                forcePage={currentPage}
            />
        </div>
    )
} 