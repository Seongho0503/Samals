package com.project.samals.dto.request;

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

    private String nftType;

    private int ipfs_seq;

    private int nftPrice;

    public Nft toEntity(){
        return Nft.builder()
                .tokenId(tokenId)
                .nftType(nftType)
                .nftPrice(nftPrice)
                .build();
    }


}
