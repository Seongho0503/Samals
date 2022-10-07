package com.project.samals.service;

import com.project.samals.controller.AnimalController;
import com.project.samals.domain.Animal;
import com.project.samals.dto.AnimalDto;
import com.project.samals.repository.AnimalRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

//서비스 등록
@Service
//
@Transactional
//private, @NonNull 인 필드 값만 파라미터로 받는 생성자 생성
@RequiredArgsConstructor
public class AnimalService {
    private final AnimalRepository animalRepository;
    private static final Logger log = LoggerFactory.getLogger(AnimalService.class);

    //동물 종류 추가
    public AnimalDto addAnimal(AnimalDto animalDto){
        Animal animal = animalDto.toEntity();
        log.info("animal: {}",animal.toString());
        //DB 저장
        animalRepository.save(animal);
        return animalDto;
    }
    public AnimalDto modifyAnimal(AnimalDto animalDto){
        Animal animal = animalRepository.findByAnimalSpecies(animalDto.getAnimal_species()).orElseThrow();
        animal.setAnimalSpecies(animalDto.getAnimal_species());
        animal.setAnimalClass(animalDto.getAnimal_class());
        animal.setAnimalDescription(animalDto.getAnimal_description());
        animal.setAnimalTotal(animalDto.getAnimal_total());
        animal.setAnimalCurrent(animalDto.getAnimal_current());
        return new AnimalDto().convert(animal);
    }
    //동물의 현재 개수 증가
    public Boolean incAnimal(String animalSpecies){
//        AnimalDto animalDto = new AnimalDto().convert(animalRepository.findByAnimalSpecies(animalSpecies));
        Animal animal = animalRepository.findByAnimalSpecies(animalSpecies).orElseThrow();
        //총 개수보다 현재 개수가 적으면
        if(animal.getAnimalTotal() > animal.getAnimalCurrent()){
            animal.setAnimalCurrent(animal.getAnimalCurrent() + 1);
            return true;
        }else{
            return false;
        }
    }
}
