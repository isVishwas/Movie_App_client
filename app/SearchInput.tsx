import { ChangeEvent, FC } from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onChange }) => {


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mt-5 mb-8">
      <p className="text-2xl">The Best Movie Review Site!</p>
      <div className="relative">
        <input
          type="text"
          placeholder="Search by movie name"
          className="px-4 py-2 border border-blue-800 rounded bg-gray-200 w-2/3 pl-10" // Add left padding for the icon
          onChange={handleChange}
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 3a6 6 0 014.848 9.749l5.113 5.114-1.414 1.414-5.114-5.113A6 6 0 119 3zm0 2a4 4 0 100 8 4 4 0 000-8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
