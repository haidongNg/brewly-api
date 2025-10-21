import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'bw_user' })
export class User extends BaseEntity {

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    role: string;
}