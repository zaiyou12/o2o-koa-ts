import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import { Employer } from "./employer";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  @Length(5, 25)
  name: string;

  @Column({ length: 100 })
  @Length(10, 100)
  @IsEmail()
  email: string;

  @ManyToMany((type) => Employer)
  @JoinTable({
    name: "employee_employer",
    joinColumn: {
      name: "employee_id",
    },
    inverseJoinColumn: {
      name: "employer_id",
    },
  })
  employers: Employee[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

export const employeeSchema = {
  id: { type: "number", required: true, example: 1 },
  name: { type: "string", required: true, example: "Aaron" },
  email: { type: "string", required: true, example: "aaron.so@gmail.com" },
};
