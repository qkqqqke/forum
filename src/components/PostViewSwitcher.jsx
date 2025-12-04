import React from 'react';

const PostViewSwitcher = () => {
    return (
        <div class="view-switcher-container">
            <button class="view-btn active">
                <span class="btn-text">Список</span>
            </button>

            <button class="view-btn">
                <span class="btn-text">Сетка</span>
            </button>
        </div>
    );
};

export default PostViewSwitcher;