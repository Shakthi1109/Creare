import { IoMdHappy } from "react-icons/io"
import Router from "next/router"
import { useEffect } from "react"
export default ({ currentUser }) => {
	return (
		<div className='FoF'>
			<h1>Creare</h1>
			<div>
				<IoMdHappy className='icon' />
				<div>
					<h2>We are under Development....</h2>
					<button
						className='btn'
						onClick={() => {
							console.log(currentUser)
						}}>
						Wanna know about us..
					</button>
				</div>
			</div>
		</div>
	)
}
