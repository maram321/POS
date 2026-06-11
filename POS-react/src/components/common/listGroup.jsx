import React from 'react';
import "./listGroup.css"

const ListGroup = (props) => {
    const { items, selectedItem, onItemSelect } = props;

    return ( 
        <div className="list">
            { items.map((item, index) => {
                return(
                    <div className='list-item'>
                        <p onClick={()=> onItemSelect(item)} key={index} className={item === selectedItem ? "active" : ""}>{item}</p>
                    </div>
                )
            })}
        </div>
    );
}
 
export default ListGroup;