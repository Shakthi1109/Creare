import React from 'react';
import Sidebar from "../../../components/sidebars/admin_Sidebar"
import listitems from './listItems';

class superAdmin extends React.Component{
    constructor(props){
        super(props);
            this.state={
                items:[],
                currentItem:{
                    text:'',
                    key:''
                }
            }
            this.handleInput = this.handleInput.bind(this);
            this.addItem = this.addItem.bind(this);
        }

        handleInput(e){
            this.setState({
                currentItem:{
                    text:e.target.value,
                    key:Date.now()
                }
            })
        }
        addItem(e){
            e.preventDefault();
            const newItem = this.state["currentItem"];
            console.log(newItem);
            if (newItem.text !== ""){
                const newitem=[...this.state["items"], newItem];
                this.setState({
                    items:newItem,
                    currentItem:{
                        text:'',
                        key:''
                    }
                })
            }
        }
    
    
    render(){
        return(
            <>
            <Sidebar curr={"superAdmin"} />
            <div className='dashboard'>
 				<h1>Super Admin</h1>
 			</div>
             <div className="superAdmin">
                <form id="superAdmin-form">
                    <input type="text" placeholder="Enter Text"
                    value={this.state["currentItem"].text}
                    onChange={this.handleInput}/>
                    <button type="submit">Add</button>
                </form>
                {/* <listitems items = {this.state.items}></listitems> */}
            </div>
            </>
        );
    }
}

export default superAdmin;

// export default () => {

//     constructor(props){
//         super(props){
//             this.state={
//                 items:[],
//                 currentIte:{
//                     text:'',
//                     key:'',

//                 }
//             }
//         }
//     }
//     return(
//         <>
//         <Sidebar curr={"superAdmin"} />
//         <div className='dashboard'>
// 			<h1>Super Admin</h1>
// 		</div>
//         <div className="superAdmin">
//                 <form id="superAdmin-form">
//                     <input type="text" placeholder="Enter Text"/>
//                     value={this.StaticRange.currentItem.text}
//                     onChange={}
//                     <button type="submit">Add</button>
//                 </form>
//         </div>
//         </>
//     )
// }