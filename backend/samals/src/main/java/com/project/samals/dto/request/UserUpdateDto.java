package com.project.samals.dto.request;

import com.project.samals.domain.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateDto {

    private String walletAddress;
    private String userNickname;
    private String userBio;
    private int tokenId;

}
