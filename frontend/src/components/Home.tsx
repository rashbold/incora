import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const [feedList, setFeedList] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3900/api/feeds/users/${user!.id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setFeedList(data);
        });
      }
    });
  }, [user]);

  const handleRemoveFeed = (feedId: number) => {
    fetch(`http://localhost:3900/api/feeds/${feedId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setFeedList(feedList.filter((feed) => feed.id !== feedId));
      }
    });
  };

  const handleAddFeed = (url: string) => {
    try {
      new URL(url);
    } catch (e) {
      console.log("Invalid URL");
      return;
    }
    fetch(`http://localhost:3900/api/feeds/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user!.id, url }),
    }).then(async (res) => {
      if (res.ok) {
        const feed = await res.json();
        feed.title = url;
        setFeedList([...feedList, feed]);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-6">Feed</h1>
      <div className="mb-5">
        <input
          type="text"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-10 pl-2"
          placeholder="Add new feed..."
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleAddFeed(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {feedList.map((feed) => (
            <li
              key={feed.id}
              className="px-4 py-4 flex items-center sm:flex-row flex-col"
            >
              <div className="flex-grow">
                <Link
                  to={`/feed/${feed.id}`}
                  className="text-lg font-medium text-indigo-600 hover:text-indigo-500 truncate"
                >
                  {feed.title}
                </Link>
              </div>
              <div className="flex-shrink-0 ml-4">
                <span className="text-sm text-gray-500">{feed.date}</span>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleRemoveFeed(feed.id)}
                  className="w-8 h-8 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
