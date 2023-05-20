import { Injectable, Inject } from '@nestjs/common';
import { Admin } from './admin.entity';
import { AdminDto } from './dto/admin.dto';
import { ADMIN_REPOSITORY } from '../../core/constants';

@Injectable()
export class AdminsService {

    constructor(@Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof Admin) { }

    async create(admin: AdminDto): Promise<Admin> {
        return await this.adminRepository.create<Admin>(admin);
    }

    async findOneByEmail(email: string): Promise<Admin> {
        return await this.adminRepository.findOne<Admin>({ where: { email } });
    }

    async findOneById(id: number): Promise<Admin> {
        return await this.adminRepository.findOne<Admin>({ where: { id } });
    }
}