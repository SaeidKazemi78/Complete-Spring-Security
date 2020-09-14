package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.repository.custom.ProductRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface ProductRepository extends JpaRepository<Product, Long>, QueryDslPredicateExecutor<Product>, ProductRepositoryCustom {

    @Query(
        "select distinct product1 from  Customer customer1 " +
            "inner join customer1.type type " +
            "inner join CustomerTypeProductConsumption ctpc on ctpc.customerType=type " +
            "inner join ctpc.product product1 " +
            "where customer1.id=:customerId"
    )
    Page<Product> findAllByCustomerCustomerType(Pageable pageable, @Param("customerId") Long customerId);


    @Query(value = "select product from Depot depot join depot.products product where depot.id = :depotId")
    Page<Product> findAllByDepot(@Param("depotId") Long depotId, Pageable pageable);

    Page<Product> findAllByHasContainer(Boolean hasContainer, Pageable pageable);


    Page<Product> findAllByContainer_Id(Long containerId, Pageable pageable);


    @Query(
        "select count(pr) as productRate " +
            " from Product p " +
            " inner join ProductRate pr on pr.productId=p.id" +
            " where " +
            " p.id=:id"
    )
    Long existsProductRate(@Param("id") Long id);

    List<Product> findAllByIdIn(Set<Long> ids);

    @Query(
        value = "select DISTINCT product from Product product " +
            "inner join product.customerGroups customerGroup " +
            "where customerGroup = :customerGroup"
    )
    List<Product> findAllByCustomerGroup(@Param("customerGroup") CustomerGroup customerGroup);


    @Query(
        "select product from Product product " +
            "inner join SellContractProduct sellContractProduct on sellContractProduct.product=product " +
            "where " +
            "sellContractProduct.sellContractCustomer.customer.id = :customerId and " +
            "(:date between sellContractProduct.startDate and sellContractProduct.finishDate) "
    )
    List<Product> findAllProductByCustomerId(@Param("customerId") Long customerId, @Param("date") ZonedDateTime date);

    @Query("select product from Product product" +
        " inner join RateGroup rateGroup on rateGroup.id = :rateGroupId" +
        " where (" +
        " (:hasContainer = false and (product.hasContainer is null or product.hasContainer = false)) or " +
        " (product.hasContainer = :hasContainer )" +
        ") and " +
        " (size(rateGroup.productIds) = 0  or product.id in elements(rateGroup.productIds)) ")
    List<Product> findAllByRateGroupIdAndHasContainer(@Param("rateGroupId") Long rateGroupId,@Param("hasContainer") Boolean hasContainer);

    @Query("select distinct product from Product product " +
        " where product.code in (:codes)" )
    List<Product> findAllByCodes(@Param("codes")List<String> codes);
}
