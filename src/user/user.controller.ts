import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserDecorator } from "../common/decorator";
import { JwtAuthenticationGuard } from "../authentication/jwt.guard";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserGuard } from "src/authentication/user.guard";


@Controller('profile')
@UseGuards(JwtAuthenticationGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Get()
    @UseGuards(UserGuard)
    async getProfile(@UserDecorator() user): Promise<User> {
        console.log(user)
        return this.userService.findOneOrFail(user.id);
    }
}