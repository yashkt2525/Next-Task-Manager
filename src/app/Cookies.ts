import { NextApiRequest, NextApiResponse } from "next";

export const setCookies = async (
  req: NextApiRequest,
  res: NextApiResponse,
  cookie
) => {
  // Set an HTTP response header
  res.setHeader("cookie", cookie);

  // Send a response
  res.status(200).json({ message: "Response with custom header." });
};
