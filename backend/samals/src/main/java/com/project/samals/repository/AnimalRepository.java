package com.project.samals.repository;

import com.project.samals.domain.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findAllBy();
    Animal findByAnimalSpecies(String AnimalSpecies);
    List<Animal> findByAnimalClass(String AnimalClass);
}
