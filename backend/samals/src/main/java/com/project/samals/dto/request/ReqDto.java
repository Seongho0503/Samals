package com.project.samals.dto.request;

import com.project.samals.domain.Nft;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqDto {

    private int tokenId;

    private String walletAddress;

    public Nft toEntity(){
        return Nft.builder()
                .tokenId(tokenId)
                .build();
    }


}
