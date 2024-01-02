import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLSitemapChangefreq1704217534771 implements MigrationInterface {
  name = 'DPCTLSitemapChangefreq1704217534771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "DP_CTL_SitemapChangefreq" (
                "dp_id" SERIAL NOT NULL,
                "dp_value" character varying(7) NOT NULL,
                CONSTRAINT "PK_69d1a4d0c360eff0cf8bcfdf400" PRIMARY KEY ("dp_id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UNI_CTL_SitemapChangefreq_value" ON "DP_CTL_SitemapChangefreq" ("dp_value")
        `);
    await queryRunner.query(`
            INSERT INTO "DP_CTL_SitemapChangefreq" ("dp_value") VALUES
            ('always'),
            ('hourly'),
            ('daily'),
            ('weekly'),
            ('monthly'),
            ('yearly'),
            ('never');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."UNI_CTL_SitemapChangefreq_value"
        `);
    await queryRunner.query(`
            DROP TABLE "DP_CTL_SitemapChangefreq"
        `);
  }
}
