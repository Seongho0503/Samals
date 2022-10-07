package com.project.samals.repository;

import com.project.samals.domain.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findAllBy();
    Optional<Animal> findByAnimalSpecies(String AnimalSpecies);
    List<Animal> findByAnimalClass(String AnimalClass);
}
