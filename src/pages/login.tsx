import { useState, useEffect } from "react"
import Link from "next/link"
import Router from "next/router"
import useRequest from "../custom-hook/use-request"
import Loader from "../components/loader"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Toast from "../components/toasts"
export default () => {
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const [isLoading, setisLoading] = useState(false)
	const [err, seterr] = useState("")
	const [vEmail, setvEmail] = useState(false)
	const [vPass, setvPass] = useState(false)
	const [canLogin, setcanLogin] = useState(false)
	const [onErr, setonErr] = useState(false)
	const [visiblePass, setvisiblePass] = useState(false)
	const [instruct, setinstruct] = useState("")
	const { doRequest } = useRequest({
		url: "/api/user/signin",
		method: "post",
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push("/home"),
	})

	let checkEmail = () => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			setvEmail(true)
			setinstruct(
				`Valid Email.. \nNow the Password must be atleast 8 Characters`,
			)
		} else {
			if (email != "") setinstruct(`Please Provide a valid email`)
			setvEmail(false)
		}
	}

	let checkPassword = () => {
		if (password.length >= 8) {
			setvPass(true)
			setinstruct("")
		} else {
			if (password != "")
				setinstruct(`\nPassword must be atleast 8 Characters`)
			setvPass(false)
		}
	}

	const Login = async () => {
		if (canLogin) {
			setisLoading(true)
			const resp = await doRequest()
			if (resp[0].message) {
				setonErr(true)
				seterr(resp[0].message)
				setisLoading(false)
			}
		}
	}

	useEffect(() => {
		checkEmail()
		checkPassword()
	}, [email, password])

	useEffect(() => {
		if (vEmail && vPass) {
			setcanLogin(true)
		} else {
			setcanLogin(false)
		}
	}, [vEmail, vPass])

	return (
		<div className='sign'>
			{onErr ? (
				<Toast
					data={err}
					closeErr={() => {
						setonErr(false)
					}}
				/>
			) : (
				<> </>
			)}
			<h1>Creare</h1>
			<div className='form'>
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
						{instruct != "" ? <p>{instruct}</p> : <></>}
						<button
							disabled={!canLogin}
							className='btn'
							onClick={() => Login()}>
							Sign In
						</button>
					</>
				)}
				<br />
				<b>or</b>
				<Link href='/signup'>
					<a>Create New Account</a>
				</Link>
			</div>
		</div>
	)
}
