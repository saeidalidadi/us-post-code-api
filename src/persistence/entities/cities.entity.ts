import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
