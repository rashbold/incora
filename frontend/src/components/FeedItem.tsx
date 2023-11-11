const FeedItem = ({ item }: { item: any }) => {
  return (
    <div>
      {item.title}
      <br />
      {item.description}
    </div>
  );
};

export default FeedItem;
