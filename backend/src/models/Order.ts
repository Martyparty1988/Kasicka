import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Villa } from './Villa';
import { User } from './User';
import { OrderItem } from './OrderItem';
import { Invoice } from './Invoice';

@Table({
  tableName: 'orders',
  timestamps: true,
  underscored: true,
})
export class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Villa)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  villaId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  orderNumber!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guestCount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nightsCount!: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0,
  })
  discountPercentage!: number;

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
  })
  currency!: string;

  @Column({
    type: DataType.DECIMAL(10, 4),
    allowNull: true,
  })
  exchangeRate?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalAmount!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalAmountWithDiscount!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  cityTaxAmount!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  finalAmount!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes?: string;

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
  @BelongsTo(() => Villa)
  villa!: Villa;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => OrderItem)
  orderItems?: OrderItem[];

  @HasMany(() => Invoice)
  invoices?: Invoice[];
}
