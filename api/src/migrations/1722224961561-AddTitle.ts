import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTitle1722224961561 implements MigrationInterface {
  name = 'AddTitle1722224961561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add 'title' column to 'todo' table
    await queryRunner.query(`
      ALTER TABLE "todo"
      ADD COLUMN IF NOT EXISTS "title" character varying NOT NULL DEFAULT ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "todo"
      DROP COLUMN IF EXISTS "title"
    `);
  }
}
