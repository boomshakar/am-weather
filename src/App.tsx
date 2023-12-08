import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import * as Page from "./pages";
import routes from "./utils/route";

function App() {
	return (
		<Router>
			<Routes>
				<Route path={routes.home} element={<Page.Home />} />
			</Routes>
		</Router>
	);
}

export default App;
