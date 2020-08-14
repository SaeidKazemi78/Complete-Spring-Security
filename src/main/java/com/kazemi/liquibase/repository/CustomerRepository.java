package com.kazemi.liquibase.repository;

import com.kazemi.liquibase.model.CustomerModel;
import com.kazemi.liquibase.model.dto.JoinObjectDto;
import com.kazemi.liquibase.model.projections.CustomerProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.List;


@Repository
public interface  CustomerRepository  extends JpaRepository<CustomerModel,Long> {

    CustomerModel findByPhoneNumber(Long phoneNumber);

    @Lock(LockModeType.READ)
    @Query("select customer from CustomerModel customer")
    Page <CustomerProjection> findAllByProjection(Pageable pageable);


    @Query("select new com.kazemi.liquibase.model.dto.JoinObjectDto(" +
            "company.title," +
            "company.finalAddress," +
            "customer.phoneNumber," +
            "customer.lifeStyle," +
            "customer.companyId) " +
            "from CustomerModel customer " +
            "inner join customer.companyId as  company on customer.companyId = company.id " )
//            " where company.title= :myTitle and customer.phoneNumber= :phone ")
//@Param("myTitle") String myTitle ,@Param("phone") Long phone
    Page<JoinObjectDto>getAllJoined(Pageable pageable);

}
