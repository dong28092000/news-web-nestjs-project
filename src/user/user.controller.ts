import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../authentication/permission.guard";
import { VIEW_USER } from "../common/constant";
import { Permission } from "../common/decorator";
import { JwtAuthenticationGuard } from "../authentication/jwt.guard";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Controller('profile')
@UseGuards(JwtAuthenticationGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}
    
    @Get()
    @Permission(VIEW_USER)
    @UseGuards(PermissionGuard)
    async getProfile(@Req() { user }): Promise<User> {
        return this.userService.findOneOrFail(user.id);
    }

}