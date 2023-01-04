import DescopeClient from "@descope/node-sdk";
import * as dotenv from "dotenv";

dotenv.config();

export default async function handler(request, response) {
  const projectId = request.headers['x-project-id'] || process.env.REACT_APP_DESCOPE_PROJECT_ID;
  console.log(`projectId=${projectId}`);
  const cookies = request.cookies;
  const session_token = cookies.DS; // extract from request. The value is stored typically in DS cookie.

  const descopeClient = DescopeClient({
    projectId: projectId,
    baseUrl: process.env.DESCOPE_BASE_URL
  });
  
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
          name: "Audit Log",
          commission: 1024,
          date: "13.Mar.2021",
          quota: 25,
        },
        {
          name: "Dark Mode",
          commission: 858,
          date: "24.Jan.2021",
          quota: 100,
        },
      ],
      check: [
        {
          name: ["Analytics", false],
          commission: 858,
          date: "21.Feb.2021",
          quota: 35.4,
        },
        {
          name: ["Audit Log", false],
          commission: 1024,
          date: "13.Mar.2021",
          quota: 25,
        },
        {
          name: ["Dark Mode", false],
          commission: 258,
          date: "24.Jan.2021",
          quota: 100,
        },
        {
          name: ["Marketplace", false],
          commission: 1024,
          date: "Oct 24, 2022",
          quota: 75.5,
        },
        {
          name: ["Marketplace", false],
          commission: 258,
          date: "Oct 24, 2022",
          quota: 75.5,
        },
        {
          name: ["Marketplace", false],
          commission: 258,
          date: "Oct 24, 2022",
          quota: 75.5,
        },
      ],
      complex: [
        {
          name: "Marketplace",
          status: "Error",
          date: "20.May.2021",
          quota: 90,
        },
        {
          name: "Marketplace",
          status: "Approved",
          date: "12.Jul.2021",
          quota: 50.5,
        },
      ],
      development: [
        {
          name: "Audit Logs",
          tech: ["apple"],
          date: "21.Feb.2021",
          quota: 35.4,
        },
        {
          name: "Dark Mode",
          tech: ["apple", "windows"],
          date: "13.Mar.2021",
          quota: 25,
        },
        {
          name: "Automated Billing",
          tech: ["apple", "android", "windows"],
          date: "24.Jan.2021",
          quota: 100,
        },
        {
          name: "Analytics",
          tech: ["apple", "windows"],
          date: "Oct 24, 2022",
          quota: 75.5,
        },
      ],
    };

    let base_data_cs = {
      columns: [
        {
          name: "Marketplace",
          commission: 2458,
          date: "12.Jan.2021",
          quota: 75.5,
        },
        {
          name: "Analytics",
          commission: 1485,
          date: "21.Feb.2021",
          quota: 35.4,
        },
      ],
      check: [
        {
          name: ["Marketplace", false],
          commission: 2458,
          date: "12.Jan.2021",
          quota: 75.5,
        },
        {
          name: ["Analytics", true],
          commission: 1485,
          date: "21.Feb.2021",
          quota: 35.4,
        },
        {
          name: ["Dark Mode", true],
          commission: 1024,
          date: "13.Mar.2021",
          quota: 25,
        },
        {
          name: ["Custom Dashboard", true],
          commission: 858,
          date: "24.Jan.2021",
          quota: 100,
        },
        {
          name: ["Marketplace", false],
          commission: 258,
          date: "Oct 24, 2022",
          quota: 75.5,
        },
      ],
      complex: [
        {
          name: "Marketplace",
          status: "Approved",
          date: "24.Jan.2021",
          quota: 75.5,
        },
        {
          name: "Marketplace",
          status: "Disable",
          date: "30.Dec.2021",
          quota: 25.5,
        },
      ],
      development: [
        {
          name: "Marketplace",
          tech: ["apple", "android", "windows"],
          date: "12.Jan.2021",
          quota: 75.5,
        },
        {
          name: "Audit Logs",
          tech: ["apple"],
          date: "21.Feb.2021",
          quota: 35.4,
        },
        {
          name: "Dark Mode",
          tech: ["apple", "windows"],
          date: "13.Mar.2021",
          quota: 25,
        },
        {
          name: "Analytics",
          tech: ["apple", "android", "windows"],
          date: "24.Jan.2021",
          quota: 100,
        },
        {
          name: "Custom Dashboard",
          tech: ["apple", "windows"],
          date: "Oct 24, 2022",
          quota: 75.5,
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
}

