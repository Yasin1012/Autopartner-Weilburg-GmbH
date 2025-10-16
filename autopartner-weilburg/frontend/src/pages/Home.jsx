import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Willkommen bei Autopartner Weilburg
            </h1>
            <p className="text-xl mb-8">
              Ihr zuverlässiger Partner für Gebraucht- und Jahreswagen in Weilburg und Umgebung.
              Entdecken Sie unsere große Auswahl an geprüften Fahrzeugen.
            </p>
            <Link
              to="/vehicles"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Fahrzeuge ansehen</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Über uns</h2>
            <p className="text-lg text-gray-600 mb-4">
              Seit vielen Jahren sind wir Ihr kompetenter Ansprechpartner rund um den Gebraucht- und
              Jahreswagenkauf in Weilburg. Wir legen großen Wert auf Qualität, Transparenz und
              erstklassigen Service.
            </p>
            <p className="text-lg text-gray-600">
              Jedes Fahrzeug wird von uns sorgfältig geprüft und aufbereitet, damit Sie sich auf
              Ihr neues Auto verlassen können. Besuchen Sie uns und überzeugen Sie sich selbst!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Kontakt & Öffnungszeiten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
                <h3 className="text-xl font-semibold">Adresse</h3>
              </div>
              <p className="text-gray-600">
                Musterstraße 123<br />
                35781 Weilburg<br />
                Deutschland
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="h-8 w-8 text-primary-600" />
                <h3 className="text-xl font-semibold">Telefon</h3>
              </div>
              <p className="text-gray-600">
                <a href="tel:+4964719876543" className="hover:text-primary-600">
                  +49 6471 987654-3
                </a>
                <br />
                <a href="mailto:us@autopartner-weilburg.de" className="hover:text-primary-600">
                  us@autopartner-weilburg.de
                </a>
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
                <h3 className="text-xl font-semibold">Öffnungszeiten</h3>
              </div>
              <div className="text-gray-600 space-y-1">
                <p>Mo-Fr: 09:00 - 18:00</p>
                <p>Sa: 09:00 - 14:00</p>
                <p>So: Geschlossen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bereit für Ihr neues Fahrzeug?
          </h2>
          <p className="text-xl mb-8">
            Entdecken Sie jetzt unsere aktuellen Angebote und finden Sie Ihr Traumauto!
          </p>
          <Link
            to="/vehicles"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <span>Zu den Fahrzeugen</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

