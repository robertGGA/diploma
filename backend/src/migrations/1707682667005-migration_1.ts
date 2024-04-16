import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration11707682667005 implements MigrationInterface {
    name = 'Migration11707682667005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX "public"."IDX_9075147ba4bb2ead8bac71ccc8"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE INDEX "IDX_9075147ba4bb2ead8bac71ccc8" ON "token" ("refreshToken") `
        );
    }
}
