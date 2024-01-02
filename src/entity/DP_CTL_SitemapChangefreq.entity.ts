import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_SitemapChangefreq')
export default class SitemapChangefreqEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_CTL_SitemapChangefreq_value', { unique: true })
  @Column({ length: 7 })
  dp_value: string;
}
