import { Migration } from '@mikro-orm/migrations';

export class Migration20230728183645 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("_id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz(0) not null);');

    this.addSql('create table "user" ("_id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) null, "role__id" int not null, "last_name" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_role__id_unique" unique ("role__id");');

    this.addSql('alter table "user" add constraint "user_role__id_foreign" foreign key ("role__id") references "role" ("_id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_role__id_foreign";');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
