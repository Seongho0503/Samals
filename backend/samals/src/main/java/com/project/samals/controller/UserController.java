package com.project.samals.controller;

import com.project.samals.dto.UserDto;
import com.project.samals.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Api(tags={"사용자 API"})
public class UserController {

    private final UserService userService;


    @ApiOperation(value = "사용자 등록")
    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.signup(userDto), HttpStatus.CREATED);
    }

    @ApiOperation(value = "사용자 조회")
    @GetMapping("/{address}")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String address) {
        return new ResponseEntity<>(userService.getUserInfo(address), HttpStatus.OK);
    }
//
//    @DeleteMapping("/{address}")
//    public ResponseEntity<UserDto> withdrawal(@PathVariable String address) {
//        return userService.withdrawal(address);
//    }
//
//    @PutMapping
//    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
//        return userService.updateUser(userDto);
//    }

}