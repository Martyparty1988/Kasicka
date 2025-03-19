import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './Order';
import { PaymentMethod } from './PaymentMethod';

@Table({
  tableName: 'invoices',
  timestamps: true,
  underscored: true,
})
export class Invoice extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  invoiceNumber!: string;

  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  paymentMethodId!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  issuedDate!: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dueDate!: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  paidDate?: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalAmount!: number;

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
  })
  currency!: string;

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
  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => PaymentMethod)
  paymentMethod!: PaymentMethod;
}
