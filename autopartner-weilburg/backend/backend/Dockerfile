####
# This Dockerfile is used to build the Autopartner Weilburg Backend
# It creates a production-ready container with OpenJDK 21
####

FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Production stage
FROM eclipse-temurin:21-jre-alpine

LABEL maintainer="Autopartner Weilburg GmbH <us@autopartner-weilburg.de>"
LABEL description="Autopartner Weilburg Backend - Vehicle Management System"

# Install curl for health checks
RUN apk add --no-cache curl

# Create app user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /build/target/quarkus-app/lib/ /app/lib/
COPY --from=build /build/target/quarkus-app/*.jar /app/
COPY --from=build /build/target/quarkus-app/app/ /app/app/
COPY --from=build /build/target/quarkus-app/quarkus/ /app/quarkus/

# Change ownership to app user
RUN chown -R appuser:appgroup /app

USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/q/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "/app/quarkus-run.jar"]

