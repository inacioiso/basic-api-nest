import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateDisciplineDto } from './dto/create-discipline-dto';
import { Discipline } from '../generated/prisma/client';

@Injectable()
export class DisciplineService {

    constructor(
        private prismaService: PrismaService,
    ){}

    async createDiscipline(createDisciplineDto: CreateDisciplineDto, userId: string): Promise<Discipline> {
        
        if(!userId) {
            throw new UnauthorizedException("You are not authenticated to create a discipline.");
        }

        const professor = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            }
        })

        if(!professor || professor.role !== 'PROFESSOR') {
            throw new BadRequestException("The specified professor does not exist or is not a professor.");
        }

        const discipline = await this.prismaService.discipline.create({
            data: {
                name: createDisciplineDto.name,
                professorId: userId,
            }
        })

        return discipline;
    }

    async getDisciplinesByProfessor(professorId: string): Promise<Discipline[]> {
        return await this.prismaService.discipline.findMany({
            where: {
                professorId: professorId,
            }
        });
    }

}
