import { IBaseResponseList, ITranslationItemDto } from 'types/baseEntity';

export interface IGradesListDto extends IBaseResponseList<IGradesItemDto> {}

export interface IGradesItemDto extends ITranslationItemDto {}
