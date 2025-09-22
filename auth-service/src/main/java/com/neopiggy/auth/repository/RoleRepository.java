package com.neopiggy.auth.repository;

import com.neopiggy.auth.domain.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends MongoRepository<Role, UUID> {
  Optional<Role> findByName(String name);
  boolean existsByName(String name);
}
