export interface IBaseResponseList<T> extends Array<T> {}

export interface ITranslationItemDto {
  id: string;
  translations: Array<ITranslationDto>;
}
export interface ITranslationDto {
  name: string;
  cultureCode: number;
}
