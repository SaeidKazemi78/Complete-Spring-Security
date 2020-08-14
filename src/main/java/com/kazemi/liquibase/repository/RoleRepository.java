package com.kazemi.liquibase.repository;

import com.kazemi.liquibase.model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleModel,Long> {
    Optional<RoleModel>findByRoleName(String roleName);

}
