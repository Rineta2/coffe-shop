import { useState } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentItems: T[];
  pageCount: number;
  currentPage: number;
  handlePageChange: (event: { selected: number }) => void;
}

export function usePagination<T>({
  items,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);

  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return {
    currentItems,
    pageCount,
    currentPage,
    handlePageChange,
  };
}
