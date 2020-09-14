package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.NiopdcConfig;
import ir.donyapardaz.niopdc.base.domain.enumeration.ConfigType;
import ir.donyapardaz.niopdc.base.domain.projection.Currency;
import ir.donyapardaz.niopdc.base.domain.projection.CurrencyRateGroup;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;


/**
 * Spring Data JPA repository for the NiopdcConfig entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface NiopdcConfigRepository extends JpaRepository<NiopdcConfig, Long> {
    @Query(
        "select distinct currency from NiopdcConfig niopdcConfig,Currency currency " +
            "inner join niopdcConfig.boundaryCurrencies currenciesIds " +
            "where " +
            "niopdcConfig.configType=:configType and " +
            "(niopdcConfig.startDate<=:date and (niopdcConfig.finishDate is null or(niopdcConfig.finishDate>=:date))) and " +
            "currency.id in elements(currenciesIds)"
    )
    List<Currency> findAllCurrenciesForBoundary(@Param("configType") ConfigType configType, @Param("date") ZonedDateTime date);

    @Query(
        "select currencyRateGroup from NiopdcConfig niopdcConfig " +
            "inner join CurrencyRateGroup currencyRateGroup on currencyRateGroup.id = niopdcConfig.boundaryCurrencyRateGroupId " +
            "where " +
            "niopdcConfig.configType=:configType and " +
            "niopdcConfig.startDate<=:date and (niopdcConfig.finishDate is null or(niopdcConfig.finishDate>=:date))"
    )
    CurrencyRateGroup findCurrencyRateGroupForBoundary(@Param("configType") ConfigType configType, @Param("date") ZonedDateTime date);

    @Query(
        "select count(n.id) from NiopdcConfig  n " +
            "where " +
            "(:id is null or :id<>n.id) and " +
            "n.configType = :configType and " +
            "(n.finishDate is null and n.startDate < :startDate or " +
            "((n.startDate between :startDate and :finishDate) " +
            "or (n.finishDate between :startDate and :finishDate) " +
            "or(:startDate between n.startDate and n.finishDate)))"
    )
    long checkConflict(@Param("id") Long id,
                       @Param("configType") ConfigType configType,
                       @Param("startDate") ZonedDateTime startDate,
                       @Param("finishDate") ZonedDateTime finishDate);


    @Query(
        "select niopdcConfig.transferTypeId from NiopdcConfig niopdcConfig " +
            "where " +
            "niopdcConfig.configType=:configType and " +
            "niopdcConfig.startDate<=:date and (niopdcConfig.finishDate is null or(niopdcConfig.finishDate>=:date))"
    )
    Long findTransferType(@Param("configType") ConfigType configType, @Param("date") ZonedDateTime date);

    @Query(
        "select niopdcConfig.invoiceCounterOffset from NiopdcConfig niopdcConfig " +
            "where " +
            "niopdcConfig.configType=:configType and " +
            "niopdcConfig.startDate<=:date and (niopdcConfig.finishDate is null or(niopdcConfig.finishDate>=:date))"
    )
    Long findInvoiceCounterOffset(@Param("configType") ConfigType configType,@Param("date") ZonedDateTime date);

    @Query(
        "select niopdcConfig from NiopdcConfig niopdcConfig" +
            " where " +
            "niopdcConfig.configType=:configType and " +
            "niopdcConfig.startDate<=:date and (niopdcConfig.finishDate is null or(niopdcConfig.finishDate>=:date))"
    )
    NiopdcConfig findTransferTypeContaminate(@Param("configType") ConfigType configType, @Param("date") ZonedDateTime date);
}
