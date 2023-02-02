import { Box, SimpleGrid } from "@chakra-ui/react";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import {
	columnsDataCheck,
	columnsDataColumns,
	columnsDataComplex, columnsDataDevelopment
} from "views/admin/dataTables/variables/columnsData";

import { useState } from "react";
import { AdminExperience } from "components/adminExperience/index";
import { getSessionToken } from '@descope/react-sdk';

export default function Settings() {
	const [data, setData] = useState({
		check: [],
		columns: [],
		development: [],
		complex: [],
		loaded: false,
	});
	const projectId = localStorage.getItem('projectId') || process.env.REACT_APP_DESCOPE_PROJECT_ID;
	const sessionToken = getSessionToken();

	if (!data.loaded) {
		// TODO - load data once, in useEffect
		fetch("/api/data", {
			method: "get",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"x-project-id": projectId,
				Authorization: `Bearer ${sessionToken}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				// TODO - clean console.log from app
				console.log(res);
				res.body.loaded = true;
				setData(res.body);
			})
			.catch((err) => console.log(err));
	}

	// Chakra Color Mode
	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<SimpleGrid
				mb="20px"
				columns={{ sm: 1, md: 2 }}
				spacing={{ base: "20px", xl: "20px" }}
			>
				<DevelopmentTable
					columnsData={columnsDataDevelopment}
					tableData={data.development}
				/>
				<CheckTable columnsData={columnsDataCheck} tableData={data.check} />
				<ColumnsTable
					columnsData={columnsDataColumns}
					tableData={data.columns}
				/>
				<ComplexTable
					columnsData={columnsDataComplex}
					tableData={data.complex}
				/>
			</SimpleGrid>
			<Box display={'flex'} justifyContent={'center'}>
					<AdminExperience/>
			</Box>
		</Box>
	);
}
