import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'settings',
  timestamps: true,
  underscored: true,
})
export class Setting extends Model {
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
  key!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  value!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

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
}
