package pl.lodz.p.it.food2food.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EtagSignerConfiguration {

    @Value("${jws.secret}")
    private String secretValue;

    @Bean
    public EtagSigner getSigner() {
        return new EtagSigner(secretValue);
    }

    @Bean
    public EtagSignVerifier getSignVerifier() {
        return new EtagSignVerifier(secretValue);
    }
}