import { IStudentItemDto } from 'types/appTypes/students';
import { GridColDef } from '@mui/x-data-grid';
import { useIntl } from 'react-intl';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import AppGridCell from 'baseComponent/AppGridCell';
import { getValueBasedOnCurrentLanguage } from 'helper';
interface StudentsColumnsProps {
  handleEditStudent: (selectedRow: IStudentItemDto) => void;
  handleDeleteStudent: (selectedRow: IStudentItemDto) => void;
}

export const StudentsColumns = ({ handleEditStudent, handleDeleteStudent }: StudentsColumnsProps): GridColDef[] => {
  const { messages } = useIntl();
  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: messages['student.firstName'] as string,
      flex: 2,
      renderCell: (params) => {
        return <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{params?.row?.firstName}</div>;
      },
    },
    {
      field: 'lastName',
      headerName: messages['student.lastName'] as string,
      flex: 2,

      renderCell: (params) => {
        return <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{params?.row?.lastName}</div>;
      },
    },

    {
      field: 'birthDate',
      headerName: messages['student.birthDate'] as string,
      flex: 2,
      renderCell: (params) => <AppGridCell value={moment(params?.row?.birthDate).format('YYYY-MM-DD')} />,
    },

    {
      field: 'grade',
      headerName: messages['student.grade'] as string,
      flex: 2,
      valueGetter: (params) => {
        // Extract the name of the first translation in the grade.translations array
        return getValueBasedOnCurrentLanguage(
          params?.row?.grade?.translations?.find((translationItem) => translationItem?.cultureCode === 1)?.name,
          params?.row?.grade?.translations?.find((translationItem) => translationItem?.cultureCode === 0)?.name
        );
      },
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
            <img src={'./assets/images/circleOrange.png'} width='8px' />
            <p style={{ margin: '0px 8px', fontSize: '13px' }}>
              {getValueBasedOnCurrentLanguage(
                params?.row?.grade?.translations?.find((translationItem) => translationItem?.cultureCode === 1)?.name || '',
                params?.row?.grade?.translations?.find((translationItem) => translationItem?.cultureCode === 0)?.name || ''
              )}
            </p>
          </div>
        );
      },
    },
    {
      field: 'gender',
      headerName: messages['student.gender'] as string,
      flex: 2,
      valueGetter: (params) => {
        // Extract the name of the first translation in the gender.translations array
        let genderNameAr = params?.row?.gender?.translations?.find((translationItem) => translationItem?.cultureCode === 1)?.name || '';
        let genderNameEn = params?.row?.gender?.translations?.find((translationItem) => translationItem?.cultureCode === 0)?.name || '';
        return getValueBasedOnCurrentLanguage(genderNameAr, genderNameEn);
      },
      renderCell: (params) => {
        let genderNameAr = params?.row?.gender?.translations?.find((translationItem) => translationItem?.cultureCode === 1)?.name || '';
        let genderNameEn = params?.row?.gender?.translations?.find((translationItem) => translationItem?.cultureCode === 0)?.name || '';

        return (
          <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
            <img
              src={params?.row?.gender?.translations?.some((translationItem) => translationItem?.name?.toLowerCase() === 'male') ? './assets/images/male.png' : './assets/images/femal.png'}
              width='10px'
            />
            <p style={{ margin: '0px 8px', fontSize: '13px' }}>{getValueBasedOnCurrentLanguage(genderNameAr, genderNameEn)}</p>
          </div>
        );
      },
    },
    {
      field: 'country',
      headerName: messages['student.country'] as string,
      flex: 2,
      renderCell: (params) => {
        return <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{params?.row?.country}</div>;
      },
    },
    {
      field: 'city',
      headerName: messages['student.city'] as string,
      flex: 2,
      renderCell: (params) => {
        return <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{params?.row?.city}</div>;
      },
    },
    {
      field: 'phone',
      headerName: messages['student.phone'] as string,
      flex: 2,
      renderCell: (params) => {
        return <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{params?.row?.phone}</div>;
      },
    },
    {
      field: 'remarks',
      headerName: messages['student.remarks'] as string,
      flex: 2,
      renderCell: (params) => {
        return <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{params?.row?.remarks}</div>;
      },
    },
    {
      field: 'actions',
      headerName: messages['common.actions'] as string,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() => {
                handleDeleteStudent(params?.row);
              }}
              sx={{
                width: '20px',
                height: '20px',
                backgroundColor: '#f34235',
                '&:hover': {
                  backgroundColor: '#f34235',
                },
              }}
            >
              <DeleteIcon sx={{ color: '#fff', fontSize: '16px !important' }} />
            </IconButton>
            <IconButton
              onClick={() => {
                handleEditStudent(params?.row);
              }}
              sx={{
                width: '20px',
                height: '20px',
                backgroundColor: '#000',
                margin: '0px 10px',
                '&:hover': {
                  backgroundColor: '#000',
                },
              }}
            >
              <EditIcon sx={{ color: '#fff', fontSize: '16px !important' }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  return columns;
};
