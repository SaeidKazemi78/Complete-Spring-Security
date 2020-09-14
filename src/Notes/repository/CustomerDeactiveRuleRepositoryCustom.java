package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerDeactiveRule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomerDeactiveRuleRepositoryCustom {
     Page<CustomerDeactiveRule> findAll(String query, Pageable pageable);
}
