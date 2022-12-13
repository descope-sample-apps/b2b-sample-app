import DescopeClient from "@descope/node-sdk";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const descopeClient = DescopeClient({
  projectId: process.env.DESCOPE_PROJECT_ID,
  baseUrl: process.env.DESCOPE_BASE_URL
});
const app = express();

const port = 4000;
console.log(`server starting on port ${port}... `);

app.use(cookieParser());

app.get("/data", async (request, response) => {
  const cookies = request.cookies;
  const session_token = cookies.DS; // extract from request. The value is stored typically in DS cookie.

  let roles = [];

  try {
    const out = await descopeClient.validateSession(session_token);
    Object.keys(out.token.tenants || []).forEach((tenantId) => {
      roles = roles.concat(out.token.tenants[tenantId].roles);
    });
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

    response.status(200).json({
      body: base_data,
      // TODO - remove request/cookies data from response json
      query: request.query,
      cookies: request.cookies,
    });
  } catch (error) {
    console.log("unauthenticated user");
    console.log(error);
    response.status(401).json({
      body: {},
      // TODO - remove request/cookies data from response json
      query: request.query,
      cookies: request.cookies,
    });
    response.send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// export default async function handler(request, response) {

//   }
