import React from 'react';
import Sidebar from "../../../components/sidebar"

export default () => {
    return(
        <>
        <Sidebar curr={"superAdmin"} />
        <div className='dashboard'>
			<h1>Super Admin</h1>
		</div>
        <div className="superAdmin">
                <form id="superAdmin-form">
                    <input type="text" placeholder="Enter Text"/>
                    <button type="submit">Add</button>
                </form>
        </div>
        
        </>
    )
}

// class superAdmin extends React.Component{
//     render(){
//         return(
//             <>
//             <Sidebar curr={"superAdmin"} />
//             <div className='dashboard'>
//  				<h1>Super Admin</h1>
//  			</div>
//             </>
//         );
//     }
// }

// export default superAdmin;