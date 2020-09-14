package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.repository.custom.OldCustomerRepositoryCustom;
import ir.donyapardaz.niopdc.base.service.dto.OldCustomerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.util.List;

public class OldCustomerRepositoryImpl extends JdbcDaoSupport implements OldCustomerRepositoryCustom {
    @PersistenceContext
    EntityManager entityManager;
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDs(DataSource dataSource) {
        setDataSource(dataSource);
    }

    @PostConstruct
    private void postConstruct() {
        jdbcTemplate = new NamedParameterJdbcTemplate(getDataSource());
    }

    @Override
    public List<OldCustomerDTO> findOneBySalesCodeAndNationalCode(String salesCode, String nationalCode) {
        String query = "select Customer.ID, Customer.CustomerName,Customer.Address, " +
            "Customer.Code " +
            " from old_customer Customer " +
            "where " +
            "((Customer.CodeMeli=:nationalCode) or (Customer.ShenaseMeli=:nationalCode)) and " +
            "Customer.Code = :salesCode ";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("salesCode", salesCode);
        parameters.addValue("nationalCode", nationalCode);

        return jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper(OldCustomerDTO.class));
    }

    @Override
    public List<OldCustomerDTO> findAllBySalesCodeAndNationalCode(List<String> salesCode, String nationalCode) {
        String query = "select distinct c.*," +
            "ct.Code as customer_type_code," +

            " from old_customer c " +
            "inner join old_customer_type ct on ct.ID = c.F_CustomerTypeID " +
            "where " +
            "(p.CodeMeli=:nationalCode) or (p.ShenaseMeli=:nationalCode) and " +
            "c.code in (:salesCode)";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("salesCode", salesCode);
        parameters.addValue("nationalCode", nationalCode);

        return jdbcTemplate.query(query, parameters, new BeanPropertyRowMapper(OldCustomerDTO.class));
    }
}
