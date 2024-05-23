import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTimestampsToMessages1716475805430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      }),
    );

    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'createdAt');
    await queryRunner.dropColumn('user', 'updatedAt');
  }
}
