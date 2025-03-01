// インプットしたものを取得して、searchResultを返す。
import { useState,useEffect } from "react";
import SearchResult from "./SearchResult"; // SearchResultコンポーネントをインポート、更新するため？

function SearchBar() {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ isClicked, setIsClicked ] = useState(false);
  const [ searchResult, setSearchResult ] = useState(null);


  function saveInputText(event){ 
    setSearchTerm(event.target.value);
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
  // 関数は呼び出された時のみ実行であってるよね？

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
          value={searchTerm}
        />
        <button 
          className='send-button'
          onClick={() => setIsClicked(true)}
          >Send</button> 
          {searchResult && <SearchResult result={searchResult} />} {/* propsの利用 */}
      </div>
    )
  }
  
  export default SearchBar;