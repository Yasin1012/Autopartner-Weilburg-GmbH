import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Users, TrendingUp, Package } from 'lucide-react';
import { vehicleAPI } from '../services/api';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    inactiveVehicles: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await vehicleAPI.getAll();
      const vehicles = response.data;
      setStats({
        totalVehicles: vehicles.length,
        activeVehicles: vehicles.filter((v) => v.active).length,
        inactiveVehicles: vehicles.filter((v) => !v.active).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      name: 'Gesamt Fahrzeuge',
      value: stats.totalVehicles,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/vehicles',
    },
    {
      name: 'Aktive Fahrzeuge',
      value: stats.activeVehicles,
      icon: Car,
      color: 'bg-green-500',
      link: '/admin/vehicles',
    },
    {
      name: 'Inaktive Fahrzeuge',
      value: stats.inactiveVehicles,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      link: '/admin/vehicles',
    },
    {
      name: 'Benutzer',
      value: '2',
      icon: Users,
      color: 'bg-purple-500',
      link: '/admin/users',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Willkommen im Admin-Bereich. Hier ist eine Übersicht.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.name}
                to={stat.link}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Schnellzugriff</h2>
            <div className="space-y-3">
              <Link
                to="/admin/vehicles"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium">Fahrzeuge verwalten</p>
                <p className="text-sm text-gray-600">
                  Fahrzeuge hinzufügen, bearbeiten oder löschen
                </p>
              </Link>
              <Link
                to="/admin/users"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium">Benutzer verwalten</p>
                <p className="text-sm text-gray-600">
                  Neue Benutzer erstellen und verwalten
                </p>
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Systeminfo</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Backend:</span>
                <span className="font-medium">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Letztes Update:</span>
                <span className="font-medium">Heute</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

