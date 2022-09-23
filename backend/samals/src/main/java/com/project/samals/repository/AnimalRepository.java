package com.project.samals.repository;

import com.project.samals.domain.Animal;
import com.project.samals.dto.AnimalDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> findAllBy();
    Animal findByAnimalSpecies(String Animal_species);
    List<Animal> findByAnimalClass(String Animal_class);
}
