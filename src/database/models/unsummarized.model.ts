import { Model } from "objection";
import { UNSUMMARIZED_TABLE_NAME } from "../../utils/constants";

  /**
   * model for summarized table on the db.
   */
export default class Unsummarized extends Model {
  static get tableName() {
    return UNSUMMARIZED_TABLE_NAME;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "body", "summarize_status", "source_link"],

      properties: {
        title: {
          type: "string",
          minLength: 1,
          maxLength: 255,
          default: "news",
          description: "The title of the unsummarized entry.",
        },
        body: {
          type: "string",
          minLength: 1,
          description: "The main content of the unsummarized entry.",
        },
        summarize_status: {
          type: "boolean",
          default: false,
          description: "Indicates whether the entry has been summarized.",
        },
        source_link: {
          type: "string",
          format: "uri",
          description: "The source link for the entry.",
        },
        source: {
          type: ["string", "null"],
          maxLength: 255,
          description: "The source name or identifier for the entry.",
        },
        created_at: {
          type: "string",
          format: "date-time",
          description: "Timestamp of when the entry was created.",
        },
        updated_at: {
          type: "string",
          format: "date-time",
          description: "Timestamp of when the entry was last updated.",
        },
      },
    };
  }
}
