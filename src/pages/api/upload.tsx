/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import { type NodeRouter } from "next-connect/dist/types/node";

const router = createRouter<
  NextApiRequest & { files: File[] },
  NextApiResponse
>();

const oneMegabyteInBytes = 1000000;

export const upload_local = multer({
  limits: { fileSize: oneMegabyteInBytes * 2 },

  //   storage: multer.diskStorage({
  //     destination: "uploads",
  //     filename: (req, file, cb) => {
  //       console.log("uploading file new...");
  //       const filenamenew = `${Date.now()}-${file.originalname}`;
  //       cb(null, filenamenew);
  //     },
  //   }),

  storage: multer.memoryStorage(),
});

router.use(upload_local.array("uploadfile", 4) as unknown as NodeRouter);

router.post((req, res) => {
  console.log(req.files);
  console.log(req.body);

  // ADD EMAIL PART IN HERE.

  res.status(200).json(["Success"]);
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default router.handler();
