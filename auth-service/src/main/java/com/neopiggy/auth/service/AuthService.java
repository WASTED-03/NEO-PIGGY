package com.neopiggy.auth.service;

import com.neopiggy.auth.domain.User;
import com.neopiggy.auth.dto.LoginRequest;
import com.neopiggy.auth.dto.RefreshRequest;
import com.neopiggy.auth.dto.SignupRequest;
import com.neopiggy.auth.dto.TokenResponse;
import com.neopiggy.auth.repository.UserRepository;
import com.neopiggy.auth.security.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  public AuthService(UserRepository userRepository,
                     PasswordEncoder passwordEncoder,
                     AuthenticationManager authenticationManager,
                     JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
  }

  public TokenResponse signup(SignupRequest req) {
    if (userRepository.existsByEmail(req.getEmail())) {
      throw new IllegalArgumentException("Email already in use");
    }
    User user = new User();
    user.setName(req.getName());
    user.setEmail(req.getEmail());
    user.setPassword(passwordEncoder.encode(req.getPassword()));
    user.setRoles(new ArrayList<>(List.of("ROLE_USER")));
    userRepository.save(user);

    String access = jwtService.generateAccessToken(user.getEmail(), user.getRoles(), Map.of("uid", user.getId().toString()));
    String refresh = jwtService.generateRefreshToken(user.getEmail());
    return new TokenResponse(access, refresh);
  }

  public TokenResponse login(LoginRequest req) {
    Authentication auth = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
    );
    User user = userRepository.findByEmail(req.getEmail()).orElseThrow();
    String access = jwtService.generateAccessToken(user.getEmail(), user.getRoles(), Map.of("uid", user.getId().toString()));
    String refresh = jwtService.generateRefreshToken(user.getEmail());
    return new TokenResponse(access, refresh);
  }

  public TokenResponse refresh(RefreshRequest req) {
    var parsed = jwtService.parse(req.getRefreshToken());
    var claims = parsed.getBody();
    if (!"refresh".equals(claims.get("type"))) {
      throw new IllegalArgumentException("Invalid refresh token");
    }
    String subject = claims.getSubject();
    User user = userRepository.findByEmail(subject).orElseThrow(() -> new IllegalArgumentException("User not found"));
    String access = jwtService.generateAccessToken(user.getEmail(), user.getRoles(), Map.of("uid", user.getId().toString()));
    String refresh = jwtService.generateRefreshToken(user.getEmail());
    return new TokenResponse(access, refresh);
  }
}
