package pl.lodz.p.it.food2food.integration;

import com.github.database.rider.core.api.configuration.DBUnit;
import com.github.database.rider.core.api.configuration.Orthography;
import com.github.database.rider.core.api.connection.ConnectionHolder;
import com.github.database.rider.junit5.DBUnitExtension;
import lombok.extern.slf4j.Slf4j;
import org.dbunit.ext.postgresql.PostgresqlDataTypeFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.extension.ExtendWith;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.Network;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.MountableFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.DriverManager;

@Testcontainers
@DBUnit(schema = "public", dataTypeFactoryClass = PostgresqlDataTypeFactory.class, caseInsensitiveStrategy = Orthography.LOWERCASE)
@Slf4j
@ExtendWith(DBUnitExtension.class)
public abstract class IntegrationTestConfig {
    static final Network network = Network.newNetwork();
    public static String adminToken;
    public static String userToken;
    protected static String baseUrl;
    static final Path propertiesPath = Paths.get("src/test/resources/application-tests.properties");

    protected static ConnectionHolder connectionHolder;

    static MountableFile jar = MountableFile
            .forHostPath(Paths.get("target/Food2Food-0.0.1.jar").toAbsolutePath());

    @Container
    static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:17-alpine3.21")
            .withNetwork(network)
            .withNetworkAliases("test-db")
            .withExposedPorts(5432)
            .withUsername("f2fadmin")
            .withPassword("password")
            .withDatabaseName("database")
            .waitingFor(Wait.defaultWaitStrategy());

    @Container
    static final GenericContainer<?> application = new GenericContainer<>("eclipse-temurin:21.0.2_13-jdk")
            .withNetwork(network)
            .withExposedPorts(8080)
            .withLogConsumer(outputFrame -> System.out.print(outputFrame.getUtf8String()))
            .withCopyToContainer(MountableFile.forHostPath(propertiesPath), "/opt/application-tests.properties")
            .dependsOn(postgres)
            .withCopyToContainer(jar, "/opt/app.jar")
            .withCommand("sh", "-c", "java -jar -Dspring.config.location=/opt/application-tests.properties /opt/app.jar")
            .waitingFor(Wait.forHttp("/").forPort(8080).forStatusCode(404));

    @BeforeAll
    public static void setUp() {
        baseUrl = "http://" + application.getHost() + ":" + application.getMappedPort(8080) + "/api/v1";

        connectionHolder = () -> DriverManager.getConnection(
                postgres.getJdbcUrl(), postgres.getUsername(), postgres.getPassword()
        );

        adminToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb29kMmZvb2R1c2VyMiIsImlkIjoiNzIzZTNiZjAtODQ4NS00NWM3LWE5MmItMTI1ZWVmNmY0MTc3IiwiZXhwIjo0ODY2MjA3MjU5LCJpYXQiOjE3NDIwNjk2NTksImF1dGhvcml0aWVzIjpbIkFETUlOSVNUUkFUT1IiLCJVU0VSIl0sInVzZXJuYW1lIjoiZm9vZDJmb29kdXNlcjIifQ.Ew2BOiQLawh3CBNBfX-7GMF9Q2DNdW5kjttOO6cvz0Q";
        userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb29kMmZvb2R1c2VyIiwiaWQiOiJkODg4OWI2MS0zMTIyLTRjYTUtYTBkNi0xZTRkYWFlZjk0ZjQiLCJleHAiOjQ4NjYzNDUxNDMsImlhdCI6MTc0MjIwNzU0MywiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJ1c2VybmFtZSI6ImZvb2QyZm9vZHVzZXIifQ.qoZXBEwrpn23aW2RXgu74vCO1HrrwzqfECbdN5Exeug";

    }

}
