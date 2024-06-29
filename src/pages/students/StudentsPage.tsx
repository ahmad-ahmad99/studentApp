import { Box, Button, Card, Divider, Grid, InputAdornment, Menu, MenuItem, Pagination, Select, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useDeleteService, useGitListService } from 'services';
import { Fonts } from 'shared/constants/AppEnums';
import { IStudentItemDto, IStudentListDto } from 'types/appTypes/students';
import { STUDENT_DELETE_URL, STUDENT_LIST_URL } from '../../services/appUrls';
import { StudentsColumns } from './StudentsColumns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IntlMessages from '@crema/utility/IntlMessages';
import { useIntl } from 'react-intl';
import AppDialog from 'baseComponent/AppDialog';
import { showMessage } from 'redux/actions';
import { useDispatch } from 'react-redux';
import AddStudent from 'baseComponent/components/students/AddStudent';
import AddIcon from '@mui/icons-material/Add';
const StudentsPage = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = useState<IStudentItemDto>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [filterValue, setFilterValue] = useState('');

  //for get student List
  const { data: studentList, isFetching, error } = useGitListService<IStudentListDto>(STUDENT_LIST_URL);

  //pagination for student List from client
  const pageSizeOptions = [5, 10, 20]; // Options for number of rows per page
  const [pageSize, setPageSize] = React.useState<number>(pageSizeOptions[1]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(studentList?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  //delete student
  const deleteStudent = useDeleteService(STUDENT_DELETE_URL, STUDENT_LIST_URL, selectedRow?.id, () => {
    dispatch(showMessage(messages['deletedSuccessfully'] as string));
    setCurrentPage(1);
    setShowDeleteModal(false);
  });

  //search by first name or last name from clinet
  const filteredRows = studentList?.filter((row) => {
    const fullName = `${row.firstName} ${row.lastName}`;
    return fullName.toLowerCase().includes(filterValue.toLowerCase());
  });
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleEditStudent = (selectedRow: IStudentItemDto) => {
    setSelectedRow(selectedRow);
    setShowEditModal(true);
  };
  const handleDeleteStudent = (selectedRow: IStudentItemDto) => {
    setSelectedRow(selectedRow);
    setShowDeleteModal(true);
  };

  const columns = StudentsColumns({ handleEditStudent, handleDeleteStudent });

  return (
    <>
      <Card
        sx={{
          padding: '30px 25px 15px 25px',
          borderRadius: '11px',
          border: '1px solid #7777771A',
          boxShadow: '1.5px 2.6px 10px 0px #7777771A',
        }}
      >
        <Grid container xs={12}>
          <Grid item xs={12} md={6}>
            <Typography
              component={'p'}
              sx={{
                fontSize: '32px',
                fontWeight: 500,
                color: '#000',
              }}
            >
              <IntlMessages id='sidebar.students' />:
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} justifyContent='end' display='flex'>
            <Button
              onClick={() => {
                setShowAddModal(true);
              }}
              variant='outlined'
              endIcon={<AddIcon sx={{ fontSize: '16px', color: '#fff' }} />}
              sx={{
                border: '1px solid #1F7BF4',
                color: '#fff',
                backgroundColor: '#1F7BF4',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: '#1F7BF4',
                },
                borderRadius: '11px',
                fontSize: '16px',
                padding: '12px 20px',
                fontWeight: 400,
              }}
            >
              <IntlMessages id='common.add.student' />
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} display='flex' alignItems='center' sx={{ marginTop: '15px' }}>
          <img src='./assets/images/filter.png' width='20px' height={'100%'} />
          <Typography
            component={'span'}
            sx={{
              fontSize: '15px',
              fontWeight: 400,
              margin: '0px 10px',
              color: '#1F7BF4',
            }}
          >
            <IntlMessages id='common.filterBy' /> :
          </Typography>
          <TextField
            sx={{ backgroundColor: '#F5F5F5', borderRadius: '10px', width: { sx: '100%', sm: '100%', md: '30%' } }}
            label={<IntlMessages id='common.searchFilter' />}
            variant='outlined'
            value={filterValue}
            onChange={handleFilterChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <img src='./assets/images/searchIcon.png' width='15px' />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ color: '#9999995E', borderWidth: '2px', borderRadius: '22.56px', margin: '30px 0px' }} />
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={filteredRows && filterValue ? filteredRows?.slice(startIndex, endIndex) ?? [] : studentList?.slice(startIndex, endIndex) ?? []}
            columns={columns}
            filterMode='client'
            loading={isFetching}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            disableDensitySelector={false}
            checkboxSelection={false}
            disableColumnMenu={true}
            disableSelectionOnClick={true}
            disableVirtualization={false}
            hideFooter={true}
            showCellRightBorder={false}
            showColumnRightBorder={false}
            localeText={{
              noRowsLabel: messages['common.noRows'] as string,
            }}
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd')}
            sx={{
              minHeight: 600,
              borderWidth: '0px !important',
              '& .MuiDataGrid-row.Mui-odd': {
                color: '#212224',
              },
              '& .MuiDataGrid-row:nth-child(even)': {
                backgroundColor: '#EEF5F9',
                borderRadius: '11px',
                color: '#212224',
              },
              '& .MuiDataGrid-root': {
                border: '0px',
              },
              '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                borderBottom: '0px',
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '0px',
              },
              '& .MuiDataGrid-columnHeadersInner': {
                backgroundColor: '#1F7BF4',
                color: '#FFF',
                fontSize: '18px',
                borderBottom: '0px',
                borderRadius: '11px',
                fontWeight: Fonts.SEMI_BOLD,
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-columnHeaderTitleContainer .MuiButtonBase-root': {
                color: '#fff',
              },
              '& .MuiDataGrid-virtualScrollerRenderZone': {
                paddingTop: '12px',
                color: '#212224',
                fontSize: '14px',
              },
            }}
          />
          <Grid item xs={12}>
            <Divider style={{ color: '#9999995E', borderWidth: '2px', borderRadius: '22.56px', margin: '30px 0px' }} />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                component={'p'}
                sx={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#8B909A',
                }}
              >
                <IntlMessages id='common.rows' />:
              </Typography>

              <Select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(parseInt(event?.target?.value?.toString()));
                  setCurrentPage(1); // Reset to the first page when changing the page size
                }}
                sx={{
                  width: '82px',
                  height: '38px',
                  padding: '10px 20px',
                  border: '1px solid #999999',
                  borderRadius: '11px',
                  fontSize: '15px',
                  margin: '0px 8px',
                  fontWeight: 500,

                  '& .MuiOutlinedInput-input': {
                    padding: '0px !important',
                  },
                  '& .MuiSelect-icon': {
                    margin: '0px 14px',
                    fontSize: '20px',
                    color: '#000',
                  },
                }}
                IconComponent={ExpandMoreIcon}
                // fullWidth
                variant='outlined'
                size='small'
              >
                {pageSizeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {studentList && (
              <Grid item xs={12} sm={12} md={6}>
                <Pagination
                  sx={{
                    '& .MuiPaginationItem-root': {
                      backgroundColor: '#F1F2F6',
                      borderRadius: '4px',
                      color: '#8B909A',
                      fontSize: '16px',
                      border: 0,
                      boxShadow: '0px 2px 4px 0px #A5A3AE4D',
                    },

                    '& .MuiPaginationItem-root:hover': {
                      backgroundColor: '#EEF5F9',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#1F7BF4 !important',
                      color: '#fff',
                    },

                    '& .MuiPagination-ul': {
                      justifyContent: 'end',
                    },
                  }}
                  count={totalPages}
                  page={currentPage}
                  variant='outlined'
                  shape='rounded'
                  onChange={(event, page) => setCurrentPage(page)}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Card>

      {showAddModal && <AddStudent open={showAddModal} setOpen={setShowAddModal} />}

      {showDeleteModal && (
        <AppDialog
          title='common.dialog.delete.title'
          textConfirmation='common.dialog.delete.textConfirmation'
          subAlertText='common.dialog.delete.subAlertText'
          onClickConfirmation={() => {
            deleteStudent.mutate();
          }}
          loading={deleteStudent?.isLoading}
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          confirmationTextBtn={'common.delete'}
          colorCancelBtn='#F34235'
          backgroundColorAgreeBtn={'#F34235'}
          srcIcon='./assets/images/infoCircleIcon.png'
        />
      )}
    </>
  );
};

export default StudentsPage;
