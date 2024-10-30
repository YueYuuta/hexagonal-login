// user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() // ID entero generado automáticamente
  public id: number;

  @Column({ type: 'varchar', length: 100 })
  public firstName: string;

  @Column({ type: 'varchar', length: 100 })
  public passwordHash: string;

  @Column({ type: 'varchar', length: 100 })
  public lastName: string;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar', default: 'user' }) // Rol por defecto
  public role: string;

  @Column({ type: 'boolean', default: true }) // Usuario activo por defecto
  public isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de creación
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de última actualización
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true }) // Fecha de eliminación lógica
  public deletedAt: Date;
}
