import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Villa } from './Villa';
import { Item } from './Item';

@Table({
  tableName: 'villa_items',
  timestamps: true,
  underscored: true,
})
export class VillaItem extends Model {
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

  @ForeignKey(() => Item)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  itemId!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isAvailable!: boolean;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  customPriceCzk?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  customPriceEur?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  stockQuantity!: number;

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

  @BelongsTo(() => Item)
  item!: Item;
}
