package com.project.samals.dto;


import com.project.samals.domain.Animal;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AnimalDto {
    private String animal_species;
    private String animal_class;
    private String animal_description;
    private int animal_total;
    private int animal_current;

    public Animal toEntity() {
        return Animal.builder()
                .animalSpecies(animal_species)
                .animalClass(animal_class)
                .animalDescription(animal_description)
                .animalTotal(animal_total)
                .animalCurrent(animal_current)
                .build();
    }
}
