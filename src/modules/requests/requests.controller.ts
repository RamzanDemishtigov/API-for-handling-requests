import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, Query, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestsService } from './requests.service';
import { Request as RequestEntity } from './request.entity';
import { CreateRequestDto,RequestDto, UpdateRequestDto } from './dto/request.dto';
import { ApiOperation,ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Status } from './dto/request.dto'; 

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
    constructor(private readonly requestService: RequestsService) { }

    @ApiOperation({ summary: "Searches all requests, supports three filters" })
    @ApiQuery({name:'status',enum:Status,required:false})
    @ApiQuery({name:'adminId',required:false})
    @ApiQuery({name:'date',required:false})
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async findAll(@Query('adminId') adminId?: number, @Query('status') status?, @Query('date') date?) {
        return await this.requestService.findAll(adminId,status,date);
    }

    @ApiOperation({ summary: "Searches request by id" })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RequestEntity> {
        const request = await this.requestService.findOne(id);

        if (!request) {
            throw new NotFoundException('This Request doesn\'t exist');
        }

        return request;
    }

    @ApiOperation({ summary: "Creates request" })
    @ApiBody({
        type: CreateRequestDto
    })
    @Post()
    async create(@Body() request: RequestDto): Promise<RequestEntity> {
        return await this.requestService.create(request);
    }

    @ApiOperation({ summary: "Updates request by its id(Gives response to the request by its id)" })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() request: UpdateRequestDto ,@Request() req): Promise<RequestEntity> {
        const { numberOfAffectedRows, updatedRequest } = await this.requestService.update(id, request,req);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Request doesn\'t exist');
        }

        return updatedRequest;
    }

    @ApiOperation({ summary: "Deletes request by its id" })
    @ApiBearerAuth()
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