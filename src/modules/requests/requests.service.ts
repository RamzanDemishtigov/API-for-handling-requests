import { Injectable, Inject } from '@nestjs/common';
import { Request } from './request.entity';
import { RequestDto } from './dto/request.dto';
import { Admin } from '../admins/admin.entity';
import { REQUEST_REPOSITORY } from '../../core/constants';

@Injectable()
export class RequestsService {
    constructor(@Inject(REQUEST_REPOSITORY) private readonly requestRepository: typeof Request) { }

    async create(request: RequestDto): Promise<Request> {
        return await this.requestRepository.create<Request>(request);
    }

    async findAll(adminId?: number, status?:['Active','Resolved']): Promise<Request[]> {
        if(adminId && status){
            return await this.requestRepository.findAll<Request>({
                where: {adminId,status},
            	include: [{ model: Admin, attributes: { exclude: ['password'] } }],
    	    });
        }else if(adminId){
            return await this.requestRepository.findAll<Request>({
                where: {adminId},
            	include: [{ model: Admin, attributes: { exclude: ['password'] } }],
    	    });
        }else if(status){
            return await this.requestRepository.findAll<Request>({
                where: {status},
            	include: [{ model: Admin, attributes: { exclude: ['password'] } }],
    	    });
        }else{
            return await this.requestRepository.findAll<Request>({
            	include: [{ model: Admin, attributes: { exclude: ['password'] } }],
    	    });
        }
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