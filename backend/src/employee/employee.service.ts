import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const { username, password } = createEmployeeDto;
    if (!username || !password)
      throw new BadRequestException('The username or password not provided');

    const hashedPassword = await argon.hash(password);
    const created = await this.prisma.employee.create({
      data: { username, password: hashedPassword },
    });
    if (!created) throw new BadRequestException('The Employee already exists');
    delete created.password;
    return created;
  }

  async findAll() {
    const found = await this.prisma.employee.findMany();
    found.forEach((e) => delete e.password);
    return found;
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('The id not provided');
    const found = await this.prisma.employee.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('The Employee not found');
    delete found.password;
    return found;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    if (!id) throw new BadRequestException('The id not provided');
    const { username, password } = updateEmployeeDto;
    const hashedPassword = await argon.hash(password);
    const updated = await this.prisma.employee.update({
      where: { id },
      data: { username, password: hashedPassword },
    });
    if (!updated) throw new BadRequestException('The Employee not updated');
    delete updated.password;
    return updated;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('The id not provided');
    const deleted = await this.prisma.employee.delete({ where: { id } });
    if (!deleted) throw new BadRequestException('The Employee not deleted');
    delete deleted.password;
    return deleted;
  }
}
