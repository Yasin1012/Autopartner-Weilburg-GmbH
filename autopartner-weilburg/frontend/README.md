# Autopartner Weilburg - Frontend

Modern React frontend for the Autopartner Weilburg vehicle dealership platform.

## 🚀 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Auth**: JWT with localStorage
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── VehicleCard.jsx
│   ├── VehicleForm.jsx
│   ├── Sidebar.jsx
│   ├── Loader.jsx
│   └── ProtectedRoute.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Vehicles.jsx
│   ├── VehicleDetail.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminVehicles.jsx
│   └── AdminUsers.jsx
├── context/            # React Context
│   └── AuthContext.jsx
├── services/           # API services
│   └── api.js
├── utils/              # Utility functions
│   └── format.js
├── App.jsx             # Main app component with routes
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend URL
```

### Development

```bash
# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Authentication

### Default Credentials

**Admin User:**
- Username: `admin`
- Password: `admin123`

**Regular User:**
- Username: `user`
- Password: `user123`

### JWT Token Storage

- Tokens are stored in `localStorage`
- Automatically attached to API requests via Axios interceptor
- Auto-logout on 401 responses

## 🌐 Routes

### Public Routes
- `/` - Home page
- `/vehicles` - Vehicle listing
- `/vehicles/:id` - Vehicle detail
- `/contact` - Contact page
- `/login` - Login page

### Protected Admin Routes
- `/admin` - Admin dashboard
- `/admin/vehicles` - Vehicle management (ADMIN/USER)
- `/admin/users` - User management (ADMIN only)

## 🎨 Styling

### TailwindCSS Utility Classes

Custom classes defined in `index.css`:
- `.btn` - Base button style
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.card` - Card container
- `.input` - Form input
- `.container` - Max-width container

### Color Scheme

Primary colors defined in `tailwind.config.js`:
- Primary: Blue shades (50-900)
- Customizable in config file

## 📡 API Integration

### API Service (`src/services/api.js`)

```javascript
import { vehicleAPI, authAPI } from '../services/api';

// Authentication
await authAPI.login({ username, password });
await authAPI.register(userData);

// Vehicles
await vehicleAPI.getAll();
await vehicleAPI.getById(id);
await vehicleAPI.create(data);
await vehicleAPI.update(id, data);
await vehicleAPI.delete(id);
```

### Axios Interceptors

- **Request**: Automatically adds JWT token
- **Response**: Handles 401/403/404/500 errors with toast notifications

## 🔒 Protected Routes

Use the `ProtectedRoute` component:

```jsx
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

// Admin only
<Route
  path="/admin/users"
  element={
    <ProtectedRoute adminOnly>
      <AdminUsers />
    </ProtectedRoute>
  }
/>
```

## 🎯 Features

### Public Features
- ✅ Homepage with hero section
- ✅ Vehicle listing with filters
- ✅ Detailed vehicle view
- ✅ Contact page with Google Maps
- ✅ Responsive design (mobile, tablet, desktop)

### Admin Features
- ✅ JWT-based authentication
- ✅ Vehicle CRUD operations
- ✅ Dashboard with statistics
- ✅ User management (view only)
- ✅ Role-based access control

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
VITE_API_URL=https://api.autopartner-weilburg.de
```

### Build Output

The build creates static files in `dist/` directory:
- Optimized and minified
- Ready for any static hosting (Vercel, Netlify, etc.)

## 📝 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
```

**Note**: All Vite env vars must be prefixed with `VITE_`

## 🐛 Troubleshooting

### CORS Issues
Make sure backend CORS is configured for your frontend URL:
```properties
quarkus.http.cors.origins=http://localhost:5173,https://your-domain.vercel.app
```

### API Connection
Check that `VITE_API_URL` in `.env` points to the correct backend URL

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

Copyright © 2025 Autopartner Weilburg GmbH

## 🤝 Support

For support, contact: us@autopartner-weilburg.de
