import React from 'react';
import Card from '../../atoms/Card';
import Button from '../../atoms/Button';

interface CafeCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  isOpen: boolean;
  image?: string;
  onViewDetails?: (id: string) => void;
}

const CafeCard: React.FC<CafeCardProps> = ({
  id,
  name,
  location,
  rating,
  isOpen,
  image,
  onViewDetails,
}) => {
  return (
    <Card hover className="flex flex-col h-full">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      )}
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isOpen
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        
        <p className="text-gray-600 mb-2">📍 {location}</p>
        
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="font-semibold">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <Button
        onClick={() => onViewDetails?.(id)}
        variant="primary"
        className="w-full"
      >
        View Details
      </Button>
    </Card>
  );
};

export default CafeCard;
