import { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { fileAPI } from '../services/api';
import toast from 'react-hot-toast';

const VehicleForm = ({ vehicle, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    model: vehicle?.model || '',
    type: vehicle?.type || '',
    firstRegistration: vehicle?.firstRegistration || '',
    mileage: vehicle?.mileage || '',
    equipment: vehicle?.equipment || '',
    price: vehicle?.price || '',
    active: vehicle?.active ?? true,
    description: vehicle?.description || '',
    images: vehicle?.images || '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadMode, setUploadMode] = useState('url'); // 'url' or 'file'
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let finalFormData = {
      ...formData,
      mileage: parseInt(formData.mileage),
      price: parseFloat(formData.price),
    };

    // Upload files if in file mode
    if (uploadMode === 'file' && imageFiles.length > 0) {
      try {
        setUploading(true);
        const response = await fileAPI.uploadImages(imageFiles);
        const uploadedUrls = response.data;
        
        // Convert to full URLs and join with comma
        const fullUrls = uploadedUrls.map(url => `http://localhost:8080${url}`);
        finalFormData.images = fullUrls.join(', ');
        
        toast.success(`${uploadedUrls.length} Bild(er) hochgeladen`);
      } catch (error) {
        toast.error('Fehler beim Hochladen der Bilder');
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    onSubmit(finalFormData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Generate previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImagePreview = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {vehicle ? 'Fahrzeug bearbeiten' : 'Neues Fahrzeug'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 1. BILDER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Fahrzeugbilder
            </label>
            
            {/* Mode Switcher */}
            <div className="flex space-x-2 mb-4">
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  uploadMode === 'url' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ImageIcon className="h-4 w-4 inline mr-2" />
                URL eingeben
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  uploadMode === 'file' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Dateien hochladen
              </button>
            </div>

            {uploadMode === 'url' ? (
              <div>
                <textarea
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  className="input"
                  rows="2"
                  placeholder="https://example.com/bild1.jpg, https://example.com/bild2.jpg"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Mehrere Bild-URLs können durch Komma getrennt werden
                </p>
              </div>
            ) : (
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Klicken Sie hier oder ziehen Sie Bilder hierher
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF, WEBP bis zu 10MB
                    </p>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImagePreview(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {imageFiles[index]?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. MODELL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modell *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* 3. BESCHREIBUNG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beschreibung
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              rows="4"
              placeholder="Detaillierte Beschreibung des Fahrzeugs..."
            />
          </div>

          {/* 4. REST DER FELDER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fahrzeugtyp *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Bitte wählen</option>
              <option value="Limousine">Limousine</option>
              <option value="Kombi">Kombi</option>
              <option value="SUV">SUV</option>
              <option value="Cabrio">Cabriolet</option>
              <option value="Sportwagen">Sportwagen</option>
              <option value="Kompaktwagen">Kompaktwagen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Erstzulassung *
            </label>
            <input
              type="date"
              name="firstRegistration"
              value={formData.firstRegistration}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kilometerstand *
            </label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="input"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ausstattung
            </label>
            <textarea
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder="z.B. Leder, Navi, Klimaautomatik..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preis (EUR) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Aktiv (sichtbar für Kunden)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={uploading}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? 'Bilder werden hochgeladen...' : (vehicle ? 'Speichern' : 'Erstellen')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;

