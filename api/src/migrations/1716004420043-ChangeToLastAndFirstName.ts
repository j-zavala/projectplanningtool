import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeToLastAndFirstName1716004420043
  implements MigrationInterface
{
  name = 'ChangeToLastAndFirstName1716004420043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "name" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "name" ADD "first_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "name" ADD "last_name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "name" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "name" DROP COLUMN "first_name"`);
    await queryRunner.query(
      `ALTER TABLE "name" ADD "name" character varying NOT NULL`,
    );
  }
}
