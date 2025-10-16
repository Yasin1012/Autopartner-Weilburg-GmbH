/**
 * Format currency in EUR
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

/**
 * Format date to German format
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateFormat('de-DE').format(new Date(date));
};

/**
 * Format mileage with separator
 */
export const formatMileage = (mileage) => {
  return new Intl.NumberFormat('de-DE').format(mileage) + ' km';
};

/**
 * Format vehicle type
 */
export const getVehicleTypeLabel = (type) => {
  const types = {
    'Limousine': 'Limousine',
    'Kombi': 'Kombi',
    'SUV': 'SUV',
    'Cabrio': 'Cabriolet',
    'Sportwagen': 'Sportwagen',
    'Kompaktwagen': 'Kompaktwagen',
  };
  return types[type] || type;
};

