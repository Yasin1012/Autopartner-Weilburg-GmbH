import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Gauge, Settings, ArrowLeft, Mail, Phone } from 'lucide-react';
import { vehicleAPI } from '../services/api';
import { formatPrice, formatMileage, formatDate } from '../utils/format';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const response = await vehicleAPI.getById(id);
      setVehicle(response.data);
    } catch (error) {
      toast.error('Fahrzeug nicht gefunden');
      navigate('/vehicles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!vehicle) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Zurück</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            {(() => {
              const images = vehicle.images ? vehicle.images.split(',').map(img => img.trim()) : [];
              
              if (images.length > 0) {
                return (
                  <div className="card p-0">
                    {/* Main Image */}
                    <div className="h-96 overflow-hidden rounded-t-lg">
                      <img 
                        src={images[selectedImage]} 
                        alt={`${vehicle.model} - Bild ${selectedImage + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/800x600/e5e7eb/6b7280?text=' + encodeURIComponent(vehicle.model);
                        }}
                      />
                    </div>
                    
                    {/* Image Thumbnails */}
                    {images.length > 1 && (
                      <div className="p-4 bg-gray-50 grid grid-cols-4 gap-2">
                        {images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`h-20 overflow-hidden rounded border-2 transition-all ${
                              selectedImage === index ? 'border-primary-600' : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <img 
                              src={img} 
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/200x150/e5e7eb/6b7280';
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div className="card p-0">
                    <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-t-lg">
                      <span className="text-gray-500 text-2xl font-medium">{vehicle.model}</span>
                    </div>
                    <div className="p-4 bg-gray-50">
                      <p className="text-sm text-gray-500 text-center">
                        Fahrzeugbilder verfügbar bei Anfrage
                      </p>
                    </div>
                  </div>
                );
              }
            })()}
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{vehicle.model}</h1>
            <p className="text-xl text-gray-600 mb-6">{vehicle.type}</p>

            <div className="text-4xl font-bold text-primary-600 mb-8">
              {formatPrice(vehicle.price)}
            </div>

            {vehicle.description && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
                <p className="text-gray-700 whitespace-pre-line">{vehicle.description}</p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Erstzulassung</p>
                  <p className="text-lg font-semibold">{formatDate(vehicle.firstRegistration)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Gauge className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Kilometerstand</p>
                  <p className="text-lg font-semibold">{formatMileage(vehicle.mileage)}</p>
                </div>
              </div>

              {vehicle.equipment && (
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Settings className="h-6 w-6 text-gray-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">Ausstattung</p>
                    <p className="text-gray-700 whitespace-pre-line">{vehicle.equipment}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-4">Interesse an diesem Fahrzeug?</h3>
              <p className="text-gray-600 mb-6">
                Kontaktieren Sie uns für weitere Informationen oder eine Probefahrt!
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+4964719876543"
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-sm text-gray-600">+49 6471 987654-3</p>
                  </div>
                </a>
                <a
                  href={`mailto:us@autopartner-weilburg.de?subject=Anfrage: ${vehicle.model}`}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-medium">E-Mail</p>
                    <p className="text-sm text-gray-600">us@autopartner-weilburg.de</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;

