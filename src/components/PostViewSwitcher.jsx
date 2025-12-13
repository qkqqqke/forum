import React from 'react';
import { ReactComponent as ListSvg } from '../assets/list.svg'
import { ReactComponent as GridSvg } from '../assets/grid.svg'


const PostViewSwitcher = () => {
    return (
        <div class="view_switcher_container">
            <button>
                <ListSvg/>
            </button>

            <button>
                <GridSvg/>
            </button>
        </div>
    );
};

export default PostViewSwitcher;