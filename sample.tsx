import express, { Request, Response } from "express";
import cors from "cors";
import { sp } from "@pnp/sp/presets/all";
import { SPFetchClient } from "@pnp/nodejs";
import "dotenv/config";
import * as path from "path";

const siteUrl = process.env.SHAREPOINT_SITE_URL;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;
const tenantId = process.env.AZURE_TENANT_ID;
const fileUrl = process.env.FILE_SERVER_RELATIVE_URL;
const port = process.env.PORT || 5002;

if (!siteUrl || !clientId || !clientSecret || !tenantId || !fileUrl) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

sp.setup({
  sp: {
    baseUrl: siteUrl,
    fetchClientFactory: () => {
      return new SPFetchClient(siteUrl, clientId, clientSecret, tenantId);
    },
  },
});
console.log("PnPjs v2 setup complete.");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.get("/api/download-excel", async (req: Request, res: Response) => {
  try {
    const file = sp.web.getFileByServerRelativePath(fileUrl);
    const buffer: ArrayBuffer = await file.getBuffer();
    const filename = path.basename(fileUrl);
    res.set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    });
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Error downloading file");
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

