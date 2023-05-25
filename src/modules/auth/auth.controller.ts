import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginAdminDto,AdminDto } from '../admins/dto/admin.dto';
import { DoesAdminExist } from '../../core/guards/doesAdminExist.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: "Authentificates admin" })
    @ApiBody({
        type: LoginAdminDto,
    })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @ApiOperation({ summary: "Creates admin" })
    @UseGuards(DoesAdminExist)
    @Post('signup')
    async signUp(@Body() admin: AdminDto) {
        return await this.authService.create(admin);
    }
}