import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ProfessorResponseDto } from './dto/professor-response-dto';

@Injectable()
export class AdminService {
    constructor(private prismaService: PrismaService) {}

    async listProfessorsByAdmin(): Promise<ProfessorResponseDto[]> {

        const professors = await this.prismaService.user.findMany({
            where: {
                role: 'PROFESSOR'
            },
            include: {
                disciplines: {
                    include: {
                        criteria: {
                            include: {
                                subCriteria: true,
                            }
                        }
                    }
                }
            }
        });

        return professors.map((professor) => new ProfessorResponseDto(professor));
    }
}
