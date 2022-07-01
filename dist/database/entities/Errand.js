"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrandEntity = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let ErrandEntity = class ErrandEntity extends typeorm_1.BaseEntity {
    constructor(userUid, title, description) {
        super();
        this.userUid = userUid;
        this.title = title;
        this.description = description;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ErrandEntity.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_uid' }),
    __metadata("design:type", Number)
], ErrandEntity.prototype, "userUid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ErrandEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ErrandEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => User_1.UserEntity, user => user.errands),
    (0, typeorm_1.JoinColumn)({ name: 'user_uid', referencedColumnName: 'uid' }),
    __metadata("design:type", User_1.UserEntity)
], ErrandEntity.prototype, "user", void 0);
ErrandEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'errand' }),
    __metadata("design:paramtypes", [Number, String, String])
], ErrandEntity);
exports.ErrandEntity = ErrandEntity;
