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
    <div className="max-w-2xl mx-auto">
      {!feedItem ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md m-5">
          <ul className="divide-y divide-gray-200">
            {feedItems.map((item: any, i: number) => (
              <li
                key={i}
                className="px-4 py-4 flex items-center sm:flex-row flex-col m-2"
              >
                <Link
                  to={`/feed/${id}?item=${i}`}
                  className="text-lg font-medium text-indigo-600 hover:text-indigo-500 flex-grow"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <FeedItem item={feedItems[Number(feedItem)]} />
      )}
    </div>
  );
};

export default FeedList;
