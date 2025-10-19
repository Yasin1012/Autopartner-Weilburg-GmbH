/**
 * Format currency in EUR
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined) return '€ 0,00';
  try {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  } catch (error) {
    console.error('Price formatting error:', error, price);
    return `€ ${price}`;
  }
};

/**
 * Format date to German format
 */
export const formatDate = (date) => {
  if (!date) return '';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('de-DE').format(d);
  } catch (error) {
    console.error('Date formatting error:', error, date);
    return String(date);
  }
};

/**
 * Format mileage with separator
 */
export const formatMileage = (mileage) => {
  if (mileage === null || mileage === undefined) return '0 km';
  try {
    return new Intl.NumberFormat('de-DE').format(mileage) + ' km';
  } catch (error) {
    console.error('Mileage formatting error:', error, mileage);
    return `${mileage} km`;
  }
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

