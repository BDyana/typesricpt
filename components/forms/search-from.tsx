'use client';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

// Defining the form data type
type SearchFormData = {
  searchTerm: string;
};

export default function SearchForm() {
  // Using the defined type in the useForm hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>();
  const router = useRouter();

  // Typing for the handleSearch function
  const handleSearch: SubmitHandler<SearchFormData> = (data) => {
    const { searchTerm } = data;
    console.log(searchTerm);
    reset();
    router.push(`/search?search=${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="flex items-center w-full"
    >
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          {...register('searchTerm', { required: true })} // Adding required validation here
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-gray-200 focus:border-blue-300 block w-full lg:p-2.5 p-2 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 rounded-l"
          placeholder="Search products, categories, markets and many more..."
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center lg:py-2.5 py-2 px-3 text-sm font-medium text-white bg-primary border border-gray-700 hover:bg-gray-800 focus:ring-1 focus:outline-none focus:ring-gray-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 rounded-r"
      >
        <Search className="w-4 h-4 me-2" />
        Search
      </button>
    </form>
  );
}
