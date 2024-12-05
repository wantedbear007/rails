import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw('TRUNCATE TABLE "unsummarized" CASCADE');

    // Inserts seed entries
    await knex("unsummarized").insert([
        {
            title: "Breaking News 1",
            body: "This is the body of the first news article.",
            source_link: "https://example.com/news1",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 2",
            body: "This is the body of the second news article.",
            source_link: "https://example.com/news2",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 3",
            body: "This is the body of the third news article.",
            source_link: "https://example.com/news3",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 4",
            body: "This is the body of the fourth news article.",
            source_link: "https://example.com/news4",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 5",
            body: "This is the body of the fifth news article.",
            source_link: "https://example.com/news5",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 6",
            body: "This is the body of the sixth news article.",
            source_link: "https://example.com/news6",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 7",
            body: "This is the body of the seventh news article.",
            source_link: "https://example.com/news7",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 8",
            body: "This is the body of the eighth news article.",
            source_link: "https://example.com/news8",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 9",
            body: "This is the body of the ninth news article.",
            source_link: "https://example.com/news9",
            source: "Example News Agency",
        },
        {
            title: "Breaking News 10",
            body: "This is the body of the tenth news article.",
            source_link: "https://example.com/news10",
            source: "Example News Agency",
        }
    ]);
}