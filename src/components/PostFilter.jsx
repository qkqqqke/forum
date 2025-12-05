import React, { useEffect, useState } from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';
import { useDebounce } from '../hooks/useDebounce';

const PostFilter = ({ filter, setFilter }) => {

    const [filterInput, setFilterInput] = useState(filter);
    const debounceValue = useDebounce (filterInput, 500);

    useEffect(()=>{
        setFilter(filterInput);
    }, [debounceValue])

    return (
        <div>
            <MyInput
                placeholder={'Поиск'}
                value={filterInput.query}
                onChange={e => setFilterInput({ ...filterInput, query: e.target.value })}
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort     })}
                defaultValue="Сортировка"
                options={[
                    { value: 'title', name: 'По названию' },
                    { value: 'body', name: 'По описанию' }
                ]}
            />
        </div>
    );
};

export default PostFilter;