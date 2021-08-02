import { Controller, Get, Req, UseGuards } from "@nestjs/common";
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
    async getProfile(@Req() { user }): Promise<User> {
        return this.userService.findOneOrFail(user.id);
    }
}