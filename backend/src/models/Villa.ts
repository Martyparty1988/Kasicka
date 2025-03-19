import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { VillaItem } from './VillaItem';
import { Order } from './Order';

@Table({
  tableName: 'villas',
  timestamps: true,
  underscored: true,
})
export class Villa extends Model {
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

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  imageUrl?: string;

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
  @HasMany(() => VillaItem)
  villaItems?: VillaItem[];

  @HasMany(() => Order)
  orders?: Order[];
}
