package com.project.samals.dto.request;

import com.project.samals.domain.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqUserDto {

    private String walletAddress;
    private String userNickname;
    private String userBio;

    public User toEntity(){
        return User.builder()
                .walletAddress(walletAddress)
                .userNickname(userNickname)
                .userBio(userBio)
                .build();
    }
}
