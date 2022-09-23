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

    public AnimalDto addAnimal(AnimalDto animalDto){
        Animal animal = animalDto.toEntity();
        log.info("animal: {}",animal.toString());
        //DB 저장
        animalRepository.save(animal);
        return animalDto;
    }
}
