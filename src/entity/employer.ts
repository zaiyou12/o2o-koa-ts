import { Length } from "class-validator";
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  @Length(5, 25)
  name: string;

  @Column({ length: 100 })
  @Length(10, 100)
  email: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

export const userSchema = {
  id: { type: "number", required: true, example: 1 },
  name: { type: "string", required: true, example: "Aaron" },
  email: { type: "string", required: true, example: "aaron.so@gmail.com" },
};
