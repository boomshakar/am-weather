import Map from "../../components/Map";
import { TopNavBar } from "../../components/TopNavBar";

export const Home = () => {
	return (
		<main className="homepage">
			<div className="homepage_nav">
				<TopNavBar />
			</div>
			<div className="homepage_content">
				<Map />
			</div>
		</main>
	);
};
