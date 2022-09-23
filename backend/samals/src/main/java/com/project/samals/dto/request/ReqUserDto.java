package com.project.samals.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqUserDto {

    private String walletAddress;
    private String userNickname;
    private String userBio;
    private String userImgUrl;

    public User toEntity(){
        return User.builder()
                .walletAddress(walletAddress)
                .userNickname(userNickname)
                .userBio(userBio)
                .userImgUrl(userImgUrl)
                .build();
    }

}
