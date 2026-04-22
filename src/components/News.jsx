import React, { useEffect, useState } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import ScrollToTop from './ScroolToTop'

const dummyArticles = [
  {
    title: "Breaking: Revolutionary AI Technology Transforms Industry",
    description: "Scientists announce groundbreaking discovery that could change everything.",
    image: "https://picsum.photos/400/250?random=1",
    url: "https://example.com/article1",
    publishedAt: "2024-04-22T10:00:00Z",
    source: { name: "Tech Daily" }
  },
  {
    title: "Global Stock Market Reaches All-Time High",
    description: "Stock market continues its upward trend with strong investor confidence.",
    image: "https://picsum.photos/400/250?random=2",
    url: "https://example.com/article2",
    publishedAt: "2024-04-22T09:30:00Z",
    source: { name: "Finance Today" }
  },
  {
    title: "Historic Sports Championship Ends in Thrilling Final",
    description: "Local team defeats rival in dramatic overtime victory. Fans celebrate as their team claims first title.",
    image: "https://picsum.photos/400/250?random=3",
    url: "https://example.com/article3",
    publishedAt: "2024-04-22T08:00:00Z",
    source: { name: "Sports Weekly" }
  },
  {
    title: "Climate Change Summit Produces Major International Agreement",
    description: "World leaders commit to ambitious targets for carbon emissions reduction.",
    image: "https://picsum.photos/400/250?random=4",
    url: "https://example.com/article4",
    publishedAt: "2024-04-22T07:45:00Z",
    source: { name: "Environment News" }
  },
  {
    title: "Healthcare Innovation Offers New Treatment",
    description: "Researchers develop novel therapy that could help millions. Clinical trials show remarkable success.",
    image: "https://picsum.photos/400/250?random=5",
    url: "https://example.com/article5",
    publishedAt: "2024-04-22T06:30:00Z",
    source: { name: "Health Hub" }
  },
  {
    title: "Space Agency Announces Plans for New Mission",
    description: "Space exploration reaches new heights as agency reveals ambitious mission goals.",
    image: "https://picsum.photos/400/250?random=6",
    url: "https://example.com/article6",
    publishedAt: "2024-04-22T05:15:00Z",
    source: { name: "Space News" }
  },
  {
    title: "Tech Giant Launches Revolutionary New Product",
    description: "Consumer electronics company unveils game-changing device with unprecedented innovation.",
    image: "https://picsum.photos/400/250?random=7",
    url: "https://example.com/article7",
    publishedAt: "2024-04-21T23:00:00Z",
    source: { name: "Tech Daily" }
  },
  {
    title: "Entertainment Industry Celebrates Major Awards Ceremony",
    description: "Stars gather for annual awards show. Best performers recognized for outstanding achievements.",
    image: "https://picsum.photos/400/250?random=8",
    url: "https://example.com/article8",
    publishedAt: "2024-04-21T22:30:00Z",
    source: { name: "Entertainment Weekly" }
  }
]

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, settotalArticles] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    props.setProgress(30);
    props.setProgress(60);

    // Use dummy data
    setArticles(dummyArticles);
    settotalArticles(dummyArticles.length);
    
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} | NewsPulse`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // For dummy data, we don't add more since we have limited articles
    // The infinite scroll will stop when hasMore is false
    setLoading(false);
  };

  return (
    <div className='container pt-10 py-4'>

      <h2 className="text-center " style={{ marginTop: "4rem", padding: "0.9rem 0 1rem" }}>Top Headlines - {capitalizeFirstLetter(props.category)} </h2>
      
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <Spinner />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={fetchMoreData}
          hasMore={articles && articles.length !== totalArticles}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles && articles.length > 0 ? articles.map((element) => {
                return <div className="col-md-4 " key={element.url}>
                  <NewItem
                    title={element.title ? element.title.slice(0, 67) : "No title available"}
                    description={element.description ? element.description.slice(0, 75) : "No description available"}
                    imageUrl={element.image}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              }) : !loading ? (
                <div className="col-12 text-center" style={{ minHeight: "30vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div>
                    <h4 className="text-muted">No news articles available at the moment.</h4>
                    <p className="text-muted">Please try again later or switch to a different category.</p>
                  </div>
                </div>
              ) : null}
              <div className='fixed-bottom p-5 d-flex justify-content-end '>
                <ScrollToTop />
              </div>
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default News;