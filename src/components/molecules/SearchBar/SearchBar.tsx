import React, { useState } from 'react';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search cafes...',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
