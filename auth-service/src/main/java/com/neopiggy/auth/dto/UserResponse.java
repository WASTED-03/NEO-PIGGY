package com.neopiggy.auth.dto;

import java.util.List;
import java.util.UUID;

public class UserResponse {
  private UUID id;
  private String name;
  private String email;
  private List<String> roles;

  public UserResponse() {}

  public UserResponse(UUID id, String name, String email, List<String> roles) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
  }

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public List<String> getRoles() { return roles; }
  public void setRoles(List<String> roles) { this.roles = roles; }
}
