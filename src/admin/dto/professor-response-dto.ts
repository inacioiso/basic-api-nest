import { DisciplineDto } from "./discipline-dto";

type ProfessorResponseData = {
    id: string;
    name: string;
    email: string;
    disciplines?: DisciplineDto[];
}

export class ProfessorResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly disciplines?: DisciplineDto[];

  constructor(professor: ProfessorResponseData) {
    this.id = professor.id;
    this.name = professor.name;
    this.email = professor.email;
    this.disciplines = professor.disciplines;
  }
}
