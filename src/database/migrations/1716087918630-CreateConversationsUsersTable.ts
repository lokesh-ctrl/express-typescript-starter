import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConversationsUsersTable1716087918630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'conversations_users_users',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        { name: 'conversationsId', type: 'bigint' },
        { name: 'usersId', type: 'bigint' },
      ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('conversations_users_users');
  }
}
