package com.kazemi.liquibase.repository;

import com.kazemi.liquibase.model.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permissions,Long> {
    Optional<Permissions> findByPermissionName(String name);
}
