import React from 'react';
import CafeCard from '../../molecules/CafeCard';

interface Cafe {
  _id: string;
  name: string;
  location: string;
  rating: number;
  isOpen: boolean;
  image?: string;
}

interface CafeListProps {
  cafes: Cafe[];
  onViewDetails: (id: string) => void;
  loading?: boolean;
}

const CafeList: React.FC<CafeListProps> = ({ cafes, onViewDetails, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (cafes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No cafes found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cafes.map((cafe) => (
        <CafeCard
          key={cafe._id}
          id={cafe._id}
          name={cafe.name}
          location={cafe.location}
          rating={cafe.rating}
          isOpen={cafe.isOpen}
          image={cafe.image}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default CafeList;
