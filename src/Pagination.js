import React from 'react'

export default function Pagination({ gotoNextPage, gotoPrevPage}) {
    return (
        <div>
            {/* the statement below checks if both condition are true
                so if no page is present it will not render button */}
            {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
            {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
        </div>
    )
}
