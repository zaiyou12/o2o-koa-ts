import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 80 })
  name: string

  @Column({ length: 100 })
  email: string
}
