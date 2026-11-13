import { writeFile } from "node:fs/promises";
import openapiTS, { astToString } from "openapi-typescript";

const apiUrl = process.env.API_URL ?? "http://localhost:4000";
const output = "src/types/api.generated.ts";

const response = await fetch(`${apiUrl}/docs/openapi.json`);
if (!response.ok) {
  throw new Error(`OpenAPI spec unavailable at ${apiUrl}: ${response.status}`);
}
const spec = await response.json();
const schemas = spec.components?.schemas ?? {};

// shortcut: @fastify/swagger emits $ref "#/components/schemas/def-N" for shared schemas
// (recursive categories) without defining them; typed as unknown until the API exports them.
const dropDanglingRefs = (node: unknown): unknown => {
  if (Array.isArray(node)) return node.map(dropDanglingRefs);
  if (!node || typeof node !== "object") return node;
  const ref = (node as { $ref?: unknown }).$ref;
  if (typeof ref === "string") {
    const name = ref.replace("#/components/schemas/", "");
    if (ref.startsWith("#/components/schemas/") && !(name in schemas))
      return {};
  }
  return Object.fromEntries(
    Object.entries(node).map(([k, v]) => [k, dropDanglingRefs(v)]),
  );
};

const ast = await openapiTS(dropDanglingRefs(spec) as typeof spec);
await writeFile(
  output,
  `// Gerado por \`bun run gen:api\` a partir de ${apiUrl}/docs/openapi.json. Não edite.\n\n${astToString(ast)}`,
);
console.log(`Wrote ${output}`);
