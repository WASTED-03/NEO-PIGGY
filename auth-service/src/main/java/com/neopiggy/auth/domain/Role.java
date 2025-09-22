package com.neopiggy.auth.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "roles")
public class Role {
  @Id
  private UUID id;
  private String name; // ROLE_USER, ROLE_ADMIN

  public Role() {
    this.id = UUID.randomUUID();
  }

  public Role(String name) {
    this.id = UUID.randomUUID();
    this.name = name;
  }

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
}
