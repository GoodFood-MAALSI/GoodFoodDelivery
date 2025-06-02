import { ApiProperty } from "@nestjs/swagger";
import { Entity, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: 'tracking' })
export class Tracking {
    @ApiProperty({ example: 1 })
    @ObjectIdColumn()
    _id: number;

    @ApiProperty({ example: 1 })
    @Column({ type: 'string', nullable: false })
    livreur_id: number;

    @ApiProperty({ example: 'Jacob' })
    @Column({ type: 'string', nullable: false })
    livreur_name: string;

    @ApiProperty({ example: 500 })
    @Column('double')
    latitude: number;

    @ApiProperty({ example: 500 })
    @Column('double')
    longitude: number;

    @ApiProperty({ example: 25.5 })
    @Column('double')
    speed_kmh: number;

    @ApiProperty({ example: '2025-06-01T10:00:00Z' })
    @CreateDateColumn()
    timestamp: Date;
}
