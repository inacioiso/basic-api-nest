import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCriteriaDto } from './dto/create-criteria-dto';
import { Criteria } from '../generated/prisma/client';

@Injectable()
export class CriteriaService {

    constructor(
        private prismaService: PrismaService,
    ){}

    async createCriteria(createCriteriaDto: CreateCriteriaDto, userId: string): Promise<Criteria> {
        const discipline = await this.prismaService.discipline.findUnique({
            where: {
                id: createCriteriaDto.disciplineId
            },
        })

        if(!discipline) {
             throw new NotFoundException('Discipline not found');
        }

        if(discipline.professorId !== userId){
            throw new ForbiddenException("You don't own this discipline.");
        }

        return await this.prismaService.criteria.create({
            data: {
                name: createCriteriaDto.name,
                disciplineId: createCriteriaDto.disciplineId,
            }
        });

    }
}
