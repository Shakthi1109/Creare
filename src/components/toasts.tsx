import { MdError, MdClose, MdCheck } from "react-icons/md"

export default ({ data, type = "error", closeErr }) => (
	<div className='toast'>
		<div className='ico'>{type == "error" ? <MdError /> : <MdCheck />}</div>
		<div className='right'>
			<p>{data}</p>
			<MdClose onClick={() => closeErr()} className='icon' />
		</div>
	</div>
)
