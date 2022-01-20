import { useEffect, useRef, useState } from 'react';
import './App.css';
import { galleryUrl, url } from './constants';
import { mapNodesToArticles } from './helpers';

const ArticlesList = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState([]);

  const containerRef = useRef();

  const getArticles = (pageNumber, setNewPage = false) => {
    fetch(galleryUrl(pageNumber))
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const newArticles = mapNodesToArticles(result);
        setArticles(articles.concat(newArticles));
        setLoading(false);
        setLoadingMore(false);
        if (setNewPage) {
          setPage(pageNumber);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getArticles(0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onScroll = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.getBoundingClientRect().bottom;
      // When the scroll gets to the bottom of the page with an offset of half of the height of the window 
      // we trigger the load more action
      if (bottom <= (window.innerHeight + (window.innerHeight / 2)) && !loadingMore) {
        setLoadingMore(true);
      }
    }
  };

  useEffect(() => {
    console.log('LOADING MORE EFFECT');
    if (loadingMore) {
      console.log('LOADING MORE');
      getArticles(page + 1, true);
    }
  }, [loadingMore]);

  return loading ? (
    <div className="loading-container">
      <span>Loading articles ...</span>
    </div>
  ) : (
    <>
      <div className="articles-container" ref={containerRef}>
        {articles.map((article, index) => (
          <div className="article-container" key={index}>
            <div className="image-container">
              <img className="image" src={`${url}${article.ImageStyle_thumbnail}`} />
            </div>
            <div className="data-container">
              <h3>{article.title}</h3>
              <a href={`${url}${article.path}`}>{`${url}${article.path}`}</a>
            </div>
          </div>
        ))}
      </div>
      {loadingMore && (
        <div className="loading-container">
          <span>Loading articles ...</span>
        </div>
      )}
    </>
  );
};

export default ArticlesList;
