package ir.donyapardaz.niopdc.base.repository.query.dsl;

import com.querydsl.core.types.dsl.*;
import org.joda.time.DateTimeZone;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by abbas on 5/16/17.
 */
public class Predicate {
    private SearchCriteria criteria;

    public Predicate(SearchCriteria param) {
        this.criteria = param;
    }

    public BooleanExpression getPredicate(PathBuilder entityPath) {
//        PathBuilder<Bank> entityPath = new PathBuilder<>(Bank.class, "bank");


        if ((criteria.getOperation().equals("☼") || criteria.getOperation().equals("<") || criteria.getOperation().equals(">"))) {
            NumberPath<Integer> path = entityPath.getNumber(criteria.getKey(), Integer.class);
            int value = Integer.parseInt(criteria.getValue().toString());
            if (criteria.getOperation().equalsIgnoreCase("☼")) {
                return path.eq(value);
            } else if (criteria.getOperation().equalsIgnoreCase(">")) {
                return path.goe(value);
            } else if (criteria.getOperation().equalsIgnoreCase("<")) {
                return path.loe(value);
            }
        } else if (criteria.getOperation().equals(";")) {
            BooleanPath path = entityPath.getBoolean(criteria.getKey());
            return path.eq(Boolean.parseBoolean(criteria.getValue().toString()));
        } else if (criteria.getOperation().equals("$")) {
            StringPath path = entityPath.getString(criteria.getKey());
            return path.like("%" + criteria.getValue().toString() + "%");
        } else if (criteria.getOperation().equals("→")) {
            DateTimePath path = entityPath.getDateTime(criteria.getKey(), ZonedDateTime.class);
            return path.after(ZonedDateTime.parse(criteria.getValue().toString())).or(
                path.eq(ZonedDateTime.parse(criteria.getValue().toString()))
            );
        } else if (criteria.getOperation().equals("←")) {
            DateTimePath path = entityPath.getDateTime(criteria.getKey(), ZonedDateTime.class);
            return path.before(ZonedDateTime.parse(criteria.getValue().toString())).or(
                path.eq(ZonedDateTime.parse(criteria.getValue().toString()))
            );
        } else if (criteria.getOperation().equals("•")) {
            DateTimePath path = entityPath.getDateTime(criteria.getKey(), ZonedDateTime.class);
            return path.isNull();
        } else if (criteria.getOperation().equals("↔")) {
            String[] split = criteria.getValue().toString().split("\\.");
            Class cl = null;
            try {
                cl = Class.forName("ir.donyapardaz.niopdc.base.domain.enumeration." + split[0]);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();

            }
            EnumPath path = entityPath.getEnum(criteria.getKey(), cl);

            List<Enum> enumClass = new ArrayList<>();
            Arrays.stream(split[1].split(",")).forEach(s -> {
                enumClass.add(getEnumClass("ir.donyapardaz.niopdc.base.domain.enumeration." + split[0] + "." + s));
            });

            return path.in(enumClass);
        } else if (criteria.getOperation().equals("↨")) {
            NumberPath<Long> path = entityPath.getNumber(criteria.getKey(), Long.class);
            List<Long> longs = new ArrayList<>();
            Arrays.stream(criteria.getValue().toString()
                .split(",")).forEach(value -> longs.add(Long.parseLong(value)));
            return path.in(longs);
        } else if (criteria.getOperation().equals("#")) {
            String[] split = criteria.getValue().toString().split("\\.");
            Class cl = null;
            try {
                cl = Class.forName("ir.donyapardaz.niopdc.base.domain.enumeration." + split[0]);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();

            }
            EnumPath path = entityPath.getEnum(criteria.getKey(), cl);
            Enum enumClass = getEnumClass("ir.donyapardaz.niopdc.base.domain.enumeration." + criteria.getValue().toString());
            return path.eq(enumClass);
        }
        return null;
    }

    static private Enum getEnumClass(String enumFullName) {
        // see http://stackoverflow.com/questions/4545937/
        String[] x = enumFullName.split("\\.(?=[^\\.]+$)");
        if (x.length == 2) {
            String enumClassName = x[0];
            String enumName = x[1];
            try {
                Class cl = Class.forName(enumClassName);
                // #1

                return Enum.valueOf(cl, enumName);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

}
