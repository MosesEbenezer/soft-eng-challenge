import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationN21651852765958 implements MigrationInterface {
    name = 'migrationN21651852765958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`crew_member\` ADD \`name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ship\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ship\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`crew_member\` DROP COLUMN \`name\``);
    }

}
