import { ok, fail } from "../utils/response.js";
import { globalSearch } from "../services/searchService.js";
import { z } from "zod";

const searchSchema = z.string().trim().min(1, "Query is too short").max(100, "Query is too long");

export async function search(req, res) {
  const query = req.query.q ?? "";
  const validation = searchSchema.safeParse(query);
  
  if (!validation.success) {
    return fail(res, validation.error.errors[0].message, 400);
  }

  return ok(res, await globalSearch(validation.data));
}
