import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TablePagination from '../../../components/table/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddIcon from '@mui/icons-material/Add';
import { withSettingsLayout } from '../../../components/settings';
import TableHeader from '../../../components/table/TableHeader';
import { UserHeaders, UserRows } from '../../../utils/data';
import { UserRowData } from '../../../modals/user.modal';
import TableFilters from '../../../components/table/TableFilters';
import DeletePopup from '../../../components/DeletePopup';
import UserForm from './UserForm';
import Confirmationpopup from '../../../components/ConfirmationPopup';
import SuccessPopup from '../../../components/SuccessPopup';

import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from '../../../utils/common-services';
// table start

const users: UserRowData[] = UserRows;

// table end
const Users = () => {
  // const [openDlg1Dialog, setDialog1Open] = React.useState(false);
  const [headers, setHeaders] = React.useState(UserHeaders);
  // const [deletePopup, setDeletePopup] = React.useState(false);
  const [Rows, setSelectedRows] = React.useState(users);
  const [isDeselectAllChecked, setIsDeselectAllChecked] = React.useState(false);
  const [isselectAllChecked, setIsselectAllChecked] = React.useState(false);
  const [isTableHeaderVisible, setTableHeaderVisible] = React.useState(false);
  const handleRequestSort = () => {};
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const deletePopupRef: any = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(Rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const Data = Rows.slice(startIndex, endIndex);

  const handlePageChange = (even: any, page: number) => {
    setCurrentPage(page);
  };
  const [visibleRow, setVisibleRow] = React.useState<any>(Data);

  const handleChange = (event: any, id: any) => {
    handleCheckboxChange(
      Rows,
      setSelectedRows,
      setIsDeselectAllChecked,
      setIsselectAllChecked,
      setTableHeaderVisible,
      setVisibleRow,
    )(event, id);
  };

  const handleDeChange = handleDeCheckboxChange(
    isDeselectAllChecked,
    Rows,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setTableHeaderVisible,
    setVisibleRow,
  );
  const handledAllchange = handledAllSelected(
    isselectAllChecked,
    Rows,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setVisibleRow,
  );

  const handleMenuCheckboxChange = (e: any, index: any) => {
    setHeaders((prevColumns: any) => {
      return prevColumns.map((column: any, i: any) => {
        if (i === index) {
          return { ...column, is_show: !headers[index].is_show };
        }
        return column;
      });
    });
  };

  const handleCloseTableHeader = (status: boolean) => {
    setTableHeaderVisible(status);
    const updatedRows = Rows.map((row: any) => ({
      ...row,
      is_checked: false,
    }));

    setSelectedRows(updatedRows);
    setIsDeselectAllChecked(true);
    setIsselectAllChecked(false);
  };
  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  const handleSubmitFormPopup = () => {
    formPopupRef.current.open(false);
    successPopupRef.current.open(true, 'User');
    setTimeout(() => {
      successPopupRef.current.open(false, 'User');
    }, 3000);
  };

  const handleOpenConfirmationPopup = (state: any) => {
    confirmationPopupRef.current.open(state);
  };

  const handleConfirmationDone = (state: any) => {
    if (state === 1) {
      formPopupRef.current.open(false);
    }
    confirmationPopupRef.current.open(false);
  };

  const handleDeleteConfirmation = (state: any) => {
    if (state === 1) {
      deletePopupRef.current.open(false);
    }
    deletePopupRef.current.open(false);
  };

  const handleOpenDeletePopup = () => {
    deletePopupRef.current.open(true, 'User');
  };
  // table end
  return (
    <Box
      className="user-setting-page"
      style={{ padding: '24px', paddingTop: '15px' }}
    >
      <Box
        className="title-main"
        sx={{ borderBottom: '1px solid #F3F3F3', paddingBottom: '8px' }}
      >
        <Box>
          <Typography>User settings</Typography>
          <Typography className="sub-text">
            Create, edit and delete users.
          </Typography>
        </Box>
        <Button
          style={{ marginBottom: '8px', marginTop: '16px' }}
          type="submit"
          variant="contained"
          onClick={() => {
            formPopupRef.current.open(true, 'create');
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create User
        </Button>
      </Box>
      <TableFilters
        columns={headers}
        handleMenuCheckboxChange={handleMenuCheckboxChange}
        handleDeCheckboxChange={handleDeChange}
        handledAllSelected={handledAllchange}
        isDeselectAllChecked={isDeselectAllChecked}
        isselectAllChecked={isselectAllChecked}
        isTableHeaderVisible={isTableHeaderVisible}
        closeTableHeader={handleCloseTableHeader}
        deleteRecord={handleOpenDeletePopup}
        module="users"
      />

      <Box className="table-outer" sx={{ width: '100%' }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeader
              numSelected={0}
              onRequestSort={handleRequestSort}
              onSelectAllClick={function (
                event: React.ChangeEvent<HTMLInputElement>,
              ): void {
                throw new Error('Function not implemented.');
              }}
              order={'asc'}
              orderBy={''}
              rowCount={0}
              columns={headers}
            />
            <TableBody>
              {Data.map((row, index) => {
                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.name)}
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    // selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                    onClick={(e: any) =>
                      formPopupRef.current.open(true, 'edit')
                    }
                  >
                    {headers[0].is_show && (
                      <TableCell scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mt: 0, mr: 1 }}>
                            <Checkbox
                              // checked={row.is_checked}
                              color="info"
                              disableRipple
                              checked={row.is_checked}
                              onChange={(event) => handleChange(event, row.id)}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ ml: 2 }}>
                              <Box>{row.id}</Box>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                    )}
                    {headers[1].is_show && (
                      <TableCell align="center">{row.firstName}</TableCell>
                    )}
                    {headers[2].is_show && (
                      <TableCell align="center">
                        {row.providerDetails}
                      </TableCell>
                    )}
                    {headers[3].is_show && (
                      <TableCell align="center">{row.extraData}</TableCell>
                    )}
                    {headers[4].is_show && (
                      <TableCell align="center">{row.organisationId}</TableCell>
                    )}
                    {headers[5].is_show && (
                      <TableCell align="center">{row.roleId}</TableCell>
                    )}
                    {headers[6].is_show && (
                      <TableCell>
                        <Select
                          className={
                            row.status === '1'
                              ? 'active-select td-select'
                              : 'inactive-select td-select'
                          }
                          value={row.status}
                          displayEmpty
                          IconComponent={ExpandMoreOutlinedIcon}
                        >
                          <MenuItem value={1}>Active</MenuItem>
                          <MenuItem value={2}>In-Active</MenuItem>
                        </Select>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPageData={Data}
          Rows={Rows}
        />
      </Box>
      <Box>
        <UserForm
          ref={formPopupRef}
          closeFormPopup={handleCloseFormPopup}
          submitFormPopup={handleSubmitFormPopup}
        />
      </Box>
      <Box>
        <DeletePopup
          ref={deletePopupRef}
          closeDeletePopup={() => deletePopupRef.current.open(false, 'User')}
          deleteConfirmation={handleDeleteConfirmation}
        />
      </Box>
    </Box>
  );
};

const UsersPage = withSettingsLayout(Users);

export default UsersPage;
