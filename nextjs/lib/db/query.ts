export default function query(
  db: any,
  query: string,
  params: Record<string, unknown>,
  queryType: "read" | undefined = undefined,
) {
  try {
    const stmt = db.prepare(query);
    try {
      switch (queryType) {
        case "read":
          return stmt.all(params);
        default:
          return stmt.run(params);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error executing query: ${error.message}`);
      } else {
        throw error;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error preparing query: ${error.message}`);
    } else {
      throw error;
    }
  }
}
