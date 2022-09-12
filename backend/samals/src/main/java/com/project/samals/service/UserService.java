package com.project.samals.service;

import com.project.samals.domain.Sale;
import com.project.samals.domain.User;
import com.project.samals.dto.SaleDto;
import com.project.samals.dto.UserDto;
import com.project.samals.repository.SaleRepository;
import com.project.samals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    //거래 등록
    @Transactional
    public UserDto signup(UserDto userDto) {
        User user =userDto.toEntity();
        user.setCreatedTime(new Date());
        user.setUpdatedTime(new Date());

        User saved=userRepository.save(user);
        return UserDto.convert(saved);
    }

    public UserDto getUserInfo(String address){
        User user = userRepository.findByWalletAddress(address);
        UserDto userDto = UserDto.convert(user);
        return userDto;
    }

}
