import { IBaseResponseList, ITranslationItemDto } from 'types/baseEntity';

export interface IGenderListDto extends IBaseResponseList<IGenderItemDto> {}

export interface IGenderItemDto extends ITranslationItemDto {}
