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

@Entity()
export class ImageData {
    @PrimaryGeneratedColumn()
    id!: string;
    @Column('text', {nullable:false})
    url!: string;
    @Column('text', {nullable:false})
    markerId!: string;
}

export interface Region {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
};