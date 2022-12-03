import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, useAuth } from "@descope/react-sdk";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./assets/css/App.css";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import RTLLayout from "./layouts/rtl";
import theme from "./theme/theme";

const App = () => {
	const { authenticated, me } = useAuth();
	useEffect(() => {
		if (authenticated) {
			// when the app is loaded - get logged in user details
			me();
		}
	}, [authenticated]);

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
}

ReactDOM.render(
	<AuthProvider projectId={process.env.REACT_APP_PROJECT_ID} baseUrl={process.env.REACT_APP_BASE_URL}>
			<App />
	</AuthProvider>,
	document.getElementById("root")
);
