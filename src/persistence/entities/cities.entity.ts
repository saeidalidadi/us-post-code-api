import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

export interface Places {
  placeName: string;
  state: string;
  abbreviation: string;
}

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'post_code' })
  postCode: number;

  @Column({})
  country: string;

  @Column({ type: 'json', default: '{}' })
  places: Places;

  @ManyToOne(() => User, (user) => user.cities)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
