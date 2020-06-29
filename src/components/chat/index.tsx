import { MdSend } from "react-icons/md"

export default ({}) => (
	<div className='chat'>
		<div className='chatWindow'></div>
		<div className='send'>
			<input type='text' placeholder='Ask your question..' />
			<MdSend className='icon' />
		</div>
	</div>
)
