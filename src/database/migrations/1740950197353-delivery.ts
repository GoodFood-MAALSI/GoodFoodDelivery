import { MigrationInterface, QueryRunner } from "typeorm";

export class Delivery1740950197353 implements MigrationInterface {
    name = 'Delivery1740950197353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "delivery_status" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7402e08a6496ff740a56399e8b6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_address" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "street_number" character varying NOT NULL,
                "street" character varying NOT NULL,
                "city" character varying NOT NULL,
                "postal_code" character varying NOT NULL,
                "country" character varying NOT NULL,
                "is_default" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" integer NOT NULL,
                "password" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "delivery" (
                "id" SERIAL NOT NULL,
                "order_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "transport_mode_id" integer NOT NULL,
                "delivery_status_id" integer NOT NULL,
                "start_time" TIMESTAMP NOT NULL,
                "end_time" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                "transportModeId" integer,
                "deliveryStatusId" integer,
                CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "transport_mode" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_605e6a0e77f258cd8932d8cd056" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_address"
            ADD CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "delivery"
            ADD CONSTRAINT "FK_e1a5374a7f5c51edf274fc15483" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "delivery"
            ADD CONSTRAINT "FK_8301722872143841ca26c6ae105" FOREIGN KEY ("transportModeId") REFERENCES "transport_mode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "delivery"
            ADD CONSTRAINT "FK_fdce99d0dd3c1aee5fe6f23ad58" FOREIGN KEY ("deliveryStatusId") REFERENCES "delivery_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "delivery" DROP CONSTRAINT "FK_fdce99d0dd3c1aee5fe6f23ad58"
        `);
        await queryRunner.query(`
            ALTER TABLE "delivery" DROP CONSTRAINT "FK_8301722872143841ca26c6ae105"
        `);
        await queryRunner.query(`
            ALTER TABLE "delivery" DROP CONSTRAINT "FK_e1a5374a7f5c51edf274fc15483"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_address" DROP CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2"
        `);
        await queryRunner.query(`
            DROP TABLE "transport_mode"
        `);
        await queryRunner.query(`
            DROP TABLE "delivery"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "user_address"
        `);
        await queryRunner.query(`
            DROP TABLE "delivery_status"
        `);
    }

}
