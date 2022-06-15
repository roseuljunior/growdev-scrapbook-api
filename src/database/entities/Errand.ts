import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./User";

@Entity({name: 'errand'})
export class ErrandEntity extends BaseEntity {
    @PrimaryColumn()
    uid?: number;

    @Column({name: 'user_uid'})
    userUid: number;

    @Column()
    title: String;
    
    @Column()
    description: String;

    @ManyToOne(type => UserEntity, user => user.errands)
    @JoinColumn({name: 'user_uid', referencedColumnName: 'uid'})
    user?: UserEntity;

    constructor(userUid: number, title: String, description: String) {
        super();
        this.userUid = userUid;
        this.title = title;
        this.description = description;
    }

}
