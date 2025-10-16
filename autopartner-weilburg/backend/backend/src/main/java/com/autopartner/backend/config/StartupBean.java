package com.autopartner.backend.config;

import com.autopartner.backend.model.User;
import com.autopartner.backend.repository.UserRepository;
import com.autopartner.backend.util.PasswordUtil;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

/**
 * Startup bean to initialize default users if they don't exist.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@ApplicationScoped
public class StartupBean {

    private static final Logger LOG = Logger.getLogger(StartupBean.class);

    @Inject
    UserRepository userRepository;

    @Inject
    PasswordUtil passwordUtil;

    @Transactional
    public void onStart(@Observes StartupEvent event) {
        LOG.info("Initializing default users...");

        // Create admin user if not exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordUtil.hashPassword("admin123"));
            admin.setRole(User.Role.ADMIN);
            userRepository.persist(admin);
            LOG.info("Created default admin user");
        }

        // Create regular user if not exists
        if (!userRepository.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordUtil.hashPassword("user123"));
            user.setRole(User.Role.USER);
            userRepository.persist(user);
            LOG.info("Created default user");
        }

        LOG.info("User initialization complete");
    }
}

