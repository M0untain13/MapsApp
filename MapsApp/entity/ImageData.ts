import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class ImageData {
    @PrimaryGeneratedColumn()
    id!: string;
    @Column('text', {nullable:false})
    url!: string;
    @Column('text', {nullable:false})
    markerId!: string;
}