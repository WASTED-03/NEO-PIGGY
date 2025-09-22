package com.neopiggy.auth.service;

import com.neopiggy.auth.domain.User;
import com.neopiggy.auth.dto.LoginRequest;
import com.neopiggy.auth.dto.SignupRequest;
import com.neopiggy.auth.repository.UserRepository;
import com.neopiggy.auth.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;
  private AuthenticationManager authenticationManager;
  private JwtService jwtService;
  private AuthService authService;

  @BeforeEach
  void setUp() {
    userRepository = mock(UserRepository.class);
    passwordEncoder = mock(PasswordEncoder.class);
    authenticationManager = mock(AuthenticationManager.class);
    jwtService = mock(JwtService.class);
    authService = new AuthService(userRepository, passwordEncoder, authenticationManager, jwtService);
  }

  @Test
  void signup_success() {
    SignupRequest req = new SignupRequest();
    req.setName("Jane");
    req.setEmail("jane@example.com");
    req.setPassword("secret123");

    when(userRepository.existsByEmail("jane@example.com")).thenReturn(false);
    when(passwordEncoder.encode("secret123")).thenReturn("hashed");
    when(jwtService.generateAccessToken(any(), anyList(), anyMap())).thenReturn("access");
    when(jwtService.generateRefreshToken(any())).thenReturn("refresh");

    var res = authService.signup(req);
    assertEquals("access", res.getAccessToken());
    assertEquals("refresh", res.getRefreshToken());
    verify(userRepository, times(1)).save(any(User.class));
  }

  @Test
  void login_success() {
    LoginRequest req = new LoginRequest();
    req.setEmail("joe@example.com");
    req.setPassword("secret");

    when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
        .thenReturn(Mockito.mock(org.springframework.security.core.Authentication.class));
    User user = new User("Joe", "joe@example.com", "hashed", List.of("ROLE_USER"));
    when(userRepository.findByEmail("joe@example.com")).thenReturn(Optional.of(user));
    when(jwtService.generateAccessToken(any(), anyList(), anyMap())).thenReturn("access");
    when(jwtService.generateRefreshToken(any())).thenReturn("refresh");

    var res = authService.login(req);
    assertEquals("access", res.getAccessToken());
    assertEquals("refresh", res.getRefreshToken());
  }
}
