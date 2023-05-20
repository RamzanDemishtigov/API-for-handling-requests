import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly adminService: AdminsService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: process.env.JWTKEY,
        });
    }

    async validate(payload: any) {
        const admin = await this.adminService.findOneById(payload.id);
        if (!admin) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        return payload;
    }
}