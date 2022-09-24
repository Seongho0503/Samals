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

    //객체를 관계형 데이터로 변환
    public Animal toEntity() {
        return Animal.builder()
                .animalSpecies(animal_species)
                .animalClass(animal_class)
                .animalDescription(animal_description)
                .animalTotal(animal_total)
                .animalCurrent(animal_current)
                .build();
    }

    public AnimalDto convert(Animal animal) {
        if(animal == null)
            return null;
        return AnimalDto.builder()
                .animal_species(animal.getAnimalSpecies())
                .animal_class(animal.getAnimalClass())
                .animal_description(animal.getAnimalDescription())
                .animal_total(animal.getAnimalTotal())
                .animal_current(animal.getAnimalCurrent())
                .build();
    }
}
