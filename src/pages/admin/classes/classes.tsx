import Paginate from "../../../components/paginate";
import { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const classesComponent = ({ status, wholeData }) => {
	const [overlay, setoverlay] = useState(false);
	const [data, setdata] = useState([]);
	const [slicedData, setslicedData] = useState([]);
	const [indexRef, setindexRef] = useState(0);

	useEffect(() => {
		async function asyncFunc() {
			let arr = await wholeData.filter((item) => item.status === status);
			setdata([...arr]);
			setlength(arr.length);
		}
		asyncFunc();
	}, [status, wholeData]);
	const [index, setindex] = useState(0);
	const [capacity, setcapacity] = useState(10);
	const [selected, setselected] = useState(-1);
	const [length, setlength] = useState(0);

	useEffect(() => {
		setslicedData(data.slice(0, capacity));
	}, [data]);

	useEffect(() => {
		let ind = index * capacity;
		setindexRef(ind);
		setslicedData(data.slice(ind, ind + capacity));
	}, [index]);

	return (
		<>
			<div className='dashboard'>
				<table>
					<thead>
						<tr>
							<th>
								Id
								<input type='text' placeholder='search' />
							</th>
							<th>
								Topic
								<input type='text' placeholder='search' />
							</th>
							<th>
								Subject
								<input type='text' placeholder='search' />
							</th>
							<th>
								Teacher
								<input type='text' placeholder='search' />
							</th>
							<th id='view'>View</th>
						</tr>
					</thead>
					<tbody>
						{slicedData.map(
							({ topic, id, subject, teacher }, ind) => {
								return (
									<tr key={indexRef + ind}>
										<td>{id}</td>
										<td>{topic}</td>
										<td>{subject.name}</td>
										<td>{teacher.name}</td>
										<td id='view'>
											<FaExternalLinkAlt
												onClick={() => {
													setoverlay(true);
												}}
												className='icon'
											/>
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>

				<Paginate
					prev={() => {
						setindex(index - 1);
					}}
					next={() => {
						setindex(index + 1);
					}}
					length={length}
					currentIndex={index}
					capacity={capacity}
				/>
			</div>
		</>
	);
};

export default classesComponent;
