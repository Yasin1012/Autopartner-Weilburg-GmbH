package com.autopartner.backend.resource;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.jboss.resteasy.reactive.multipart.FileUpload;
import org.jboss.resteasy.reactive.RestForm;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * REST Resource for file uploads.
 * Handles image uploads for vehicles.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@jakarta.ws.rs.Path("/api/uploads")
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "File Upload", description = "File upload operations")
public class FileUploadResource {

    @ConfigProperty(name = "file.upload.directory", defaultValue = "uploads")
    String uploadDirectory;

    /**
     * Upload multiple images.
     * 
     * @param files uploaded files
     * @return list of uploaded file URLs
     */
    @POST
    @jakarta.ws.rs.Path("/images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Operation(summary = "Upload images", description = "Upload one or more vehicle images")
    public Response uploadImages(@RestForm("files") List<FileUpload> files) {
        try {
            // Ensure upload directory exists
            java.nio.file.Path uploadPath = Paths.get(uploadDirectory);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            List<String> uploadedUrls = new ArrayList<>();

            for (FileUpload file : files) {
                if (file != null && file.fileName() != null) {
                    // Validate file type
                    String fileName = file.fileName();
                    String contentType = file.contentType();
                    
                    if (!isValidImageType(contentType)) {
                        return Response.status(Response.Status.BAD_REQUEST)
                                .entity("Invalid file type. Only images are allowed.")
                                .build();
                    }

                    // Generate unique filename
                    String fileExtension = getFileExtension(fileName);
                    String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
                    java.nio.file.Path targetPath = uploadPath.resolve(uniqueFileName);

                    // Copy file to upload directory
                    Files.copy(file.uploadedFile(), targetPath, StandardCopyOption.REPLACE_EXISTING);

                    // Generate URL
                    String fileUrl = "/api/uploads/images/" + uniqueFileName;
                    uploadedUrls.add(fileUrl);
                }
            }

            return Response.ok().entity(uploadedUrls).build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error uploading files: " + e.getMessage())
                    .build();
        }
    }

    /**
     * Serve uploaded images.
     * 
     * @param fileName the file name
     * @return the image file
     */
    @GET
    @jakarta.ws.rs.Path("/images/{fileName}")
    @Produces({"image/jpeg", "image/png", "image/gif", "image/webp"})
    @Operation(summary = "Get image", description = "Retrieve an uploaded image")
    public Response getImage(@PathParam("fileName") String fileName) {
        try {
            java.nio.file.Path filePath = Paths.get(uploadDirectory).resolve(fileName);
            
            if (!Files.exists(filePath)) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Image not found")
                        .build();
            }

            File file = filePath.toFile();
            String contentType = Files.probeContentType(filePath);
            
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return Response.ok(file)
                    .type(contentType)
                    .build();
        } catch (IOException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error reading file")
                    .build();
        }
    }

    private boolean isValidImageType(String contentType) {
        return contentType != null && (
                contentType.equals("image/jpeg") ||
                contentType.equals("image/jpg") ||
                contentType.equals("image/png") ||
                contentType.equals("image/gif") ||
                contentType.equals("image/webp")
        );
    }

    private String getFileExtension(String fileName) {
        int lastDot = fileName.lastIndexOf('.');
        if (lastDot > 0) {
            return fileName.substring(lastDot);
        }
        return ".jpg"; // default
    }
}

