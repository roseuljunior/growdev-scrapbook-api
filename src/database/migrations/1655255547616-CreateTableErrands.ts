import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableErrands1655255547616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'errand',
            columns: [
                {
                    name: 'uid',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                },

                {
                    name: 'user_uid',
                    type: 'int',
                    isNullable: false,
                },

                {
                    name: 'title',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },

                {
                    name: 'description',
                    type: 'text',
                    isNullable: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('errand', true, true, true);
    }

}
