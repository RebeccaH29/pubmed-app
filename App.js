// App.js
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const counted = useState('');
  const total = useState('');

  let API_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

  const [articles, setArticles] = useState({ result: [] });
  const [counts, setCounts] = useState('');
  const [ids, setIds] = useState({ idlist: [] })

  const fetchArticles = async () => {
    // Ajax call using Axios
    const xml = await axios.get(`${API_URL}esearch.fcgi?db=pubmed&retmax=20&retmode=json&term=${searchTerm}`);
    
    console.log(xml.data.esearchresult.count);
    
    
    
    const idli = xml.data.esearchresult.idlist;
    setIds(idli);
    const xmlstring = xml.data.toString();
    // Articles returned
    
    const text = xml.data; 
   
    var xmlart = await axios.get(`${API_URL}esummary.fcgi?db=pubmed&retmode=json&id=${idli}`);
    
    console.log(xmlart.data);
   
    setCounts(xml.data.esearchresult.count);

    var obj = (xmlart.data.result);
    var result = Object.keys(obj).map(function(key) {
    return [Number(key), obj[key]];
    });
    console.log(result);
    setArticles(result.data);
    
    console.log(xml)
    console.log(xml.data)
    
  }
  

  // Submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Call to fetch articles
    fetchArticles();
  }
  
  return (
    <section>
      <div className="container">
      <div className="row">
        <div className="col">
      <form onSubmit={onSubmitHandler}>
        <label className="text-center">
          <span>Search for PuMed articles</span><br></br>
          <div className='searchDiv center mx-auto'>
          <input
            type="search"
            placeholder="cancer genomics"
            value={searchTerm}
            onChange={onInputChange}
          />
          <button type="submit">Search</button>
          </div>
        </label>
      </form>
        </div>
      </div>
    </div>
    <div className='container'>
      <div>Search term: {searchTerm}</div>
      <div>Number of articles: {counts}</div> 
    </div>
      
      
      {/*<ul>
      } {
          articles.result.map((article, index) => {
            return (
              <li key={index}>
                <div>
                  
                  <div>
                    {/*<h3>{uid.pubdate}</h3>*/}
                  {/*}  {/*<p>{article.volumeInfo.publishedDate}</p>*/}
                {/*}  </div>
                </div>
                <hr />
              </li>
            );
          })
        } 
      </ul> */}
    </section>
  );
};

export default App;