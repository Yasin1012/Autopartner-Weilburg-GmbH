import { Link } from 'react-router-dom';
import { Calendar, Gauge, Euro } from 'lucide-react';
import { formatPrice, formatMileage, formatDate } from '../utils/format';

const VehicleCard = ({ vehicle }) => {
  const firstImage = vehicle.images?.split(',')[0]?.trim();

  return (
    <Link to={`/vehicles/${vehicle.id}`} className="card hover:shadow-lg transition-shadow">
      {/* Vehicle Image */}
      {firstImage ? (
        <div className="h-48 overflow-hidden">
          <img 
            src={firstImage} 
            alt={vehicle.model}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x600/e5e7eb/6b7280?text=' + encodeURIComponent(vehicle.model);
            }}
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-lg font-medium">{vehicle.model}</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{vehicle.model}</h3>
        <p className="text-sm text-gray-600 mb-2">{vehicle.type}</p>
        
        {vehicle.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {vehicle.description}
          </p>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>EZ: {formatDate(vehicle.firstRegistration)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Gauge className="h-4 w-4 mr-2" />
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Euro className="h-5 w-5 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(vehicle.price)}
            </span>
          </div>
          <span className="text-sm text-primary-600 font-medium">Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

