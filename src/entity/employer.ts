import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 80 })
  name: string

  @Column({ length: 100 })
  email: string
}

export const userSchema = {
  id: { type: "number", required: true, example: 1 },
  name: { type: "string", required: true, example: "Aaron" },
  email: { type: "string", required: true, example: "aaron.so@gmail.com" }
}
