import { Controller, UseGuards, Post, Req, Body } from '@nestjs/common';
import { CriteriaService } from './criteria.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCriteriaDto } from './dto/create-criteria-dto';
import type { AuthenticatedRequest } from '../utils/authenticated-request';

@UseGuards(JwtAuthGuard)
@Controller('criteria')
export class CriteriaController {

    constructor(
        private criteriaService: CriteriaService,
    ){}

    @Post()
    createCriteria(@Req() req: AuthenticatedRequest, @Body() createCriteriaDto: CreateCriteriaDto) {
        const userId = req.user.id;
        return this.criteriaService.createCriteria(createCriteriaDto, userId);
    }


}
