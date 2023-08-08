import { Migration } from '@mikro-orm/migrations';

export class Migration20230730122629 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "team" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "employee" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "alias" varchar(255) not null, "joined_team" timestamptz(0) null, "team_id" int null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "employee" add constraint "employee_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "employee" drop constraint "employee_team_id_foreign";');

    this.addSql('drop table if exists "team" cascade;');

    this.addSql('drop table if exists "employee" cascade;');
  }

}
