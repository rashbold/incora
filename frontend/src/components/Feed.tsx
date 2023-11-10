const feedList = [
  {
    id: 1,
    title: "Feed 1",
    date: new Date(),
  },
  {
    id: 2,
    title: "Feed 2",
    date: new Date(),
  },
  {
    id: 3,
    title: "Feed 3",
    date: new Date(),
  },
];

const Feed = () => {
  return (
    <>
      <h1>Feed</h1>
      {feedList.map((feed) => (
        <div key={feed.id}>
          {feed.title} - {feed.date.toISOString()}
        </div>
      ))}
    </>
  );
};

export default Feed;
