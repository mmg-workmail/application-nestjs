import { Column,  Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne, JoinColumn, AfterInsert, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { GenerateToken } from 'src/common/helpers/generateToken';
import { UseCase, Type } from '../enums/otp.enum';


@Entity()
export class Otp {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id, { eager : true})
    @JoinColumn({name: 'user_id'})
    user: User

    @PrimaryGeneratedColumn("uuid")
    token: string

    @Column({ type: 'varchar', length: 7 })
    otp: string;

    @Column({ type: 'enum', enum: Type, default: Type.MAIL })
    type: Type;

    @Column({ type: 'enum', enum: UseCase, default: UseCase.FORGET_PASSWORD })
    use_case: UseCase;
    
    @Column({ type: 'boolean', default: false })
    is_done: Boolean;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    setTokenAndOtp(): void {
        const generateToken = new GenerateToken();
        this.otp = generateToken.makeNumeric(7)
    }

    @AfterInsert()
    removeUser(): void {
        // delete this.user
        // delete this.otp
        // delete this.id
        // delete this.createdAt
        // delete this.updatedAt
    }



}