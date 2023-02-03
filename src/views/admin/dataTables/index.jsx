import { Box, SimpleGrid, useColorMode } from "@chakra-ui/react";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import {
	columnsDataCheck,
	columnsDataColumns,
	columnsDataComplex, columnsDataDevelopment
} from "views/admin/dataTables/variables/columnsData";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { AdminExperience } from "components/adminExperience/index";
import { Descope } from "@descope/react-sdk";

export default function Settings() {
	const [data, setData] = useState({
		check: [],
		columns: [],
		development: [],
		complex: [],
		loaded: false,
	});
	const { colorMode } = useColorMode();
	let history = useHistory();

	const [authenticationFlow, setAuthenticationFlow] = useState(false);
	const projectId = localStorage.getItem('projectId') || process.env.REACT_APP_DESCOPE_PROJECT_ID;
	if (!data.loaded) {
		// TODO - load data once, in useEffect
		fetch("/api/data", {
			method: "get",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"x-project-id": projectId
			},
		})
			.then((res) => {
				if (res.status === 404) {
					setAuthenticationFlow(true);
				} 
				res.json();
			})
			.then((res) => {
				// TODO - clean console.log from app
				if (res) {
					res.body.loaded = true;
					setData(res.body);
					setAuthenticationFlow(false);
				}
			})
			.catch((err) => console.log('err => ', err));
	}

	// Chakra Color Mode
	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<SimpleGrid
				mb="20px"
				columns={authenticationFlow ? { sm: 1, md: 1 }: { sm: 1, md: 2 }}
				spacing={{ base: "20px", xl: "20px" }}
			>
				{
					authenticationFlow ? 
					<Box margin={'auto'} width='50%'>
						<Descope
						flowId={
						process.env.REACT_APP_DESCOPE_SIGN_IN_FLOW_ID ||
						"step-up"
						}
						onSuccess={(e) => {
							console.log('success => ', e)
						//   history.push("/admin/data-tables");
						}}
						onError={(e) => console.log("Error!")}
						theme={ colorMode }
						/>
					</Box>
					: 
					<>
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
					</>
				}
			</SimpleGrid>
			<Box display={'flex'} justifyContent={'center'}>
					<AdminExperience/>
			</Box>
		</Box>
	);
}
