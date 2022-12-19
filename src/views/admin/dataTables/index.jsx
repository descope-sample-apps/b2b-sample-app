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
import { Descope } from "@descope/react-sdk";
import { useHistory } from "react-router-dom";

import { useState } from "react";

export default function Settings() {
	const [data, setData] = useState({
		check: [],
		columns: [],
		development: [],
		complex: [],
		loaded: false,
	});
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
		}).then(async (res) => {
			const resJson = await res.json();
			if (res.status === 200){ 
				console.log("200")
				
				resJson.body.loaded = true;
				setData(resJson.body);
			} 
			if (res.status === 401){ 
				console.log("401")
				resJson.body.loaded = false;

			} 
	
		})
			// .then((res) => res.json())
			// .then((res) => {
			// 	// TODO - clean console.log from app
			// 	console.log(res);
			// 	res.body.loaded = true;
			// 	setData(res.body);
			// })
			// .catch((err) => console.log("error"));
	}
	let history = useHistory();

	// Chakra Color Mode
	return (
		(data.loaded)? 
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
		</Box>
	:
	<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<Descope
				flowId="sign-in"
				onSuccess={(e) => {
					console.log("Success!" + JSON.stringify(e.detail.user));
					history.push("/data-tables");
				}}
				onError={(e) => console.log("Error!")}
				theme="light"
			/>

	</Box>
	);
}
