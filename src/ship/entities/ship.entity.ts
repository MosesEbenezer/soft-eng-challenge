import { CrewMember } from 'src/crew-member/entities/crew-member.entity';
import { MotherShip } from 'src/mother-ship/entities/mother-ship.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Ship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => MotherShip)
  @JoinColumn({ name: 'mother_ship_id' })
  mother_ship: MotherShip;

  @OneToMany(() => CrewMember, (crew_member) => crew_member.ship, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  crew_members: CrewMember[];

  @Column({ default: 5 })
  capacity: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
