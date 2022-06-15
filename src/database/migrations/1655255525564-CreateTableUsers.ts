import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1655255525564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'uid',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                },

                {
                    name: 'full_name',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },

                {
                    name: 'email',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                    isUnique: true,
                },

                {
                    name: 'password',
                    type: 'varchar',
                    length: '30',
                    isNullable: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user', true, true, true);
    }

}
