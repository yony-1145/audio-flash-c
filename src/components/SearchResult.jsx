// resultを受け取って、表示するコンポーネント
import React from 'react';
import './SearchResult.css'; 

function SearchResult({ result, searchTerm }) {
  if (!result) {
    return(
      <>
      </>
    );
  }
  
  if (result.length === 0) {
    return (
    <div className="result-container">
      <h1>No exact match found for “{searchTerm}” in English</h1>
      <h2>Nearest results from our other dictionaries and grammar usage guide:</h2>
    </div>
    );
  }
  
  return (
    <div>
      {result.map((entry, index) => (
        <div key={index}>
          <h2>Word: {entry.id}</h2> {/* 単語ID */}
          <p>Language: {entry.language}</p> {/* 言語 */}
          
          {entry.lexicalEntries && entry.lexicalEntries.length > 0 && (
            <div>
              {entry.lexicalEntries.map((lexicalEntry, lexIndex) => (
                <div key={lexIndex}>
                  <h3>Type: {lexicalEntry.type}</h3> {/* 語彙の種類 */}
                  <h4>Word: {lexicalEntry.word}</h4> {/* 単語 */}
                  
                  {lexicalEntry.pronunciations && lexicalEntry.pronunciations.length > 0 && (
                    <div>
                      <h5>Pronunciations:</h5>
                      {lexicalEntry.pronunciations.map((pronunciation, pronIndex) => (
                        <p key={pronIndex}>
                          {pronunciation.text} {/* 発音 */}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
  // return (
  //   <div className="result-container">
  //     {result.map((item, index) => (
  //       <div key={index}>
  //         <h2 className="term">{item.word}</h2> {/* 単語の表示 */}
          
  //         {/* 発音の表示 */}
  //         {item.phonetic && <p>発音: {item.phonetic}</p>}

  //         {/* 発音記号の表示 */}
  //         {item.phonetics && item.phonetics.map((phonetic, phoneticIndex) => (
  //           <div key={phoneticIndex}>
  //             <p>発音記号: {phonetic.text}</p>
  //             {phonetic.audio && <audio controls src={phonetic.audio}>Your browser does not support the audio element.</audio>}
  //           </div>
  //         ))}

  //         {/* 起源の表示 */}
  //         {item.origin && <p>起源: {item.origin}</p>}

  //         {/* 意味の表示 */}
  //         {item.meanings.map((meaning, meaningIndex) => (
  //           <div key={meaningIndex}>
  //             <h3>{meaning.partOfSpeech}</h3> {/* 品詞の表示 */}
              
  //             {meaning.definitions.map((definition, defIndex) => (
  //               <div key={defIndex}>
  //                 <p><strong>定義:</strong> {definition.definition}</p> {/* 定義の表示 */}
  //                 {definition.example && <p><strong>例文:</strong> {definition.example}</p>} {/* 例文の表示 */}
  //               </div>
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default SearchResult;