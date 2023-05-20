import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminsService,
        private readonly jwtService: JwtService,
    ) { }

    async validateAdmin(username: string, pass: string) {
        const admin = await this.adminService.findOneByEmail(username);
        if (!admin) {
            return null;
        }

        const match = await this.comparePassword(pass, admin.password);
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = admin['dataValues'];
        return result;
    }

    public async login(admin) {
        const token = await this.generateToken(admin);
        return { admin, token };
    }

    public async create(admin) {
        const pass = await this.hashPassword(admin.password);

        const newAdmin = await this.adminService.create({ ...admin, password: pass });

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newAdmin['dataValues'];

        const token = await this.generateToken(result);

        return { admin: result, token };
    }

    private async generateToken(admin) {
        const token = await this.jwtService.signAsync(admin);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}