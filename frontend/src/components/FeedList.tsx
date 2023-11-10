import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FeedList = () => {
  const { id } = useParams();
  const [feedItems, setFeedItems] = useState<any[]>([]);

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
      {feedItems.map((item: any) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  );
};

export default FeedList;
