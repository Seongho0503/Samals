package com.project.samals.dto;


import com.project.samals.domain.Animal;
import lombok.*;

import javax.persistence.Column;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AnimalDto {
    private String animal_species;

    private String animalName;
    private String animal_class;

    private String animalHabitat;
    private String animal_description;
    private int animal_total;
    private int animal_current;

    private String animalImg1;

    private String animalImg2;

    private String animalImg3;

    private String animalImg4;

    private String animalImg5;

    private String animalImg6;

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
                .animalHabitat(animal.getAnimalHabitat())
                .animal_total(animal.getAnimalTotal())
                .animal_current(animal.getAnimalCurrent())
                .animalImg1(animal.getAnimalImg1())
                .animalImg2(animal.getAnimalImg2())
                .animalImg3(animal.getAnimalImg3())
                .animalImg4(animal.getAnimalImg4())
                .animalImg5(animal.getAnimalImg5())
                .animalImg6(animal.getAnimalImg6())
                .build();
    }
}
