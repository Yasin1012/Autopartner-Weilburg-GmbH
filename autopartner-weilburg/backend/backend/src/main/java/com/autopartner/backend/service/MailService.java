package com.autopartner.backend.service;

import com.autopartner.backend.model.Vehicle;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

/**
 * Service for sending email notifications.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@ApplicationScoped
public class MailService {

    private static final Logger LOG = Logger.getLogger(MailService.class);

    @Inject
    Mailer mailer;

    @ConfigProperty(name = "app.mail.notifications.to", defaultValue = "us@autopartner-weilburg.de")
    String notificationEmail;

    /**
     * Send email notification when a new vehicle is created.
     * 
     * @param vehicle the created vehicle
     */
    public void sendVehicleCreatedMail(Vehicle vehicle) {
        try {
            String subject = "Neues Fahrzeug hinzugefügt: " + vehicle.getModel();
            String body = buildVehicleEmailBody(vehicle);

            mailer.send(Mail.withText(notificationEmail, subject, body));
            LOG.info("Vehicle creation notification sent for: " + vehicle.getModel());
        } catch (Exception e) {
            LOG.error("Failed to send vehicle creation notification", e);
        }
    }

    /**
     * Build email body with vehicle details.
     * 
     * @param vehicle the vehicle
     * @return formatted email body
     */
    private String buildVehicleEmailBody(Vehicle vehicle) {
        return String.format("""
                Ein neues Fahrzeug wurde zum Bestand hinzugefügt:
                
                Modell: %s
                Typ: %s
                Erstzulassung: %s
                Kilometerstand: %d km
                Ausstattung: %s
                Preis: %.2f EUR
                Status: %s
                
                Mit freundlichen Grüßen,
                Autopartner Weilburg System
                """,
                vehicle.getModel(),
                vehicle.getType(),
                vehicle.getFirstRegistration(),
                vehicle.getMileage(),
                vehicle.getEquipment() != null ? vehicle.getEquipment() : "Keine Angabe",
                vehicle.getPrice(),
                vehicle.getActive() ? "Aktiv" : "Inaktiv"
        );
    }
}

