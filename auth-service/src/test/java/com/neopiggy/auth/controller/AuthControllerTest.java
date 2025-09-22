package com.neopiggy.auth.controller;

import com.neopiggy.auth.dto.LoginRequest;
import com.neopiggy.auth.dto.SignupRequest;
import com.neopiggy.auth.dto.TokenResponse;
import com.neopiggy.auth.repository.UserRepository;
import com.neopiggy.auth.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

  @Test
  void signup_endpoint() {
    AuthService authService = mock(AuthService.class);
    UserRepository userRepository = mock(UserRepository.class);
    AuthController controller = new AuthController(authService, userRepository);

    SignupRequest req = new SignupRequest();
    req.setName("Jane");
    req.setEmail("jane@example.com");
    req.setPassword("secret");

    when(authService.signup(any(SignupRequest.class))).thenReturn(new TokenResponse("a", "r"));

    ResponseEntity<TokenResponse> resp = controller.signup(req);
    assertEquals(200, resp.getStatusCode().value());
    assertEquals("a", resp.getBody().getAccessToken());
  }

  @Test
  void login_endpoint() {
    AuthService authService = mock(AuthService.class);
    UserRepository userRepository = mock(UserRepository.class);
    AuthController controller = new AuthController(authService, userRepository);

    LoginRequest req = new LoginRequest();
    req.setEmail("joe@example.com");
    req.setPassword("secret");

    when(authService.login(any(LoginRequest.class))).thenReturn(new TokenResponse("a", "r"));

    ResponseEntity<TokenResponse> resp = controller.login(req);
    assertEquals(200, resp.getStatusCode().value());
    assertEquals("a", resp.getBody().getAccessToken());
  }
}
