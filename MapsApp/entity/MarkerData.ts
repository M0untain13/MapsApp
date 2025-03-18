import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class MarkerData {
    @PrimaryGeneratedColumn()
    id!: string;
    @Column('int', {nullable:false})
    latitude!: number;
    @Column('int', {nullable:false})
    longitude!: number;
}