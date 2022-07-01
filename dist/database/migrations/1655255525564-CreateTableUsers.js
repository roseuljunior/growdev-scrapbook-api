"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1655255525564 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsers1655255525564 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
    async down(queryRunner) {
        await queryRunner.dropTable('user', true, true, true);
    }
}
exports.CreateTableUsers1655255525564 = CreateTableUsers1655255525564;
