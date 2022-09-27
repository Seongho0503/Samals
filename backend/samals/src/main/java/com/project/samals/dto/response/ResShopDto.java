package com.project.samals.dto.response;

import com.project.samals.domain.Animal;
import com.project.samals.domain.Nft;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResShopDto {

    //동물 정보
    private String animalSpecies;
    private String animalClass;
    private String animalDescription;
    private int animalTotal;
    private int mintOrder;

    public static ResShopDto convert(Animal animal) {
        if(animal == null) return null;

        return ResShopDto.builder()
                .animalSpecies(animal.getAnimalSpecies())
                .animalClass(animal.getAnimalClass())
                .animalDescription(animal.getAnimalDescription())
                .animalTotal(animal.getAnimalTotal())
                .mintOrder(animal.getAnimalCurrent()+1)
                .build();
    }

}
