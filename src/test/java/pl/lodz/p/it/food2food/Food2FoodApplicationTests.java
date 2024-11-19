package pl.lodz.p.it.food2food;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class Food2FoodApplicationTests {

    @Test
    void contextLoads() {
    }

}
