package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.NiopdcConfig;
import ir.donyapardaz.niopdc.base.domain.enumeration.ConfigType;
import ir.donyapardaz.niopdc.base.domain.projection.Currency;
import ir.donyapardaz.niopdc.base.domain.projection.CurrencyRateGroup;
import ir.donyapardaz.niopdc.base.repository.NiopdcConfigRepository;
import ir.donyapardaz.niopdc.base.service.dto.NiopdcConfigDTO;
import ir.donyapardaz.niopdc.base.service.mapper.NiopdcConfigMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;


/**
 * Service Implementation for managing NiopdcConfig.
 */
@Service
@Transactional
public class NiopdcConfigService {

    private final Logger log = LoggerFactory.getLogger(NiopdcConfigService.class);

    private final NiopdcConfigRepository niopdcConfigRepository;

    private final NiopdcConfigMapper niopdcConfigMapper;

    public NiopdcConfigService(NiopdcConfigRepository niopdcConfigRepository, NiopdcConfigMapper niopdcConfigMapper) {
        this.niopdcConfigRepository = niopdcConfigRepository;
        this.niopdcConfigMapper = niopdcConfigMapper;
    }

    /**
     * Save a niopdcConfig.
     *
     * @param niopdcConfigDTO the entity to save
     * @return the persisted entity
     */
    public NiopdcConfigDTO save(NiopdcConfigDTO niopdcConfigDTO) {
        log.debug("Request to save NiopdcConfig : {}", niopdcConfigDTO);
        NiopdcConfig niopdcConfig = niopdcConfigMapper.toEntity(niopdcConfigDTO);
        niopdcConfig = niopdcConfigRepository.save(niopdcConfig);
        return niopdcConfigMapper.toDto(niopdcConfig);
    }

    /**
     * Get all the niopdcConfigs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<NiopdcConfigDTO> findAll(Pageable pageable) {
        log.debug("Request to get all NiopdcConfigs");
        return niopdcConfigRepository.findAll(pageable)
            .map(niopdcConfigMapper::toDto);
    }

    /**
     * Get one niopdcConfig by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public NiopdcConfigDTO findOne(Long id) {
        log.debug("Request to get NiopdcConfig : {}", id);
        NiopdcConfig niopdcConfig = niopdcConfigRepository.findOne(id);
        return niopdcConfigMapper.toDto(niopdcConfig);
    }

    /**
     * Delete the niopdcConfig by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete NiopdcConfig : {}", id);
        niopdcConfigRepository.delete(id);
    }

    public List<Currency> findAllCurrencies(ConfigType configType) {
        return niopdcConfigRepository.findAllCurrenciesForBoundary(configType,ZonedDateTime.now());
    }

    public CurrencyRateGroup findALlCurrencyRateGroup(ConfigType configType) {
        return niopdcConfigRepository.findCurrencyRateGroupForBoundary(configType,ZonedDateTime.now());
    }

    public Long findTransferType() {
        return niopdcConfigRepository.findTransferType(ConfigType.NIOPDC_AO,ZonedDateTime.now());
    }

    public List<Long> findTransferTypeContaminate() {
        NiopdcConfig transferTypeContaminate = niopdcConfigRepository.findTransferTypeContaminate(ConfigType.NIOPDC_AO, ZonedDateTime.now());
        return transferTypeContaminate==null?null:transferTypeContaminate.getTransferTypeContaminateIds();
    }

    public Long getInvoiceCounterOffset() {
      return   niopdcConfigRepository.findInvoiceCounterOffset(ConfigType.INVOICE,ZonedDateTime.now());
    }
}
