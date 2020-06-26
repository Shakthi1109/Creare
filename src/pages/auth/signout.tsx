import { IoMdHappy } from "react-icons/io"
import Router from "next/router"
export default () => (
	<div className='FoF'>
		<h1>Creare</h1>
		<div>
			<IoMdHappy className='icon' />
			<div>
				<h2>Thankyou...</h2>
				<button
					className='btn'
					onClick={() => {
						Router.push("/auth/signin")
					}}>
					Wanna Sign-In Again?
				</button>
			</div>
		</div>
	</div>
)
