import React from 'react';
import { ReactComponent as ListSvg } from '../assets/list.svg'
import { ReactComponent as GridSvg } from '../assets/grid.svg'


const PostViewSwitcher = ({ template, setTemplate }) => {
    return (
        <div className="view_switcher_container">
            <button onClick={() => setTemplate({ ...template, current: 'list' })}>
                <ListSvg />
            </button>

            <button onClick={() => setTemplate({ ...template, current: 'grid' })}>
                <GridSvg stroke="#e3e3e3" fill="none"/>
            </button>
        </div>
    );
};

export default PostViewSwitcher;