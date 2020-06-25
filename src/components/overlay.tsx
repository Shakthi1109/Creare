export default ({ data, closeFunc }) => (
	<div className='overlay'>
		<div className='container'>
			<h1>Dummy</h1>
			<button
				onClick={() => {
					closeFunc()
				}}>
				close
			</button>
		</div>
	</div>
)
