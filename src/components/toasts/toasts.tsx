import { MdError, MdClose, MdCheck } from "react-icons/md"

export default ({ type, closeErr, message }) => (
	<div className='toast'>
		<div className='ico'>{type == "error" ? <MdError /> : <MdCheck />}</div>
		<div className='right'>
			<p>{message}</p>
			<MdClose onClick={() => closeErr()} className='icon' />
		</div>
	</div>
)
