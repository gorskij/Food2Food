package pl.lodz.p.it.food2food;

import org.springframework.boot.SpringApplication;

public class TestFood2FoodApplication {

    public static void main(String[] args) {
        SpringApplication.from(Food2FoodApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
