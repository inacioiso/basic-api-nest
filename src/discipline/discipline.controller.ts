import { Controller, UseGuards, Req, Body, UnauthorizedException, Post, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline-dto';

@UseGuards(JwtAuthGuard)
@Controller('discipline')
export class DisciplineController {
    constructor(
        private disciplineService: DisciplineService
    ){}

    @Post()
    async createDiscipline(@Req() req, @Body() createDisciplineDto: CreateDisciplineDto) {
        if (!req.user) throw new UnauthorizedException();

        const userId = req.user.id;
        
        return this.disciplineService.createDiscipline(createDisciplineDto, userId);
    }

    @Get()
    async getDisciplinesByProfessor(@Req() req) {
        if (!req.user) throw new UnauthorizedException();
    
        const professorId = req.user.id;
        return this.disciplineService.getDisciplinesByProfessor(professorId);
    }


}
