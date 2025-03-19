import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Role } from './Role';
import { Order } from './Order';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  passwordHash!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: true,
  })
  email?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  firstName?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  lastName?: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  roleId?: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastLogin?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => Role)
  role?: Role;

  @HasMany(() => Order)
  orders?: Order[];
}
