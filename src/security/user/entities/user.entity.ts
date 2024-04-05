import { Column, Index, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/security/acl/enums/role.enum';
import { Status } from '../enums/status.enum';
import { Gender } from '../enums/gender.enum';


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 15 })
  @Index({ unique: true })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'phone_number' })
  @Index({ unique: true })
  phoneNumber: string; 

  @Column({ type: 'int', default: 0 })
  age: number;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.U })
  gender: Gender;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ type: 'bool', default: false, name: 'is_verified' })
  isVerified: boolean;

  @Column({ type: 'enum', enum: Role, default: [Role.USER], name: 'role', array: true })
  roles: Role[];



  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;


  @AfterUpdate()
  @AfterInsert()
  private removePassword(): void {
    if (this.password) {
      delete this.password
    }
  }

  
  async bcryptPassword(password: string): Promise<boolean> {
    let isUpdate = false
    if (password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(password, salt)
      isUpdate = true
    }
    return isUpdate
  }

  async validatePassword(password: string): Promise<boolean> {
    return  bcrypt.compare(password, this.password);
  }
}