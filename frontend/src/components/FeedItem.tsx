const FeedItem = ({ item }: { item: any }) => {
  return (
    <div className="max-w-2xl mx-auto my-4 p-6 bg-white shadow overflow-hidden sm:rounded-lg">
      <h3 className="text-2xl font-bold text-indigo-600 mb-2">{item.title}</h3>
      <p className="text-gray-700 text-base">{item.description}</p>
    </div>
  );
};

export default FeedItem;
