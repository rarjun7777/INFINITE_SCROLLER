import "./App.css";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async (__page) => {
    console.log(__page);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    setItems([...items, ...response.data]);
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      style={{ margin: "5px" }}
      pageStart={0}
      loadMore={fetchData}
      hasMore={true}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default App;