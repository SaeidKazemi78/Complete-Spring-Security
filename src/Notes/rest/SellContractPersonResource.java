package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.service.SellContractPersonService;
import ir.donyapardaz.niopdc.base.service.dto.SellContractPersonDTO;
import ir.donyapardaz.niopdc.base.validation.SellContractPersonValidator;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SellContractPerson.
 */
@RestController
@RequestMapping("/api")
public class SellContractPersonResource {

    private static final String ENTITY_NAME = "sellContractPerson";
    private final Logger log = LoggerFactory.getLogger(SellContractPersonResource.class);
    private final SellContractPersonService sellContractPersonService;
    private final SellContractPersonValidator sellContractPersonValidator;

    public SellContractPersonResource(SellContractPersonService sellContractPersonService, SellContractPersonValidator sellContractPersonValidator) {
        this.sellContractPersonService = sellContractPersonService;
        this.sellContractPersonValidator = sellContractPersonValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(sellContractPersonValidator);
    }

    /**
     * GET  /sell-contract-people : get all the sellContractPeople.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sellContractPeople in body
     */
    @GetMapping("/sell-contract-people")
    @Timed
    public ResponseEntity<List<SellContractPersonDTO>> getAllSellContractPeople(Pageable pageable) {
        log.debug("REST request to get a page of SellContractPeople");
        Page<SellContractPersonDTO> page = sellContractPersonService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sell-contract-people");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sell-contract-people/:id : get the "id" sellContractPerson.
     *
     * @param id the id of the sellContractPersonDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sellContractPersonDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sell-contract-people/{id}")
    @Timed
    public ResponseEntity<SellContractPersonDTO> getSellContractPerson(@PathVariable Long id) {
        log.debug("REST request to get SellContractPerson : {}", id);
        SellContractPersonDTO sellContractPersonDTO = sellContractPersonService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sellContractPersonDTO));
    }

    @GetMapping("/sell-contract-people/get-by-date")
    @Timed
    public ResponseEntity<List<SellContractPersonDTO>> getAllSellContractPeopleGetByDateAndActive(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant finishDate
    ) {
        log.debug("REST request to get a page of SellContractPeople");
        List<SellContractPersonDTO> page = sellContractPersonService.findAllByDateAndActive(startDate, finishDate);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/sell-contract-people/contract-type/{contractType}")
    @Timed
    public ResponseEntity<List<SellContractPersonDTO>> getAllSellContractPeople(@PathVariable ContractType contractType) {
        log.debug("REST request to get a page of SellContractPeople");
        List<SellContractPersonDTO> page = sellContractPersonService.findAllByContractType(contractType);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

}
