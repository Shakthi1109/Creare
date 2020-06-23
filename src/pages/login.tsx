import { useState } from "react"
import Link from "next/link"
export default () => {
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")

	return (
		<div className='sign'>
			<h1>Creare</h1>
			<div className='form'>
				<input
					type='text'
					placeholder='e-Mail'
					onChange={(e) => setemail(e.target.value)}
				/>
				<br />
				<input
					type='password'
					placeholder='Password'
					onChange={(e) => setpassword(e.target.value)}
				/>
				<br />
				<Link href='/signup'>Create New Account</Link>
				<button className='btn'>Sign In</button>
			</div>
		</div>
	)
}
