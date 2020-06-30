import { MdClose } from "react-icons/md"

export default ({ closeFunc }) => (
	<div className='overlay'>
		<div className='container'>
			<div className='form'>
				<h1>Schedule New Class</h1>
				<input type='text' placeholder='Title of Class' />
				<select name='' id=''>
					<option value='name1'>Teacher 1</option>
					<option value='name1'>Teacher 2</option>
					<option value='name1'>Teacher 3</option>
				</select>
				<select name='' id=''>
					<option value='sub1'>Sub 1</option>
					<option value='sub2'>Sub 2</option>
					<option value='sub3'>Sub 3</option>
				</select>
				<span>
					<h2>Choose Starting date</h2>
					<input type='datetime-local' />
				</span>
				<span>
					<h2>Choose ending date</h2>
					<input type='datetime-local' />
				</span>
				<button className='btn--orange'>Submit</button>
			</div>
			<MdClose
				onClick={() => {
					closeFunc()
				}}
				className='icon'
			/>
		</div>
	</div>
)
