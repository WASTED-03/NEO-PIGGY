package com.neopiggy.auth.controller;

import com.neopiggy.auth.dto.LoginRequest;
import com.neopiggy.auth.dto.RefreshRequest;
import com.neopiggy.auth.dto.SignupRequest;
import com.neopiggy.auth.dto.TokenResponse;
import com.neopiggy.auth.dto.UserResponse;
import com.neopiggy.auth.domain.User;
import com.neopiggy.auth.repository.UserRepository;
import com.neopiggy.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;
  private final UserRepository userRepository;

  public AuthController(AuthService authService, UserRepository userRepository) {
    this.authService = authService;
    this.userRepository = userRepository;
  }

  @PostMapping("/signup")
  public ResponseEntity<TokenResponse> signup(@Valid @RequestBody SignupRequest req) {
    return ResponseEntity.ok(authService.signup(req));
  }

  @PostMapping("/login")
  public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest req) {
    return ResponseEntity.ok(authService.login(req));
  }

  @PostMapping("/refresh")
  public ResponseEntity<TokenResponse> refresh(@Valid @RequestBody RefreshRequest req) {
    return ResponseEntity.ok(authService.refresh(req));
  }

  @GetMapping("/me")
  public ResponseEntity<UserResponse> me(@AuthenticationPrincipal UserDetails principal) {
    if (principal == null) {
      return ResponseEntity.status(401).build();
    }
    var user = userRepository.findByEmail(principal.getUsername()).orElse(null);
    if (user == null) {
      return ResponseEntity.status(404).build();
    }
    return ResponseEntity.ok(new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRoles()));
  }
}
