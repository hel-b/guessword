import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
// const handler = toNextJsHandler(auth);

// console.log("Auth handler initialized", handler);

// export const GET = async (req: Request) => {
//   console.log("GET called:", req.url);
//   return handler.GET(req);
// };

// export const POST = async (req: Request) => {
//   console.log("POST called:", req.url);
//   return handler.POST(req);
// };
