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
        Showing{' '}
        {perPage * currentPage - (perPage - 1)}{' '}
        -
        {perPage * currentPage > page?.totalCount
          ? page?.totalCount
          : perPage * currentPage}{' '}
        out of {page?.totalCount}
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
