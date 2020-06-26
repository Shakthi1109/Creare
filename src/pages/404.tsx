import { FaSadTear } from "react-icons/fa"
import { IoMdSad } from "react-icons/io"
export default () => (
	<div className='FoF'>
		<h1>Creare</h1>
		<div>
			<IoMdSad className='icon' />
			<div>
				<h2>404</h2>
				<h3>We can't find this page </h3>
				<button
					className='btn'
					onClick={() => {
						history.back()
					}}>
					Back to Previous.
				</button>
			</div>
		</div>
	</div>
)
