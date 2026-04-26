import { CriteriaDto } from "./criteria-dto";

export class DisciplineDto {
  readonly id: string;
  readonly name: string;
  readonly criteria?: CriteriaDto[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.criteria = data.criteria?.map(
      (crit) => new CriteriaDto(crit),
    );
  }
}