import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, useSession, useUser } from "@descope/react-sdk";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./assets/css/App.css";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import RTLLayout from "./layouts/rtl";
import theme from "./theme/theme";

/* eslint-disable */
declare global {
	interface Window {
		analytics?: any;
	}
}
/* eslint-enable */

const App = () => {
	const { isAuthenticated, isSessionLoading } = useSession();

	return (
		<ChakraProvider theme={theme}>
			<React.StrictMode>
				<HashRouter>
					<Switch>
						<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/rtl`} component={RTLLayout} />
						<Redirect from="/" to="/admin" />
					</Switch>
				</HashRouter>
			</React.StrictMode>
		</ChakraProvider>
	);
};

const AppRoot = () => {
	const queryParams = new URLSearchParams(window.location.search);
	if (queryParams.get("project")) {
		localStorage.setItem("projectId", queryParams.get("project"));
	}
	if (queryParams.get("baseUrl")) {
		localStorage.setItem("baseUrl", queryParams.get("baseurl"));
	}
	const projectId = localStorage.getItem("projectId") || process.env.REACT_APP_DESCOPE_PROJECT_ID;
	const projectId = localStorage.getItem("baseUrl") || process.env.REACT_APP_DESCOPE_BASE_URL;
	window.analytics.page({ projectId: projectId });

	return (
		<AuthProvider projectId={projectId} baseUrl={baseUrl}>
			<App />
		</AuthProvider>
	);
};

ReactDOM.render(<AppRoot />, document.getElementById("root"));
