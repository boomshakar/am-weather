import { useEffect, useState } from "react";
import { uuid } from "../utils";

/**
 * TopNavBar component represents the top navigation bar of the Weather Map application.
 * It includes the application logo, login/logout button, and optional login popup.
 * @component
 */
export const TopNavBar = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");

	// Check if the user is already logged in on component mount
	useEffect(() => {
		const userId = localStorage.getItem("aweatherMap");
		if (userId) {
			setIsUserLoggedIn(true);
			setUsername(JSON.parse(userId));
		}
	}, [isUserLoggedIn]);

	/**
	 * Toggle the login popup visibility.
	 */
	const loginPopupToggle = () => setIsUserLoggedIn((prev) => !prev);

	/**
	 * Handle the form submission for user login.
	 * @param {React.FormEvent<HTMLFormElement>} e - Form submission event.
	 */
	const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		localStorage.setItem("aweatherMap", JSON.stringify(`${username}-${uuid()}`));
		setUsername("");
		loginPopupToggle();
	};

	const logoutHandler = () => {
		localStorage.removeItem("aweatherMap");
		setUsername("");
		loginPopupToggle();
	};
	return (
		<nav className="top_nav_bar">
			<div className="top_nav_bar__logo">
				<img
					src="https://purepng.com/public/uploads/large/weather-forecast-symbol-v7o.png"
					width={40}
					height={40}
					alt="logo"
				/>
				<h1>Weather Map</h1>
			</div>
			<div className="top_nav_bar__ctas">
				<button onClick={isUserLoggedIn ? logoutHandler : loginPopupToggle}>
					{isUserLoggedIn ? `Logout, ${username}` : "Login"}
				</button>
			</div>

			{!isUserLoggedIn ? (
				<div className="login_popup">
					<div className="login_popup_bgmask"></div>
					<div className="login_popup_wrapper">
						<div className="login_popup_wrapper__logo">
							<img
								src="https://purepng.com/public/uploads/large/weather-forecast-symbol-v7o.png"
								width={40}
								height={40}
								alt="logo"
							/>
						</div>
						<h1>Login to view weather insights</h1>

						<form onSubmit={loginHandler} className="login_popup_wrapper__form">
							<input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								type="text"
								placeholder="Username"
							/>
							<button>Login</button>
						</form>
					</div>
				</div>
			) : null}
		</nav>
	);
};
