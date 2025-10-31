export const SearchBox = ({ placeholder, searchquery }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <div className="relative w-full md:w-2/3">
        <input
          name="searchbox"
          type="text"
          placeholder={placeholder}
          onChange={(e) => searchquery(e.target.value)}
          className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
        />
      </div>
    </div>
  );
};
