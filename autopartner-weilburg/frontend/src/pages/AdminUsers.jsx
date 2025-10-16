import Sidebar from '../components/Sidebar';
import { Users, Shield, User } from 'lucide-react';

const AdminUsers = () => {
  // Placeholder data - In production this would come from the backend
  const users = [
    { id: 1, username: 'admin', role: 'ADMIN', createdAt: '2025-01-01' },
    { id: 2, username: 'user', role: 'USER', createdAt: '2025-01-15' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Benutzer</h1>
            <p className="text-gray-600 mt-2">Verwalten Sie Systembenutzer</p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Benutzername
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rolle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Erstellt am
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === 'ADMIN' ? (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                          <Shield className="h-4 w-4" />
                          <span>Administrator</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                          <Users className="h-4 w-4" />
                          <span>Benutzer</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString('de-DE')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-gray-400 cursor-not-allowed"
                        title="Funktion in Entwicklung"
                      >
                        Bearbeiten
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Hinweis:</strong> Die vollständige Benutzerverwaltung mit Erstellen, Bearbeiten
            und Löschen von Benutzern wird in einer zukünftigen Version verfügbar sein.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;

