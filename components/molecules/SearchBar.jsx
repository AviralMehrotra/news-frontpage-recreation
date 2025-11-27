import Icon from '../atoms/Icon';

export default function SearchBar({ placeholder = "Search...", onSearch }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 border rounded-lg w-full"
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <Icon name="Search" className="absolute left-3 top-2.5 text-gray-400" size={20} />
    </div>
  );
}