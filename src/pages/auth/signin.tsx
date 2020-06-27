import { useState, useEffect } from "react"
import Link from "next/link"
import Router from "next/router"
import useRequest from "../../custom-hook/use-request"
import Loader from "../../components/loader"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Toast from "../../components/toasts/index"
export default () => {
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const [isLoading, setisLoading] = useState(false)
	const [err, seterr] = useState("")
	const [onErr, setonErr] = useState(false)
	const [visiblePass, setvisiblePass] = useState(false)
	const { doRequest } = useRequest({
		url: "/api/user/signin",
		method: "post",
		body: {
			email,
			password
		},
		onSuccess: () => Router.push("/home"),
		onError: (error) => {
			setonErr(true)
			seterr(error)
			setisLoading(false)
		}
	})

	const Login = async () => {
		setisLoading(true)
		const resp = await doRequest()
	}

	return (
		<div className='sign'>
			{onErr ? <Toast data={err} /> : <> </>}
			<div className='form'>
				<h1>Creare</h1>
				<br />
				<input
					type='text'
					placeholder='e-Mail'
					onChange={(e) => setemail(e.target.value)}
				/>
				<br />
				<div className='pass'>
					<input
						type={visiblePass ? "text" : "password"}
						placeholder='Password'
						onChange={(e) => setpassword(e.target.value)}
					/>
					{visiblePass ? (
						<FaEyeSlash
							className='icon'
							onClick={() => {
								setvisiblePass(false)
							}}
						/>
					) : (
						<FaEye
							className='icon'
							onClick={() => {
								setvisiblePass(true)
							}}
						/>
					)}
				</div>
				<br />
				{isLoading ? (
					<Loader isLoading={isLoading}></Loader>
				) : (
					<>
						<button
							// className='btn--blue'
							className='btn--blue'
							onClick={() => {
								Login()
							}}>
							Sign-In
						</button>
					</>
				)}
				<br />
				<h3>or</h3>
				<Link href='/auth/signup'>
					<a>Create New Account</a>
				</Link>
			</div>
		</div>
	)
}
