export class SubCriteriaDto {
  readonly id: string;
  readonly name: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
  }
}