import { Model } from "objection";
import { SUMMARIZED_TABLE_NAME } from "../../utils/constants";

export default class Summarized extends Model {
  static get tableName() {
    return SUMMARIZED_TABLE_NAME;
  }
}
