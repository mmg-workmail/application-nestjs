import { Column,  Entity, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/security/user/entities/user.entity';


@Entity()
export class JobFailed {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User,{ eager : true})
    @JoinColumn({name: 'user_id'})
    user_id: number

    @Column({ type: 'json' }) 
    payload: any;

    @Column({ type: 'json' }) 
    stacktrace: any;

    @Column({ type: 'varchar', length: 20 })
    queue_name: string;

    @Column({ type: 'varchar', length: 15 })
    type: string;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date;

}