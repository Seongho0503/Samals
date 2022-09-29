package com.project.samals.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqUserUpdateDto {

    private String walletAddress;
    private String userNickname;
    private String userBio;
    private int tokenId;

}
