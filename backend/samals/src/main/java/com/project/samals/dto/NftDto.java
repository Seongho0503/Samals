package com.project.samals.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Nft;
import com.project.samals.domain.User;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NftDto {
    private Long nftSeq;
    private int tokenId;
    private String nftOwner;
    private String nftType;
    private int nftMintNumber;
    private int nftPrice;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date createdTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date updatedTime;

    private String walletAddress;


    public Nft toEntity(){
        return Nft.builder()
                .nftSeq(nftSeq)
                .tokenId(tokenId)
                .nftOwner(nftOwner)
                .nftType(nftType)
                .nftMintNumber(nftMintNumber)
                .nftPrice(nftPrice)
                .build();
    }

    public static NftDto convert(Nft nft) {
        if(nft == null) return null;

        return NftDto.builder()
                .nftSeq(nft.getNftSeq())
                .tokenId(nft.getTokenId())
                .nftOwner(nft.getNftOwner())
                .nftType(nft.getNftType())
                .nftMintNumber(nft.getNftMintNumber())
                .nftPrice(nft.getNftPrice())
                .createdTime(nft.getCreatedTime())
                .updatedTime(nft.getUpdatedTime())
                .walletAddress(nft.getUser().getWalletAddress())
                .build();
    }
}
