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
    return await this.prisma.employee
      .create({ data: { ...employee, password: hashedPassword } })
      .then((employee) => {
        delete employee.password;
        return employee;
      });
  }

  async findAll() {
    return await this.prisma.employee.findMany().then((employees) => {
      if (employees.length)
        employees.forEach((employee) => delete employee.password);
      employees.sort((a, b) => a.id - b.id);
      return employees;
    });
  }

  async findOne(id: number) {
    return await this.prisma.employee
      .findUnique({ where: { id } })
      .then((employee) => {
        if (employee) delete employee.password;
        return employee;
      });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { password, ...employee } = updateEmployeeDto;
    let hashedPassword = '';
    if (password) hashedPassword = await argon.hash(password);
    return await this.prisma.employee
      .update({
        where: { id },
        data: password
          ? { ...employee, password: hashedPassword }
          : { ...employee },
      })
      .then((employee) => {
        delete employee.password;
        return employee;
      });
  }

  async remove(id: number) {
    if (!this.findOne(id))
      throw new BadRequestException('Employee does not exist');
    return await this.prisma.employee.delete({ where: { id } });
  }
}
