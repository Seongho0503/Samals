package com.project.samals.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Ipfs;
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

    private int ipfsSeq;

    private int nftPrice;

    public Nft toEntity(Ipfs ipfs){
        return Nft.builder()
                .tokenId(tokenId)
                .nftType(nftType)
                .nftPrice(nftPrice)
                .createdTime(new Date())
                .updatedTime(new Date())
                .nftOwner(walletAddress)
                .ipfs(ipfs)
                .nftMintNumber(ipfs.getAnimal().getAnimalCurrent())
                .build();
    }


}
