import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
// import { Link } from 'react-router-dom';

const ArticleList = () =>  {
  const [articles, setArticles] = useState([])

  useEffect(function() {
    async function getArticles() {
      try {
        const response = await axios.get("/api/timePeriods");
        return response.data;
      } catch(error) {
        console.log('error', error);
      }
    }        
    getArticles().then(articles => {
      console.log('articles', articles.data);
      setArticles(articles.data);
    });
  }, []);

  console.log('here', articles);

  return (
    <div>
      {articles && articles.map((article) => (
          <div key={article._id}>
            {/*<h4><Link to={`/articles/${article._id}`}>{article.title}</Link></h4>*/}
            <h4>{article.title}</h4>
            <small>_id: {article._id}</small>
            <hr/>
          </div>
      ))}
    </div>
  )
}

export default ArticleList;