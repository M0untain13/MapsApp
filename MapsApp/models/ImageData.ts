import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid'

@Entity()
export class ImageData {
    @PrimaryGeneratedColumn()
    id: string;
    @Column('text', {nullable:false})
    url: string;
    @Column('text', {nullable:false})
    markerId: string;

    constructor(url: string, markerId: string) {
        this.id = uuid()
        this.url = url;
        this.markerId = markerId;
    }
}