import { SubCriteriaDto } from './subcriteira-dto';

export class CriteriaDto {
  readonly id: string;
  readonly name: string;
  readonly subCriteria?: SubCriteriaDto[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.subCriteria = data.subCriteria?.map(
      (sub) => new SubCriteriaDto(sub),
    );
  }
}