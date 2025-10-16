import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { vehicleAPI } from '../services/api';
import { formatPrice, formatMileage, formatDate } from '../utils/format';
import Sidebar from '../components/Sidebar';
import VehicleForm from '../components/VehicleForm';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await vehicleAPI.getAll();
      setVehicles(response.data);
    } catch (error) {
      toast.error('Fehler beim Laden der Fahrzeuge');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await vehicleAPI.create(data);
      toast.success('Fahrzeug erfolgreich erstellt');
      fetchVehicles();
      setShowForm(false);
    } catch (error) {
      toast.error('Fehler beim Erstellen des Fahrzeugs');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await vehicleAPI.update(editingVehicle.id, data);
      toast.success('Fahrzeug erfolgreich aktualisiert');
      fetchVehicles();
      setShowForm(false);
      setEditingVehicle(null);
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Fahrzeugs');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Möchten Sie dieses Fahrzeug wirklich löschen?')) {
      return;
    }

    try {
      await vehicleAPI.delete(id);
      toast.success('Fahrzeug erfolgreich gelöscht');
      fetchVehicles();
    } catch (error) {
      toast.error('Fehler beim Löschen des Fahrzeugs');
    }
  };

  const openEditForm = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Fahrzeuge</h1>
            <p className="text-gray-600 mt-2">Verwalten Sie alle Fahrzeuge</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Neues Fahrzeug</span>
          </button>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modell
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Typ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EZ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Km
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{vehicle.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {vehicle.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(vehicle.firstRegistration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatMileage(vehicle.mileage)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(vehicle.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.active ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          <Check className="h-3 w-3" />
                          <span>Aktiv</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                          <X className="h-3 w-3" />
                          <span>Inaktiv</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openEditForm(vehicle)}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                          title="Bearbeiten"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Keine Fahrzeuge vorhanden</p>
          </div>
        )}
      </div>

      {showForm && (
        <VehicleForm
          vehicle={editingVehicle}
          onSubmit={editingVehicle ? handleUpdate : handleCreate}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default AdminVehicles;

