import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Autopartner Weilburg GmbH</h3>
            <p className="text-gray-400 mb-4">
              Ihr zuverlässiger Partner für Gebraucht- und Jahreswagen in Weilburg und Umgebung.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">Musterstraße 123</p>
                  <p className="text-gray-400">35781 Weilburg</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <a href="tel:+4964719876543" className="text-gray-400 hover:text-white">
                  +49 6471 987654-3
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <a
                  href="mailto:us@autopartner-weilburg.de"
                  className="text-gray-400 hover:text-white"
                >
                  us@autopartner-weilburg.de
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Öffnungszeiten</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex justify-between">
                <span>Montag - Freitag:</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Samstag:</span>
                <span>09:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sonntag:</span>
                <span>Geschlossen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Autopartner Weilburg GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/impressum" className="text-gray-400 hover:text-white text-sm">
                Impressum
              </a>
              <a href="/datenschutz" className="text-gray-400 hover:text-white text-sm">
                Datenschutz
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

