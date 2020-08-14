package com.kazemi.liquibase.rest;

import com.kazemi.liquibase.model.CustomerModel;
import com.kazemi.liquibase.model.dto.JoinObjectDto;
import com.kazemi.liquibase.model.projections.CustomerProjection;
import com.kazemi.liquibase.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/customer")
public class CustomerRest {



    @Autowired
    private  CustomerRepository customerRepository;

    public CustomerRest(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/by-phone")
    private ResponseEntity<CustomerModel>getByPhoneNumber(
            @RequestParam("phone") Long phoneNumber, HttpServletResponse response){
        return  new ResponseEntity<>(customerRepository.findByPhoneNumber(phoneNumber), HttpStatus.OK);
    }

    @RequestMapping("/get-by-page")
    private Page<CustomerProjection> getAllPaged(@RequestParam("page") int page,
                                                 @RequestParam("size") int size,
                                                 @RequestParam("sortedBy") String sortBy,
                                                 @RequestParam("isAsc") boolean isAsc,
                                                 HttpServletResponse response){
        response.setHeader("S-RXX_TOKEN","TOKE_GENERATOR");
        Pageable pageable = PageRequest.of(page,size,isAsc?Sort.by(sortBy).ascending():Sort.by(sortBy).descending());

        int totalSize=customerRepository.findAllByProjection(pageable).getSize();
        return new
                PageImpl<>(customerRepository.findAllByProjection(pageable).getContent(),pageable,customerRepository.findAll().size());
    }

    @RequestMapping("/get-by-joined")
    private Page<JoinObjectDto> getJoinedObj(Pageable pageable){
        Pageable pag= PageRequest.of(pageable.getPageNumber(),pageable.getPageSize(),pageable.getSort());
        int totalSize=customerRepository.getAllJoined(pageable).getSize();
        return  new PageImpl<>(customerRepository.getAllJoined(pag).getContent());
    }
}
