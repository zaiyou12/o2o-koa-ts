import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Length, IsEmail } from "class-validator"

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 80 })
  @Length(10, 80)
  name: string

  @Column({ length: 100 })
  @Length(10, 100)
  @IsEmail()
  email: string
}

export const userSchema = {
  id: { type: "number", required: true, example: 1 },
  name: { type: "string", required: true, example: "Aaron" },
  email: { type: "string", required: true, example: "aaron.so@gmail.com" }
}
