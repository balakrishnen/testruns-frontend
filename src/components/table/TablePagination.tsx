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
  page,
}) => {
  return (
    <Box className="show-page">
      <Typography>
        Showing {currentPageNumber} -{' '}
        {page.currentPage * perPage > Math.ceil(page?.totalCount)
          ? Math.ceil(page?.totalCount)
          : page.currentPage * perPage}{' '}
        out of {Math.ceil(page?.totalCount)}
      </Typography>
      <Pagination
        count={Math.ceil(page?.totalCount / perPage)}
        variant="outlined"
        shape="rounded"
        page={page?.currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default TablePagination;
