package com.project.samals.dto.request;

import com.project.samals.domain.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSignupDto {

    private String walletAddress;

    public User toEntity(){
        return User.builder()
                .walletAddress(walletAddress)
                .updatedTime(new Date())
                .createdTime(new Date())
                .build();
    }
}
