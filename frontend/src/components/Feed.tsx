import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Feed = () => {
  const { user } = useAuth();
  const [feedList, setFeedList] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3900/api/feeds/users/${user.id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("feed", data);
          setFeedList(data);
        });
      }
    });
  }, [user]);
  return (
    <>
      <h1>Feed</h1>
      {feedList.map((feed) => (
        <>
          <Link to={`/feed/${feed.id}`}>{feed.title}</Link>
        </>
      ))}
    </>
  );
};

export default Feed;
