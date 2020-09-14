package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.stream.Collectors;

@Service
@Transactional
public class ViewService {
    private TransactionTemplate transactionTemplate;

    public ViewService(TransactionTemplate transactionTemplate) {
        this.transactionTemplate = transactionTemplate;
    }

    enum ViewNameEnum {
        CUSTOMER;

        @Override
        @NotNull
        public String toString() {
            switch (this) {
                case CUSTOMER:
                    return "#customer_view";
            }
            throw new RuntimeException("");
        }
    }


    @PersistenceContext
    private EntityManager em;


    @Transactional
    void create(ViewNameEnum entityPathBase) {
        transactionTemplate.execute(transactionStatus -> {
            em.createNativeQuery("create table " + entityPathBase + "(id bigint primary key); select * from #customer_view").executeUpdate();
            return null;
        });
        transactionTemplate.execute(transactionStatus -> {
            em.createNativeQuery("insert into " + entityPathBase + " select id" +
                " from " + entityPathBase.toString().substring(1) +
                " where username = '" + SecurityUtils.getCurrentUserLogin().get() + "' ;").executeUpdate();
            return null;
        });
    }


}
