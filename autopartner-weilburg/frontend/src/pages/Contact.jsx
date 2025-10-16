import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Kontakt</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                    <p className="text-gray-600">
                      Autopartner Weilburg GmbH<br />
                      Musterstraße 123<br />
                      35781 Weilburg<br />
                      Deutschland
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Telefon</h3>
                    <a
                      href="tel:+4964719876543"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      +49 6471 987654-3
                    </a>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">E-Mail</h3>
                    <a
                      href="mailto:us@autopartner-weilburg.de"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      us@autopartner-weilburg.de
                    </a>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Öffnungszeiten</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Montag - Freitag: 09:00 - 18:00 Uhr</p>
                      <p>Samstag: 09:00 - 14:00 Uhr</p>
                      <p>Sonntag: Geschlossen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div>
            <div className="card p-0 h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.1234567890!2d8.2625!3d50.4833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI5JzAwLjAiTiA4wrAxNSc0NS4wIkU!5e0!3m2!1sde!2sde!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Autopartner Weilburg Standort"
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-8 bg-primary-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Haben Sie Fragen?</h2>
          <p className="text-gray-700 mb-4">
            Unser Team steht Ihnen gerne zur Verfügung! Ob Sie sich für ein bestimmtes Fahrzeug
            interessieren, eine Probefahrt vereinbaren möchten oder allgemeine Fragen haben –
            kontaktieren Sie uns einfach.
          </p>
          <p className="text-gray-700">
            Wir freuen uns auf Ihren Besuch in unserem Autohaus in Weilburg!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

