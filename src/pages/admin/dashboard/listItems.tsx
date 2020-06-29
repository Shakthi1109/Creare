import React from 'react';

function listitems(props){
    const items = props.items;
    const listitems = items.map(item =>
        {
            return <div className = "list" key="items.key">
                <p>
                    {item.text}
                </p>
            </div>
        })
    return(
        <div>{listitems}</div>
    )
}

export default listitems;