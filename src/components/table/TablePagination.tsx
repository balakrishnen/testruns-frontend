import React from 'react';
import { Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface CommonPaginationProps {
  currentPage: number;
  perPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  currentPageNumber: any[];
  totalRecords: any[];
}

const TablePagination: React.FC<any> = ({
  currentPage,
  perPage,
  handlePageChange,
  currentPageNumber,
  totalRecords,
  page
}) => {
  return (
    <Box className="show-page">
      <Typography>
        Showing {currentPage} - {perPage} out of {perPage * page?.totalPages}
      </Typography>
      <Pagination
        count={page?.totalPages}
        variant="outlined"
        shape="rounded"
        page={page?.currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default TablePagination;
