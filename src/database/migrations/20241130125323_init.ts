import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("unsummarized", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("title").notNullable().defaultTo("news");
      table.string("body").notNullable();
      table.boolean("summarize_status").notNullable().defaultTo(false);
      table
        .string("source_link")
        .notNullable()
        .checkRegex(
          "/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(\/[a-z0-9-_.~%]*)*(\?[a-z0-9-_.~%=&]*)?(#[a-z0-9-_.~%]*)?$/"
        );
      table.string("source");
      table.timestamps(true, true);
    })
    .createTable("summarized", function (table) {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.string("title").notNullable();
      table.string("category").notNullable().defaultTo("general");
      table.string("summarized_body").notNullable();
      table
        .string("source_link")
        .notNullable()
        .checkRegex(
          "/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(\/[a-z0-9-_.~%]*)*(\?[a-z0-9-_.~%=&]*)?(#[a-z0-9-_.~%]*)?$/"
        );
      table.string("source");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("unsummarized")
    .dropTableIfExists("summarized");
}


// import type { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {
//   return knex.schema.table("unsummarized", (table) => {
//     knex.raw('ALTER TABLE "unsummarized" DROP CONSTRAINT IF EIXISTS "unsummarized_source_link_check"');
//   });
// }

// export async function down(knex: Knex): Promise<void> {
//   return knex.schema
//     .dropTableIfExists("unsummarized")
//     .dropTableIfExists("summarized");
// }
