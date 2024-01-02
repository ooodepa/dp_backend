import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLLanguages1704206642390 implements MigrationInterface {
  name = 'DPCTLLanguages1704206642390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "DP_CTL_Languages" (
                "dp_id" SERIAL NOT NULL,
                "dp_shortName" character varying(2) NOT NULL,
                CONSTRAINT "PK_4062461877cdb79de6096e09cea" PRIMARY KEY ("dp_id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UNI_CTL_Languages_shortName" ON "DP_CTL_Languages" ("dp_shortName")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."UNI_CTL_Languages_shortName"
        `);
    await queryRunner.query(`
            DROP TABLE "DP_CTL_Languages"
        `);
  }
}
