import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTodoEntity1721246799536 implements MigrationInterface {
  name = 'AddTodoEntity1721246799536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "done" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
