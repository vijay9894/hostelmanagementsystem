package com.example.hostel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.hostel.entity.PermissionEntity;
import com.example.hostel.service.PermissionService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/hms/api")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @GetMapping("/permissions")
    public List<PermissionEntity> getAllPermissions() {
        return permissionService.getAll();
    }

    @GetMapping("/permissions/pending")
    public List<PermissionEntity> getPendingPermissions() {
        return permissionService.getPendingPermissions();
    }
    
    
    
    
    

    @GetMapping("/permissions/{permissionId}")
    public ResponseEntity<PermissionEntity> getPermissionById(@PathVariable int permissionId) {
        Optional<PermissionEntity> permission = permissionService.getByPermissionId(permissionId);
        return permission.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/permissions")
    public ResponseEntity<PermissionEntity> addPermission(@RequestBody PermissionEntity permission) {
        permission.setPermissionStatus(PermissionEntity.PermissionStatus.PENDING);
        System.out.println(permission);
        PermissionEntity savedPermission = permissionService.save(permission);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPermission);
    }

    @PutMapping("/permissions/{permissionId}")
    public ResponseEntity<PermissionEntity> updatePermission(@PathVariable int permissionId, @RequestBody PermissionEntity updatedPermission) {
        Optional<PermissionEntity> existingPermission = permissionService.getByPermissionId(permissionId);
        if(existingPermission.isPresent()){
            PermissionEntity permission = existingPermission.get();
            permission.setPRN(updatedPermission.getPRN());
            permission.setSubject(updatedPermission.getSubject());
            permission.setDate(updatedPermission.getDate());
            permission.setFile(updatedPermission.getFile());
            permission.setPermissionStatus(updatedPermission.getPermissionStatus());

            PermissionEntity updated = permissionService.save(permission);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/permissions/{permissionId}/status")
    public ResponseEntity<Void> updatePermissionStatus(@PathVariable int permissionId, @RequestParam("status") String status) {
        Optional<PermissionEntity> existingPermission = permissionService.getByPermissionId(permissionId);
        if (existingPermission.isPresent()) {
            PermissionEntity permission = existingPermission.get();
            try {
                PermissionEntity.PermissionStatus newStatus = PermissionEntity.PermissionStatus.fromString(status);
                permission.setPermissionStatus(newStatus);
                permissionService.save(permission);
                return ResponseEntity.ok().build();
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/permissions/{permissionId}")
    public ResponseEntity<Void> deletePermission(@PathVariable int permissionId) {
        permissionService.deleteByPermissionId(permissionId);
        return ResponseEntity.noContent().build();
    }
}
