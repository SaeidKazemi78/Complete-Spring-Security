package ir.donyapardaz.niopdc.base.config.javers;

import com.google.common.collect.ImmutableMap;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.client.MongoDatabase;
import ir.donyapardaz.niopdc.base.service.utils.IpUtil;
import org.javers.core.Javers;
import org.javers.core.JaversBuilder;
import org.javers.repository.mongo.MongoRepository;
import org.javers.spring.auditable.CommitPropertiesProvider;
import org.javers.spring.boot.mongo.JaversMongoProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;
import java.util.Optional;

import static org.javers.repository.mongo.MongoRepository.mongoRepositoryWithDocumentDBCompatibility;

@Configuration
public class JaversConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(JaversConfiguration.class);

    @Autowired
    private MongoClient mongoClient; //from spring-boot-starter-data-mongodb

    @Autowired
    private MongoProperties mongoProperties; //from spring-boot-starter-data-mongodb

    @Autowired
    @Qualifier("javersMongoClientOptions")
    private Optional<MongoClientOptions> mongoClientOptions;

    private static String DEFAULT_HOST = "localhost";

    private static int DEFAULT_PORT = 27017;

    @Bean
    public CommitPropertiesProvider commitPropertiesProvider() {
        return new CommitPropertiesProvider() {
            public Map<String, String> provideForCommittedObject(Object domainObject) {
                return ImmutableMap.of("ipAddress", IpUtil.getClientIp(), "microservice", "niopdcbase");
            }
        };
    }

    @Bean(name = "JaversFromStarter")
    public Javers javers(JaversMongoProperties javersMongoProperties) {

        MongoDatabase mongoDatabase = initJaversMongoDatabase(javersMongoProperties);

        MongoRepository javersRepository = createMongoRepository(mongoDatabase,javersMongoProperties);

        return JaversBuilder.javers()
            .registerJaversRepository(javersRepository)
            .withProperties(javersMongoProperties)
            .withObjectAccessHook(javersMongoProperties.createObjectAccessHookInstance())
            .withObjectAccessHook(new HibernateUnproxyObjectAccessHook())
            .build();
    }

    private MongoDatabase initJaversMongoDatabase(JaversMongoProperties javersMongoProperties ) {
        if (!javersMongoProperties.isDedicatedMongodbConfigurationEnabled()) {
            MongoDatabase mongoDatabase = mongoClient.getDatabase( mongoProperties.getMongoClientDatabase() );
            logger.info("connecting Javers to Mongo database '{}' configured in spring.data.mongodb properties",
                mongoDatabase.getName());
            return mongoDatabase;
        } else {
            MongoDatabase mongoDatabase = JaversDedicatedMongoFactory.createMongoDatabase(javersMongoProperties, mongoClientOptions);
            logger.info("connecting Javers to Mongo database '{}' configured in javers.mongodb properties",
                mongoDatabase.getName());
            return mongoDatabase;
        }
    }

    private MongoRepository createMongoRepository(MongoDatabase mongoDatabase,JaversMongoProperties javersMongoProperties ) {
        if (javersMongoProperties.isDocumentDbCompatibilityEnabled()){
            logger.info("enabling Amazon DocumentDB compatibility");
            return mongoRepositoryWithDocumentDBCompatibility(mongoDatabase);
        }
        return new MongoRepository(mongoDatabase);
    }


}
