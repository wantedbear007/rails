import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    'ALTER TABLE "summarized" DROP CONSTRAINT IF EXISTS "summarized_source_link_check";'
  );
  await knex.raw(
    'ALTER TABLE "unsummarized" DROP CONSTRAINT IF EXISTS "unsummarized_source_link_check";'
  );
}

export async function down(knex: Knex): Promise<void> {}
