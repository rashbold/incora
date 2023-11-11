import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import FeedItem from "./FeedItem";

const FeedList = () => {
  const { id } = useParams();
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [search] = useSearchParams();
  const feedItem = search.get("item");

  useEffect(() => {
    fetch(`http://localhost:3900/api/feeds/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setFeedItems(data);
        });
      }
    });
  }, [id]);
  return (
    <>
      {!feedItem ? (
        feedItems.map((item: any, i: number) => (
          <div>
            <Link key={i} to={`/feed/${id}?item=${i}`}>
              {item.title}
            </Link>
          </div>
        ))
      ) : (
        <FeedItem item={feedItems[Number(feedItem)]} />
      )}
    </>
  );
};

export default FeedList;
