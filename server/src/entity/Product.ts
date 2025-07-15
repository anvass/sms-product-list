import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  article: string;

  @Column({
    type: 'varchar',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'integer',
    default: 1000,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  @IsNumber()
  @Min(0)
  quantity: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
