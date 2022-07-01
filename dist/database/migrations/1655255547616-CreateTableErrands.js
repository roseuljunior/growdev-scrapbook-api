"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableErrands1655255547616 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableErrands1655255547616 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
            foreignKeys: [new typeorm_1.TableForeignKey({
                    columnNames: ['user_uid'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['uid'],
                })],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('errand', true, true, true);
    }
}
exports.CreateTableErrands1655255547616 = CreateTableErrands1655255547616;
