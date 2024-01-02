import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_Languages')
export default class LanguageEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_CTL_Languages_shortName', { unique: true })
  @Column({ length: 2 })
  dp_shortName: string;
}
