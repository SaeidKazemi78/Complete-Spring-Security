package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.service.dto.BoundaryDiscountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.sql.Timestamp;
import java.sql.Types;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class BoundaryDiscountRepositoryImpl extends JdbcDaoSupport implements BoundaryDiscountRepositoryCustom {
    @PersistenceContext
    private EntityManager em;
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
    public Page<BoundaryDiscountDTO> findAll(String locationTitle, String countryTitle, String vehicleModelType, String liter, Pageable pageable) {
        String sort = StringUtils.collectionToCommaDelimitedString(
                StreamSupport.stream(pageable.getSort().spliterator(), false)
                    .map(o -> o.getProperty() + " " + o.getDirection())
                    .collect(Collectors.toList()));

        StringBuilder query=new StringBuilder("");
        StringBuilder where=new StringBuilder("");
        StringBuilder from=new StringBuilder("");
        StringBuilder orderBy=new StringBuilder("");

        MapSqlParameterSource parameters = new MapSqlParameterSource();

        query.append("SELECT  boundary_discount.id, " +
            "boundary_discount.finish_date finishDateStr , " +
            "boundary_discount.start_date startDateStr ," +
            "boundary_discount.liter, " +
            "location.name as locationTitle, " +
            "country.name as countryTitle, " +
            "boundary_discount.vehicle_model_type as vehicleModelType ");

          from.append(" from boundary_discount boundary_discount " +
              "left join location location on location.id = boundary_discount.location_id " +
              "left join country  country  on boundary_discount.country_id= country.id ");

            if(Objects.nonNull(locationTitle)){
                where.append(where.toString().length()==0? " where " : " and ").append(" location.name like :locationTitle ");
                parameters.addValue("locationTitle","%"+locationTitle+"%");
            }

        if(Objects.nonNull(countryTitle)){
            where.append(where.toString().length()==0? " where " : " and ").append(" country.name like :countryTitle ");
            parameters.addValue("countryTitle","%"+countryTitle+"%");
        }

        if(Objects.nonNull(vehicleModelType)){
            where.append(where.toString().length()==0? " where " : " and ").append(" boundary_discount.vehicle_model_type = :vehicleModelType ");
            parameters.addValue("vehicleModelType",vehicleModelType);
        }

        if(Objects.nonNull(liter)){
            where.append(where.toString().length()==0? " where ": " and ").append(" boundary_discount.liter like :liter ");
            parameters.addValue("liter","%"+liter+"%");
        }


       orderBy.append(" ORDER BY ").append(sort).append(" OFFSET :skipRows ROWS FETCH NEXT :takeRows ROWS ONLY;");
        parameters.addValue("skipRows", pageable.getOffset());
        parameters.addValue("takeRows", pageable.getPageSize());



            String count =  "select count(*) " + from;


            List<BoundaryDiscountDTO> findAll = jdbcTemplate.query(query.append(from).append(where).append(orderBy).toString(),
                parameters, new BeanPropertyRowMapper<>(BoundaryDiscountDTO.class));

            int size = findAll.size() < pageable.getPageSize() && pageable.getOffset() == 0 ? findAll.size()
                : jdbcTemplate.queryForObject(count, parameters, Integer.class);

            return new PageImpl<>(findAll, pageable, size);
    }

}
