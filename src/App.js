import './App.css';
import React, { useEffect, useState } from 'react';
import Recipies from './Recipies';
import video from './video.mp4';
import icon from './Search.png';


function App() {


  const key = '76ee6b4d774b1c7d829b7508f6cc5f6d';
  const id = '04d4a8e0';


  const [userWord, setUserWord] = useState('');
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const search = async() => {
      const post = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${id}&app_key=${key}`);
      const getPost = await post.json();
      setAllRecipes(getPost.hits);
    }
    search()
  }, [wordSubmitted])


  const inputSearch = (e) => {
    let value = userWord;
    value = e.target.value
    setUserWord(value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(userWord);
    setUserWord('')

  }

  return (
    <>
    <video autoPlay muted loop>
      <source src={video} type='video/mp4'/>
    </video>

    <div className='container-header'>
      <h1 className='header'>Find recipe</h1>
    </div>
      
      <div className='container-main'>
        <form onSubmit={finalSearch} className='container-form'>
          <input onChange={inputSearch} value={userWord} placeholder='ingredient...'/>
        </form>

        <div className='container-button'>
          <button onClick={finalSearch} className='btn-search'><img src={icon} width='45px' alt="search" /></button>
        </div>
      </div>
      
     <Recipies allRecipes={allRecipes}/>
    </>
  );
}

export default App;
