import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminsService } from '../../modules/admins/admins.service';

@Injectable()
export class DoesAdminExist implements CanActivate {
    constructor(private readonly adminService: AdminsService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const adminExist = await this.adminService.findOneByEmail(request.body.email);
        if (adminExist) {
            throw new ForbiddenException('This email already exist');
        }
        return true;
    }
}