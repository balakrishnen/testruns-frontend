import React from 'react';
import { Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface CommonPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  currentPageData: any[];
  Rows: any[]; 
}

const TablePagination: React.FC<CommonPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  handlePageChange, 
  currentPageData, 
  Rows 
}) => {
  


  return (
    <Box className="show-page">
      <Typography>Showing {currentPageData.length} out of {Rows.length}</Typography>
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default TablePagination;
