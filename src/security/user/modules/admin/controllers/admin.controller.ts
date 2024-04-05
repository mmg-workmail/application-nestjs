import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';

import { AdminService } from '../services/admin.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DatatableDto } from 'src/common/dto/datatable.dto';
import { JwtAuthGuard } from 'src/security/auth/guards/jwt-auth.guard';
import { Roles } from 'src/security/acl/decorators/roles.decorator';
import { Role } from 'src/security/acl/enums/role.enum';
import { RoleGuard } from 'src/security/acl/guards/role.guard';


@Controller('admin/users')

@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN_USER)
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.adminService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() datatableUserDto: DatatableDto) {
    return await this.adminService.findAll(datatableUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
