package pl.lodz.p.it.food2food.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;
import pl.lodz.p.it.food2food.dto.*;
import pl.lodz.p.it.food2food.services.AuthService;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @Value("${oauth2.google.auth.url}")
    private String oAuthGoogleUrl;

    @Value("${oauth2.google.registration.client-id}")
    private String oAuthGoogleClientId;

    @Value("${oauth2.google.registration.client-secret}")
    private String oAuthGoogleClientSecret;

    @Value("${oauth2.google.token.url}")
    private String oAuthGoogleTokenUri;

    @Value("${oauth2.google.redirect.url}")
    private String oAuthGoogleRedirectUri;

    @Value("${oauth2.github.auth.url}")
    private String oAuthGithubUrl;

    @Value("${oauth2.github.registration.client-id}")
    private String oAuthGithubClientId;

    @Value("${oauth2.github.registration.client-secret}")
    private String oAuthGithubClientSecret;

    @Value("${oauth2.github.token.url}")
    private String oAuthGithubTokenUri;

    @Value("${oauth2.github.redirect.url}")
    private String oAuthGithubRedirectUri;

    @GetMapping("/google-oauth/url")
    public ResponseEntity<Map<String, String>> getOAuthGoogleUrl() {
        String url = UriComponentsBuilder
                .fromUriString(oAuthGoogleUrl)
                .queryParam("client_id", oAuthGoogleClientId)
                .queryParam("redirect_uri", oAuthGoogleRedirectUri)
                .queryParam("response_type", "code")
                .queryParam("scope", "openid profile email")
                .queryParam("access_type", "offline")
                .queryParam("state", "standard_oauth")
                .queryParam("prompt", "consent")
                .build().toUriString();

        Map<String, String> response = new HashMap<>();
        response.put("url", url);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/google-oauth/token/")
    public ResponseEntity<Map<String, String>> signInOAuth(
            @RequestParam String code
    ) throws JsonProcessingException {
        String tokenRequestUrl = UriComponentsBuilder
                .fromUriString(oAuthGoogleTokenUri)
                .queryParam("client_id", oAuthGoogleClientId)
                .queryParam("client_secret", oAuthGoogleClientSecret)
                .queryParam("code", code)
                .queryParam("grant_type", "authorization_code")
                .queryParam("redirect_uri", oAuthGoogleRedirectUri)
                .build().toUriString();

        RestClient restClient = RestClient.create();
        GoogleOAuth2TokenResponse tokenResponse = restClient.post()
                .uri(tokenRequestUrl)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(GoogleOAuth2TokenResponse.class);

        String idToken = tokenResponse.id_token();
        String[] tokenChunks = idToken.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String tokenPayload = new String(decoder.decode(tokenChunks[1]));

        ObjectMapper objectMapper = new ObjectMapper();
        GoogleOAuth2TokenPayload payload = objectMapper.readValue(tokenPayload, GoogleOAuth2TokenPayload.class);

        Map<String, String> response = authService.singInOAuth(payload);

        if (response.containsKey("created")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/github-oauth/url")
    public ResponseEntity<Map<String, String>> getOAuthGithubUrl() {
        String url = UriComponentsBuilder
                .fromUriString(oAuthGithubUrl)
                .queryParam("client_id", oAuthGithubClientId)
                .queryParam("redirect_uri", oAuthGithubRedirectUri)
                .queryParam("scope", "read:user user:email")
                .queryParam("state", "standard_oauth")
                .build().toUriString();

        Map<String, String> response = new HashMap<>();
        response.put("url", url);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/github-oauth/token/")
    public ResponseEntity<Map<String, String>> signInOAuthGithub(@RequestParam String code) throws JsonProcessingException {
        String tokenRequestUrl = UriComponentsBuilder
                .fromUriString(oAuthGithubTokenUri)
                .queryParam("client_id", oAuthGithubClientId)
                .queryParam("client_secret", oAuthGithubClientSecret)
                .queryParam("code", code)
                .queryParam("redirect_uri", oAuthGithubRedirectUri)
                .build().toUriString();

        RestClient restClient = RestClient.create();
        GithubOAuth2TokenResponse tokenResponse = restClient.post()
                .uri(tokenRequestUrl)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(GithubOAuth2TokenResponse.class);

        String accessToken = tokenResponse.accessToken();

        String userInfoUrl = "https://api.github.com/user";
        Map<String, Object> userInfo = restClient.get()
                .uri(userInfoUrl)
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(Map.class);

        String id = String.valueOf(userInfo.get("id"));
        String username = (String) userInfo.get("login");
        String email = (String) userInfo.get("email");

        if (email == null) {
            String userEmailUrl = "https://api.github.com/user/emails";
            List<Map<String, Object>> userEmails = restClient.get()
                    .uri(userEmailUrl)
                    .header("Authorization", "Bearer " + accessToken)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(List.class);

            email = userEmails.stream()
                    .filter(e -> Boolean.TRUE.equals(e.get("primary")))
                    .findFirst()
                    .map(e -> (String) e.get("email"))
                    .orElse(null);
        }

        GithubOAuth2TokenPayload payload = new GithubOAuth2TokenPayload(
                id,
                username,
                email,
                (String) userInfo.get("avatar_url"),
                (String) userInfo.get("name")
        );

        Map<String, String> response = authService.singInGithubOAuth(payload);

        if (response.containsKey("created")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        return ResponseEntity.ok(response);
    }

}
