package com.project.samals.service;

import com.project.samals.domain.Animal;
import com.project.samals.domain.ProfileImg;
import com.project.samals.dto.response.ResProfileCountDto;
import com.project.samals.dto.response.ResShopDto;
import com.project.samals.exception.AnimalNotFoundException;
import com.project.samals.exception.UserNotFoundException;
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

    public ResShopDto getShopItem(String species) {
        Animal animal = animalRepository.findByAnimalSpecies(species)
                .orElseThrow(() -> new AnimalNotFoundException(String.format("%s은 등록되지 않은 동물입니다", species)));
        ResShopDto shopDto = ResShopDto.convert(animal);
        return shopDto;
    }

}
