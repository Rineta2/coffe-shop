import React from 'react'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
    pageCount: number
    onPageChange: (event: { selected: number }) => void
    currentPage: number
}

export default function Pagination({ pageCount, onPageChange, currentPage }: PaginationProps) {
    return (
        <div className="flex flex-row justify-between items-center gap-4 mt-6">
            <div className="text-[var(--primary)] font-medium">
                Page {currentPage + 1} of {pageCount}
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
                pageClassName="px-3 py-1 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200"
                pageLinkClassName="text-[var(--primary)]"
                previousClassName="px-3 py-1 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200"
                nextClassName="px-3 py-1 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200"
                activeClassName="bg-[var(--title)] text-white hover:bg-[var(--title)]"
                disabledClassName="opacity-50 cursor-not-allowed"
                forcePage={currentPage}
            />
        </div>
    )
} 