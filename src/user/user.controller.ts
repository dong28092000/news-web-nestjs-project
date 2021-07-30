import { Controller, Get, Param } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Controller('profile')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Get(':id')
    async getProfile(@Param() id): Promise<User> {
        return this.userService.findOneOrFail({id});
    }
}