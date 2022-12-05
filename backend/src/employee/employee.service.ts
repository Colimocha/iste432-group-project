import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import * as argon from 'argon2';

/**
 * A class that contains the business logic for the employees
 *
 * @class EmployeeService
 */
@Injectable()
export class EmployeeService {
  /**
   * A constructor for the emplyoee service
   *
   * @param prisma
   * @constructor
   */
  constructor(private prisma: PrismaService) {}

  /**
   * create a ballot with the createEmployeeDto
   *
   * @param createEmployeeDto
   * @returns
   */
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

  /**
   * Return all employees from database
   *
   * @returns
   */
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

  /**
   * Find the employee with the id
   *
   * @param id
   * @returns
   */
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

  /**
   * Update the employee with the id and new data via the UpdateEmployeeDto object
   *
   * @param id
   * @param updateEmployeeDto
   * @returns
   */
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

  /**
   * Remove the employee from the database
   *
   * @param id
   * @returns
   */
  async remove(id: number) {
    if (!this.findOne(id))
      throw new BadRequestException('Employee does not exist');
    return await this.prisma.employee.delete({ where: { id } });
  }
}
