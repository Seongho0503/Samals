package com.project.samals.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Nft;
import com.project.samals.domain.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqNftDto {

    private int tokenId;

    private String walletAddress;

    public Nft toEntity(){
        return Nft.builder()
                .tokenId(tokenId)
                .build();
    }


}
