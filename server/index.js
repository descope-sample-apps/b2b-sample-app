import DescopeClient from "@descope/node-sdk";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const descopeClient = DescopeClient({
  projectId: process.env.APP_PROJECT_ID,
});
const app = express();

console.log("server starting... ");
app.use(express.static("../client/build"));
const port = 8080;

app.get("/data", async (request, response) => {
  const cookies = request.cookies;
  console.log(cookies);
  const session_token = cookies.DS; // extract from request. The value is stored typically in DS cookie.
  const refresh_token = cookies.DSR; // optional parameter, extract from request. The value is stored typically in DSR cookie.

  let roles = [];

  try {
    const out = await descopeClient.validateSession(session_token);
    Object.keys(out.token.tenants).forEach((tenantId) => {
      console.log(tenantId);
      roles = roles.concat(out.token.tenants[tenantId].roles);
    });
  } catch (error) {
    console.log("unauthenticated user");
  }

  let base_data = { columns: [], check: [], complex: [], development: [] };
  let base_data_marketing = {
    columns: [
      {
        name: "Venus DS",
        quantity: 1024,
        date: "13.Mar.2021",
        progress: 25,
      },
      {
        name: "Venus 3D Asset",
        quantity: 858,
        date: "24.Jan.2021",
        progress: 100,
      },
    ],
    check: [
      {
        name: ["Venus DB PRO", false],
        quantity: 858,
        date: "21.Feb.2021",
        progress: 35.4,
      },
      {
        name: ["Venus DS", false],
        quantity: 1024,
        date: "13.Mar.2021",
        progress: 25,
      },
      {
        name: ["Venus 3D Asset", false],
        quantity: 258,
        date: "24.Jan.2021",
        progress: 100,
      },
      {
        name: ["Marketplace", false],
        quantity: 1024,
        date: "Oct 24, 2022",
        progress: 75.5,
      },
      {
        name: ["Marketplace", false],
        quantity: 258,
        date: "Oct 24, 2022",
        progress: 75.5,
      },
      {
        name: ["Marketplace", false],
        quantity: 258,
        date: "Oct 24, 2022",
        progress: 75.5,
      },
    ],
    complex: [
      {
        name: "Marketplace",
        status: "Error",
        date: "20.May.2021",
        progress: 90,
      },
      {
        name: "Marketplace",
        status: "Approved",
        date: "12.Jul.2021",
        progress: 50.5,
      },
    ],
    development: [
      {
        name: "Venus DB PRO",
        tech: ["apple"],
        date: "21.Feb.2021",
        progress: 35.4,
      },
      {
        name: "Venus DS",
        tech: ["apple", "windows"],
        date: "13.Mar.2021",
        progress: 25,
      },
      {
        name: "Venus 3D Asset",
        tech: ["apple", "android", "windows"],
        date: "24.Jan.2021",
        progress: 100,
      },
      {
        name: "Marketplace",
        tech: ["apple", "windows"],
        date: "Oct 24, 2022",
        progress: 75.5,
      },
    ],
  };

  let base_data_cs = {
    columns: [
      {
        name: "Marketplace",
        quantity: 2458,
        date: "12.Jan.2021",
        progress: 75.5,
      },
      {
        name: "Venus DB PRO",
        quantity: 1485,
        date: "21.Feb.2021",
        progress: 35.4,
      },
    ],
    check: [
      {
        name: ["Marketplace", false],
        quantity: 2458,
        date: "12.Jan.2021",
        progress: 75.5,
      },
      {
        name: ["Venus DB PRO", true],
        quantity: 1485,
        date: "21.Feb.2021",
        progress: 35.4,
      },
      {
        name: ["Venus DS", true],
        quantity: 1024,
        date: "13.Mar.2021",
        progress: 25,
      },
      {
        name: ["Venus 3D Asset", true],
        quantity: 858,
        date: "24.Jan.2021",
        progress: 100,
      },
      {
        name: ["Marketplace", false],
        quantity: 258,
        date: "Oct 24, 2022",
        progress: 75.5,
      },
    ],
    complex: [
      {
        name: "Marketplace",
        status: "Approved",
        date: "24.Jan.2021",
        progress: 75.5,
      },
      {
        name: "Marketplace",
        status: "Disable",
        date: "30.Dec.2021",
        progress: 25.5,
      },
    ],
    development: [
      {
        name: "Marketplace",
        tech: ["apple", "android", "windows"],
        date: "12.Jan.2021",
        progress: 75.5,
      },
      {
        name: "Venus DB PRO",
        tech: ["apple"],
        date: "21.Feb.2021",
        progress: 35.4,
      },
      {
        name: "Venus DS",
        tech: ["apple", "windows"],
        date: "13.Mar.2021",
        progress: 25,
      },
      {
        name: "Venus 3D Asset",
        tech: ["apple", "android", "windows"],
        date: "24.Jan.2021",
        progress: 100,
      },
      {
        name: "Marketplace",
        tech: ["apple", "windows"],
        date: "Oct 24, 2022",
        progress: 75.5,
      },
    ],
  };

  if (roles.includes("Marketing")) {
    base_data.columns = base_data.columns.concat(base_data_marketing.columns);
    base_data.check = base_data.check.concat(base_data_marketing.check);
    base_data.complex = base_data.complex.concat(base_data_marketing.complex);
    base_data.development = base_data.development.concat(
      base_data_marketing.development
    );
  } else if (roles.includes("Customer Success")) {
    base_data.columns = base_data.columns.concat(base_data_cs.columns);
    base_data.check = base_data.check.concat(base_data_cs.check);
    base_data.complex = base_data.complex.concat(base_data_cs.complex);
    base_data.development = base_data.development.concat(
      base_data_cs.development
    );
  }

  console.log(roles);
  response.status(200).json({
    body: base_data,
    query: request.query,
    cookies: request.cookies,
  });

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// export default async function handler(request, response) {

//   }
