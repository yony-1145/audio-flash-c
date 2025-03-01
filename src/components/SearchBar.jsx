// インプットしたものを取得して、searchResultを返す。
import { useState,useEffect } from "react";
import SearchResult from "./SearchResult"; 

function SearchBar() {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ isClicked, setIsClicked ] = useState(false);
  const [ searchResult, setSearchResult ] = useState(null);


  function saveInputText(event){ 
    setSearchTerm(event.target.value);
  }

  function EnterKeyDown(event) {
    if (event.key === 'Enter') {
        saveInputText
     setIsClicked(true);
    }
  }

  async function fetchTerm(term) {
    try {
      const response =  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
      const searchResult = await response.json();
      setSearchResult(searchResult);
      console.log(searchResult);
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }

  useEffect(() => {
    if(isClicked){
      fetchTerm(searchTerm);
      setIsClicked(false);          
    }
  }, [isClicked]);

    return (
      <div className='input-container'>
        <input 
          placeholder='Search English-English'
          // size="30"
          className='send-button'
          type="text" 
          onChange={saveInputText}
          onKeyDown={EnterKeyDown}
          value={searchTerm}
        />
        <button
          className='send-button'
          onClick={() => setIsClicked(true)}
          >Send</button> 
          <SearchResult result={searchResult} searchTerm={searchTerm} />
      </div>
    )
  }
  
  export default SearchBar;