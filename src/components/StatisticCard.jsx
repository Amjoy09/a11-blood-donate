const StatisticCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="text-5xl text-red-500">{icon}</div>

        <h2 className="text-4xl font-bold">{count}</h2>

        <p className="text-gray-500 font-medium">{title}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
