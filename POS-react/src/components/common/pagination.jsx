import React from 'react';
import _ from "lodash";
import "./pagination.css"

export function paginate (items, pageNumber, pageSize) {
    const startIndex = (pageNumber -1)* pageSize;
    return _(items)
     .slice(startIndex)
     .take(pageSize)
     .value();
}

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return ( 
        <div className="pages">
            {pages.map(page => 
            <div className='page-item'>
                <p onClick={()=> onPageChange(page)} key={page} className={ page === currentPage ? "active" : ""}>{page}</p>
            </div>
            )}
        </div>

     );
}

export default Pagination;