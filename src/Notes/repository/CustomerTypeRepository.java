package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.repository.custom.CustomerTypeRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the CustomerType entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerTypeRepository extends JpaRepository<CustomerType, Long>, QueryDslPredicateExecutor<CustomerType>, CustomerTypeRepositoryCustom {

    @Query(
        "select customerType from CustomerType customerType " +
            " where customerType.id = :id")
    CustomerType findOneWithCustomers(@Param("id") Long id);

    @Query("SELECT DISTINCT customerType1 FROM CustomerTypeView customerTypeView1, CustomerType customerType1 " +
        "WHERE customerTypeView1.username = :login and customerType1.id = customerTypeView1.id")
    List<CustomerType> findAllByUsername(@Param("login") String login);


    @Query(value = "SELECT CASE WHEN EXISTS(SELECT p.*\n" +
        "                        FROM customer_type p, customer_type_access pv\n" +
        "                        WHERE pv.username = :username AND p.id = pv.id AND pv.id = :id)\n" +
        "  THEN CAST(1 AS BIT)\n" +
        "  ELSE CAST(0 AS BIT) END", nativeQuery = true)
    boolean exists(@Param("username") String username, @Param("id") Long id);

    List<CustomerType> findALlByIdIn(Set<Long> ids);

    CustomerType findFirstByCode(String code);

    @Query("select distinct customer_type from CustomerType customer_type left join fetch customer_type.customerTypeIgnores")
    List<CustomerType> findAllWithEagerRelationships();

    @Query(
        "select customer_type from " +
            "CustomerType customer_type " +
            "left join fetch customer_type.customerTypeIgnores " +
            "where customer_type.id =:id"
    )
    CustomerType findOneWithEagerRelationships(@Param("id") Long id);

    @Query(
        "select customerType from CustomerType customerType " +
            "inner join CustomerTypeView ctv on ctv.id = customerType.id " +
            "where " +
            "ctv.username = :username and " +
            "customerType.customerGroup=:customerGroup "
    )
    List<CustomerType> findAllByCustomerGroup(@Param("customerGroup") CustomerGroup customerGroup, @Param("username") String username);

    @Query(
        "select customerType from CustomerType customerType " +
            "inner join CustomerTypeView ctv on ctv.id = customerType.id " +
            "where " +
            "ctv.username = :username and " +
            "customerType.customerGroup=:customerGroup  and " +
            "customerType.vehicleModelType=:vehicleModelType "
    )
    List<CustomerType> findAllByCustomerGroup(@Param("customerGroup") CustomerGroup customerGroup,
                                              @Param("vehicleModelType") VehicleModelType vehicleModelType, @Param("username") String username);


    List<CustomerType> findAllByCustomerGroupIn(List<CustomerGroup> customerGroups);
}
