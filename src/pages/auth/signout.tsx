import { IoMdHappy } from "react-icons/io";
import Router from "next/router";
import buildClient from "../../service/build-client";
const signOutComponent = () => (
	<div className='FoF'>
		<h1>Creare</h1>
		<div>
			<IoMdHappy className='icon' />
			<div>
				<h2>Thankyou...</h2>
				<button
					className='btn'
					onClick={() => {
						Router.push("/auth/signin");
					}}>
					Wanna Sign-In Again?
				</button>
			</div>
		</div>
	</div>
);

signOutComponent.getInitialProps = async (appContext) => {
	const { data } = await buildClient(appContext).get("/api/user/signout");
};

export default signOutComponent;
