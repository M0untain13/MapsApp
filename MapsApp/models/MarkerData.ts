import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid'

@Entity()
export class MarkerData {
    @PrimaryGeneratedColumn()
    id: string;
    @Column('int', {nullable:false})
    latitude: number;
    @Column('int', {nullable:false})
    longitude: number;

    constructor(latitude: number, longitude: number) {
        this.id = uuid()
        this.latitude = latitude;
        this.longitude = longitude;
    }
}