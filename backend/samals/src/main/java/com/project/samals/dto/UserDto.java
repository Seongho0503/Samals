package com.project.samals.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Sale;
import com.project.samals.domain.User;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private Long userSeq;
    private String walletAddress;
    private String userNickname;
    private String userBio;
    private String userImgUrl;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date createdTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date updatedTime;

    public User toEntity(){
        return User.builder()
                .userSeq(userSeq)
                .walletAddress(walletAddress)
                .userNickname(userNickname)
                .userBio(userBio)
                .userImgUrl(userImgUrl)
                .build();
    }

    public static UserDto convert(User user) {
        if(user == null) return null;

        return UserDto.builder()
                .userSeq(user.getUserSeq())
                .walletAddress(user.getWalletAddress())
                .userNickname(user.getUserNickname())
                .userBio(user.getUserBio())
                .userImgUrl(user.getUserImgUrl())
                .createdTime(user.getCreatedTime())
                .updatedTime(user.getUpdatedTime())
                .build();
    }

}
