import { Injectable, Inject } from '@nestjs/common';
import { Request } from './request.entity';
import { RequestDto } from './dto/request.dto';
import { Admin } from '../admins/admin.entity';
import { REQUEST_REPOSITORY } from '../../core/constants';
import { Op } from 'sequelize';

@Injectable()
export class RequestsService {
    constructor(@Inject(REQUEST_REPOSITORY) private readonly requestRepository: typeof Request) { }

    async create(request: RequestDto): Promise<Request> {
        return await this.requestRepository.create<Request>(request);
    }

    async findAll(adminId?: number, status?:['Active','Resolved'], date?: string): Promise<Request[]> {
        let whereClause = {};
        if(adminId) {
            whereClause['adminId'] = adminId;
        }
        if(status) {
            whereClause['status'] = status;
        }
        if(date) {
            whereClause['createdAt'] = {
            [Op.gte]: new Date(date),
            [Op.lt]: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
            };
        }
        return await this.requestRepository.findAll({
            where: whereClause,
            include: [{ model: Admin, attributes: { exclude: ['password'] } }],
        });
    }

    async findOne(id: number): Promise<Request> {
        return await this.requestRepository.findOne({
        	where: { id },
        	include: [{ model: Admin, attributes: { exclude: ['password'] } }],
    	});
    }

    async delete(id: number) {
        return await this.requestRepository.destroy({ where: { id } });
    }

    async update(id: number, request: any, req: any) {
        const [numberOfAffectedRows, [updatedRequest]] = await this.requestRepository.update( {...request,adminId: req.user.id,status:'Resolved'}, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedRequest };
    }
}