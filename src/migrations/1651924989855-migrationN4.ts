import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationN41651924989855 implements MigrationInterface {
    name = 'migrationN41651924989855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ship\` DROP FOREIGN KEY \`FK_87aa1d624336d7f731f7e148a66\``);
        await queryRunner.query(`ALTER TABLE \`crew_member\` DROP FOREIGN KEY \`FK_9df3e59daf286d5d7adae178fd9\``);
        await queryRunner.query(`ALTER TABLE \`ship\` ADD CONSTRAINT \`FK_87aa1d624336d7f731f7e148a66\` FOREIGN KEY (\`mother_ship_id\`) REFERENCES \`mother_ship\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`crew_member\` ADD CONSTRAINT \`FK_9df3e59daf286d5d7adae178fd9\` FOREIGN KEY (\`ship_id\`) REFERENCES \`ship\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`crew_member\` DROP FOREIGN KEY \`FK_9df3e59daf286d5d7adae178fd9\``);
        await queryRunner.query(`ALTER TABLE \`ship\` DROP FOREIGN KEY \`FK_87aa1d624336d7f731f7e148a66\``);
        await queryRunner.query(`ALTER TABLE \`crew_member\` ADD CONSTRAINT \`FK_9df3e59daf286d5d7adae178fd9\` FOREIGN KEY (\`ship_id\`) REFERENCES \`ship\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ship\` ADD CONSTRAINT \`FK_87aa1d624336d7f731f7e148a66\` FOREIGN KEY (\`mother_ship_id\`) REFERENCES \`mother_ship\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
