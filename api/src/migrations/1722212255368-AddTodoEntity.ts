import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTodoEntity1722212255368 implements MigrationInterface {
  name = 'AddTodoEntity1722212255368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create 'name' table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "name" (
        "id" SERIAL NOT NULL,
        "first_name" character varying NOT NULL,
        "last_name" character varying NOT NULL,
        CONSTRAINT "PK_86c85ab0235bbe92757ce7a8f57" PRIMARY KEY ("id")
      )
    `);

    // Create 'todo' table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "todo" (
        "id" SERIAL NOT NULL,
        "description" character varying NOT NULL,
        "done" boolean NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "todo"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "name"`);
  }
}
