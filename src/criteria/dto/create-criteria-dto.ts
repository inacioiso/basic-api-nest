import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCriteriaDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsUUID()
    disciplineId!: string;
}