import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ErrandEntity } from "./Errand";

@Entity({name: 'user'})
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    uid?: number;

    @Column({name: 'full_name'})
    fullName: String;

    @Column()
    email: String;

    @Column()
    password: String;

    @OneToMany(type => ErrandEntity, errand => errand.userUid)
    errands?: ErrandEntity[];
    
    constructor(fullName: String, email: String, password: String) {
        super();
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
}
