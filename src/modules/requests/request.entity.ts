import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Admin } from '../admins/admin.entity';

@Table
export class Request extends Model<Request> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.ENUM,
        values: ['Active','Resolved'],
        defaultValue: 'Active',
        allowNull: false,
    })
    status: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    message: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: '',
        allowNull: true,
    })
    comment: string;

    @ForeignKey(() => Admin)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    adminId: number;

    @BelongsTo(() => Admin)
    admin: Admin;
}