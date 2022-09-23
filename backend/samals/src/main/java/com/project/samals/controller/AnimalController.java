package com.project.samals.controller;

import com.project.samals.domain.Animal;
import com.project.samals.dto.AnimalDto;
import com.project.samals.repository.AnimalRepository;
import com.project.samals.service.AnimalService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/animal")
@Api(tags={"Animal API"})
public class AnimalController {

    private  final AnimalRepository animalRepository;
    private final AnimalService animalService;
    private static final Logger log = LoggerFactory.getLogger(AnimalController.class);

    @ApiOperation(value="동물 추가")
    @PostMapping("/add")
    public ResponseEntity<AnimalDto> addAnimal(@RequestBody AnimalDto animalDto){
        log.info("animalDto1 -> {} ", animalDto.toString());
        AnimalDto returnData = animalService.addAnimal(animalDto);
        log.info("animalDto2 -> {} ", returnData.toString());

        return new ResponseEntity<>(animalService.addAnimal(animalDto), HttpStatus.CREATED);
    }

    @ApiOperation(value="모든 동물 리스트 조회")
    @GetMapping("/list")
    public ResponseEntity<List<Animal>> findAllBy(){
        return new ResponseEntity<>(animalRepository.findAllBy(), HttpStatus.OK);
    }

    @ApiOperation(value="특정 동물 조회")
    @GetMapping("species/{animalSpecies}")
    public ResponseEntity<Animal> findAnimalByAnimal_species(@PathVariable String animalSpecies){
        System.out.println();
        return new ResponseEntity<>(animalRepository.findByAnimalSpecies(animalSpecies), HttpStatus.OK);
    }

    @ApiOperation(value="특정 동물 조회")
    @GetMapping("class/{animalClass}")
    public ResponseEntity<List<Animal>> findAnimalsByAnimal_class(@PathVariable String animalClass){
        return new ResponseEntity<>(animalRepository.findByAnimalClass(animalClass), HttpStatus.OK);
    }
//
//    @ApiOperation(value="특정 동물 조회")
//    @GetMapping("class/{animalClass}")
//    public ResponseEntity<List<Animal>> findAnimalsByAnimal_class(@PathVariable int B){
//        return new ResponseEntity<>(animalRepository.findAllBy(), HttpStatus.OK);
//    }
}
