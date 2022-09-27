package com.project.samals.service;

import com.project.samals.domain.Animal;
import com.project.samals.domain.ProfileImg;
import com.project.samals.dto.response.ResProfileCountDto;
import com.project.samals.dto.response.ResShopDto;
import com.project.samals.repository.AnimalRepository;
import com.project.samals.repository.ProfileImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ShopService {

    private final AnimalRepository animalRepository;
    private final ProfileImgRepository profileImgRepository;

    public ResShopDto getShopItem(String species) {
        Animal animal = animalRepository.findByAnimalSpecies(species);
        ResShopDto shopDto = ResShopDto.convert(animal);
        return shopDto;
    }

    public List<ResProfileCountDto> getProfileCount(){
        String[] animals = {"bird","elephant","shark","tiger","frog","iguana","leopard","penguin","rhino"};
        List<ResProfileCountDto> profileCounts=new ArrayList<>();
        for(String animal : animals){
            List<ProfileImg> profileUse = profileImgRepository.findAllByAnimalSpecies(animal);
            profileCounts.add(new ResProfileCountDto(animal,profileUse.size()));
        }
        return profileCounts;
    }

}
