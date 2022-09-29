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
    private String animalNameKr;
    private String animalNameEn;

    private String animalClass;
    private int animalClassNo;

    private String animalHabitat;
    private String animalDescription;
    private int animalTotal;
    private int mintOrder;
    private String img1;
    private String img2;
    private String img3;
    private String img4;
    private String img5;
    private String img6;

    public static ResShopDto convert(Animal animal) {
        if(animal == null) return null;

        return ResShopDto.builder()
                .animalSpecies(animal.getAnimalSpecies())
                .animalClass(animal.getAnimalClass())
                .animalClassNo(animal.getAnimalClassNo())
                .animalNameKr(animal.getAnimalNameKr())
                .animalNameEn(animal.getAnimalNameEn())
                .animalHabitat(animal.getAnimalHabitat())
                .animalDescription(animal.getAnimalDescription())
                .animalTotal(animal.getAnimalTotal())
                .mintOrder(animal.getAnimalCurrent()+1)
                .img1(animal.getAnimalImg1())
                .img2(animal.getAnimalImg2())
                .img3(animal.getAnimalImg3())
                .img4(animal.getAnimalImg4())
                .img5(animal.getAnimalImg5())
                .img6(animal.getAnimalImg6())
                .build();
    }

}
