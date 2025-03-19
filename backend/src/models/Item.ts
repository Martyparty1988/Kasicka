import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from './Category';
import { VillaItem } from './VillaItem';
import { OrderItem } from './OrderItem';

@Table({
  tableName: 'items',
  timestamps: true,
  underscored: true,
})
export class Item extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  categoryId?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  priceCzk?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  priceEur?: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  imageUrl?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isCustomPrice!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isSharedAcrossVillas!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isCityTax!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;

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
  @BelongsTo(() => Category)
  category?: Category;

  @HasMany(() => VillaItem)
  villaItems?: VillaItem[];

  @HasMany(() => OrderItem)
  orderItems?: OrderItem[];
}
