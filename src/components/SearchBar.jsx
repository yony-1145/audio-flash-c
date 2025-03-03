// インプットしたものを取得して、searchResultを返す。
import { useState,useEffect } from "react";
import axios from "axios";
import SearchResult from "./SearchResult"; 

const baseUrl = import.meta.env.VITE_DICTIONARY_API_URL;
// console.log(baseUrl);
// const app_id = process.env.REACT_APP_DICTIONARY_API_ID;
// const app_key = process.env.REACT_APP_DICTIONARY_API_KEY;

function SearchBar() {
  const [ searchTerm, setSearchTerm ] = useState('');
  // const [ isClicked, setIsClicked ] = useState(false);
  const [ searchResult, setSearchResult ] = useState(null);
  const [ error, setError ] = useState('');

  function saveInputText(event){ 
    setSearchTerm(event.target.value);
  }

  function EnterKeyDown(event) {
    if (event.key === 'Enter') {
      fetchTerm(searchTerm);
    }
  }

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_DICTIONARY_API_URL, 
    headers: {
        'app_id': import.meta.env.VITE_DICTIONARY_API_ID,
        'app_key': import.meta.env.VITE_DICTIONARY_API_KEY,
        Accept: 'application/json'
      }
    });
    // headers: {
    //   'app_id': process.env.REACT_APP_Dictinary_API_ID,
    //   'app_key': process.env.REACT_APP_Dictinary_API_KEY,
    //   'Content-Type': 'application/json',
    // },
    // timeout: 5000, // タイムアウト設定（5秒）
  // });

  async function fetchTerm(term) {
    const searchUrl = `${baseUrl}/${term}`;
    console.log(searchUrl);

    try {
      const searchResult =  await apiClient.get(searchUrl)
      setSearchResult(response.data);
      setError(null); // エラーをクリア
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // サーバーからのエラーレスポンス
        console.error('エラーコード:', error.response.status);
        console.error('エラーメッセージ:', error.response.data);
        setError(`エラーコード: ${error.response.status}, エラーメッセージ: ${error.response.data}`);
      } else if (error.request) {
        // 送信済み、レスポンスなし
        console.error('レスポンスなし:', error.request);
        setError('レスポンスなし');
      } else {
        // その他
        console.error('エラー詳細:', error.message);
        setError(`エラー詳細: ${error.message}`);
      }
    }
  }
  

  //     const searchResult = await response.json();
  //     setSearchResult(searchResult);
  //     console.log(searchResult);
  //   } catch (error) {
  //     console.error('リクエストエラー:', error);
  //   }
  // }

  // useEffect(() => {
  //   if(isClicked){
  //     fetchTerm(searchTerm);
  //     setIsClicked(false);          
  //   }
  // }, [isClicked]);

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
          onClick={() => fetchTerm(searchTerm)}
          >Send</button>
          {error && <p className="error">{error}</p>} 
          <SearchResult result={searchResult} searchTerm={searchTerm} />
      </div>
    )
  }
  
  export default SearchBar;