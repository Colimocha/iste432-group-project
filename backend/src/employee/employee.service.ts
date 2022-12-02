import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const { password, ...employee } = createEmployeeDto;
    const hashedPassword = await argon.hash(password);
    return await this.prisma.employee.create({
      data: { ...employee, password: hashedPassword },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.employee
      .findMany({
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      })
      .then((employees) => employees.sort((a, b) => a.id - b.id));
  }

  async findOne(id: number) {
    return await this.prisma.employee.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { password, ...employee } = updateEmployeeDto;
    let hashedPassword = '';
    if (password) hashedPassword = await argon.hash(password);
    return await this.prisma.employee.update({
      where: { id },
      data: password
        ? { ...employee, password: hashedPassword }
        : { ...employee },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async remove(id: number) {
    if (!this.findOne(id))
      throw new BadRequestException('Employee does not exist');
    return await this.prisma.employee.delete({ where: { id } });
  }
}
