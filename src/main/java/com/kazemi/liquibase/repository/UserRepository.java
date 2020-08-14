package com.kazemi.liquibase.repository;

import com.kazemi.liquibase.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface  UserRepository extends JpaRepository<User,Long> {

    Optional<User> findOneByUserName(String userName);

    @Query(nativeQuery = true,value = " select case when exists( select * from public.tbl_users_roles where user_id=:userId" +
            " and roles_id=:roleId ) then cast(1 as BIT) else cast(0 as BIT) end")
    Boolean isExistsInManyToManyUserRole(@Param("userId") Long firstColumn,
                                          @Param("roleId") Long second);

    @Query(nativeQuery = true,value = " select case when exists( select * from public.tbl_roles_permissions where role_model_id = ?1" +
            " and permissions_id = ?2 ) then cast(1 as BIT) else cast(0 as BIT) end")
    Boolean isExistsInManyToManyRolePermission(@Param("role") Long roleId,
                                          @Param("per") Long perId);
}
