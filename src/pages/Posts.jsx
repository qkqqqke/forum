import React, { useEffect, useState, useRef } from "react";
import PostService from "../API/PostService.js";
import PostFilter from '../components/PostFilter.jsx'
import PostForm from "../components/PostForm";
import PostsList from '../components/PostsList.jsx';
import Loader from "../components/UI/Loader/Loader.jsx";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import MySelect from "../components/UI/select/MySelect.jsx";
import Pagination from "../components/UI/pagination/Pagination.jsx";
import { useFetching } from "../hooks/useFetching.js";
import { usePosts } from '../hooks/usePosts.js';
import '../styles/App.css';
import { getPageCount } from '../utils/pages.js';
import { useObserver } from "../hooks/useObserver.js";
import PostViewSwitcher from "../components/PostViewSwitcher.jsx";
import { postsTemplate } from "../utils/template.js";



function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [lastLimit, setLastLimit] = useState(limit)
  const [page, setPage] = useState(1)
  const [template, setTemplate] = useState(postsTemplate)
  const lastElement = useRef()




  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const responce = await PostService.getAll(limit, page); 
    limit === -1 ? setPosts([...posts, ...responce.data]) : setPosts([...responce.data]);
    const totalCount = responce.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
    
  });

  const changePage = (item) => {
    setPage(item);

  }

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    if(limit === -1)
    setPage(page + 1)
  })

  useEffect(() => {
    switch(template.current){
      case 'grid':
        setLimit(12);
        break;
      case 'list':
        setLimit(10);
        break;
    }
  }, [template])

  useEffect(() => {
    if(limit !== lastLimit){
      setLastLimit(limit);
      setPage(1);
    }
    fetchPosts(limit, page);
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  const removePost = (post) => {
    setPosts(posts.filter((p) => post.id !== p.id))
  }

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  return (
    <div className="App">

      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <div className="posts__nav">
        <PostViewSwitcher template={template} setTemplate={setTemplate}/>
        <MySelect
          style={ template.current === 'grid' ? {display: "none"}:  {}}
          value={limit}
          onChange={value => setLimit(value)}
          defaultValue='Кол-во элементов на странице'
          options={[
            { value: 5, name: '5' },
            { value: 10, name: '10' },
            { value: 25, name: '25' },
            { value: -1, name: 'Показать все' },
          ]}></MySelect>
      </div>
      {
        postError && <h1>Произошла ошибка ${postError}</h1>
      }

      <PostsList remove={removePost} posts={sortedAndSearchedPosts} template={template} title='Посты' />
      <div ref={lastElement} style={{ height: 20 }}></div>
      {
        isPostLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Loader />
        </div>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages}></Pagination>
    </div>
  );
}

export default Posts;
