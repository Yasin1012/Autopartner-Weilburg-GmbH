import { useState } from 'react';
import { X } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      mileage: parseInt(formData.mileage),
      price: parseFloat(formData.price),
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bilder (URLs durch Komma getrennt)
            </label>
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
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {vehicle ? 'Speichern' : 'Erstellen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;

