package ma.angu.ecommeceprojectbackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // toutes les routes
                        .allowedOrigins("http://localhost:8086","http://localhost:8083") // ton front Angular
                        .allowedMethods("*") // GET, POST, etc.
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
