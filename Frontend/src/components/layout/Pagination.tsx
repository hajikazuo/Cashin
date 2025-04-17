import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Pagination
      count={totalPages} 
      page={currentPage} 
      onChange={handleChange}
      color="primary" 
      variant="outlined"
      shape="rounded"
      sx={{ mt:2 }}
    />
  );
};

export default CustomPagination;