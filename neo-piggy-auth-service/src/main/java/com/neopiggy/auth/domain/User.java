package com.neopiggy.auth.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document(collection = "users")
public class User {
  @Id
  private UUID id;

  private String name;

  @Indexed(unique = true)
  private String email;

  // BCrypt hashed
  private String password;

  private List<String> roles = new ArrayList<>();

  public User() {
    this.id = UUID.randomUUID();
  }

  public User(String name, String email, String password, List<String> roles) {
    this.id = UUID.randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }

  public List<String> getRoles() { return roles; }
  public void setRoles(List<String> roles) { this.roles = roles; }
}
