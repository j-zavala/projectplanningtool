import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNameTable1716004292211 implements MigrationInterface {
  name = 'CreateNameTable1716004292211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "name" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_86c85ab0235bbe92757ce7a8f57" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "name"`);
  }
}
