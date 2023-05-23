import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestsService } from './requests.service';
import { Request as RequestEntity } from './request.entity';
import { RequestDto } from './dto/request.dto';

@Controller('requests')
export class RequestsController {
    constructor(private readonly requestService: RequestsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async findAll(@Query('adminId') adminId?: number,@Query('status') status?: ['Active','Resolved']) {
        return await this.requestService.findAll(adminId,status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RequestEntity> {
        const request = await this.requestService.findOne(id);

        if (!request) {
            throw new NotFoundException('This Request doesn\'t exist');
        }

        return request;
    }

    @Post()
    async create(@Body() request: RequestDto): Promise<RequestEntity> {
        return await this.requestService.create(request);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() request: {status?:['Active','Resolved'],comment:string},@Request() req): Promise<RequestEntity> {
        const { numberOfAffectedRows, updatedRequest } = await this.requestService.update(id, request,req);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Request doesn\'t exist');
        }

        return updatedRequest;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number) {
        const deleted = await this.requestService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Request doesn\'t exist');
        }

        return 'Successfully deleted';
    }
}