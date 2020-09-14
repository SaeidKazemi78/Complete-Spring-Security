package ir.donyapardaz.niopdc.base.repository.query.dsl;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by abbas on 5/16/17.
 */
public class PredicatesBuilder {


    public PredicatesBuilder() {

    }


    public BooleanExpression build(String query, PathBuilder entityPath, Map<String, PathBuilder> entityPathMap) {
        String[] characters = {">", "☼", "<", "$", ";", "#", "→", "←", "•", "↔", "↨"};
        List<SearchCriteria> params = new ArrayList<>();
        if (query != null) {
            for (String s : query.split("&")) {

                for (String c : characters) {
                    if (s.indexOf(c) > 0) {
                        String value = (c.equals("$") ? s.split("\\$")[1] : s.split(c)[1]);
                        if (s.split(c)[0].indexOf("|") > 0) {
                            String ep = s.split(c)[0].split("\\|")[0]; //entityPath
                            String key = s.split(c)[0].split("\\|")[1].split("\\$")[0];
                            params.add(new SearchCriteria(key, c, value, ep));
                        } else /*if (!s.contains("-"))*/ {
                            String key = (c.equals("$") ? s.split("\\$")[0] : s.split(c)[0]);
                            params.add(new SearchCriteria(key, c, value));
                        }
                    }
                }
            }

        }

        if (params.size() == 0) {
            return null;
        }


        List<BooleanExpression> predicates = new ArrayList<>();
        Predicate predicate;
        for (SearchCriteria param : params) {
            predicate = new Predicate(param);

            BooleanExpression exp = predicate.getPredicate((param.getEntityPath() != null) ? entityPathMap.get(param.getEntityPath()) : entityPath);

            if (exp != null) {
                predicates.add(exp);
            }
        }

        BooleanExpression result = predicates.get(0);
        for (int i = 1; i < predicates.size(); i++) {
            result = result.and(predicates.get(i));
        }
        return result;
    }
}
