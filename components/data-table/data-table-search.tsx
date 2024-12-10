'use client';

import { Search, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  data: any[];
  onSearch: (filteredData: any[]) => void;
  setIsSearch: (isSearching: boolean) => void;
  placeholder?: string;
}

export default function SearchBar({
  data,
  onSearch,
  setIsSearch,
  placeholder = 'Search...',
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setIsSearch(false);
      onSearch(data);
      return;
    }

    const filteredData = data.filter((item: any) =>
      Object.values(item).some(
        (value: any) =>
          value && value.toString().toLowerCase().includes(value.toLowerCase()),
      ),
    );

    setIsSearch(true);
    onSearch(filteredData);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearch(false);
    onSearch(data);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-md">
      <div
        className={`
          relative flex items-center 
          bg-white 
          border 
          ${
            isFocused
              ? 'border-brandColor ring-2 ring-brandColor/10'
              : 'border-gray-300 hover:border-gray-400'
          }
          rounded-lg 
          transition-all 
          duration-300 
          ease-in-out
        `}
      >
        {/* Search Icon */}
        <div className="absolute left-3 pointer-events-none">
          <Search
            className={`
              w-5 h-5 
              ${isFocused ? 'text-brandColor' : 'text-gray-400'}
              transition-colors 
              duration-300
            `}
          />
        </div>

        {/* Search Input */}
        <input
          ref={inputRef}
          id="search"
          name="search"
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="
            w-full 
            pl-10 
            pr-10 
            py-2.5 
            text-gray-900 
            placeholder-gray-500 
            bg-transparent 
            focus:outline-none 
            text-sm
          "
        />

        {/* Clear Search Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              absolute 
              right-3 
              text-gray-400 
              hover:text-gray-600 
              focus:outline-none
              transition-colors
              duration-300
            "
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
