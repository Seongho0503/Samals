package com.project.samals.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/api/animal")
@Api(tags={"Animal API"})
public class AnimalController {
}
