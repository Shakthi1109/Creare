import { IoMdHappy } from "react-icons/io"
import Router from "next/router"
export default () => (
	<div className='FoF'>
		<h1>Creare</h1>
		<div>
			<IoMdHappy className='icon' />
			<div>
				<h2>We are under Development....</h2>
				<button
					className='btn'
					onClick={() => {
						Router.push("/index")
					}}>
					Wanna know about us..
				</button>
			</div>
		</div>
	</div>
)
