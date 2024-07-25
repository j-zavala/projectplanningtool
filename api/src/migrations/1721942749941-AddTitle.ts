import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitle1721942749941 implements MigrationInterface {
    name = 'AddTitle1721942749941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "name" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, CONSTRAINT "PK_86c85ab0235bbe92757ce7a8f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "createdAt" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "name"`);
    }

}
