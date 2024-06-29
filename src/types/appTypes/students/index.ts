import { IBaseResponseList } from 'types/baseEntity';
import { IGradesItemDto } from '../grades';

export interface IStudentListDto extends IBaseResponseList<IStudentItemDto> {}

export interface ICreateStudentDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  city: string;
  phone: string;
  remarks: string;
  grade: string;
  gender: string;
}
export interface IStudentItemDto {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  city: string;
  phone: string;
  remarks: string;
  grade: IGradesItemDto;
  gender: IGradesItemDto;
}
