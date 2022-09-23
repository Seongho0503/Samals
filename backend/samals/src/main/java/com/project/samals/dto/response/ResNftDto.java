package com.project.samals.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.samals.domain.Nft;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResNftDto {

    private Long nftSeq;
    private int tokenId;

    private String nftType;

    private int nftMintNumber;

    private int nftPrice;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date createdTime;

    private String walletAddress;

    public Nft toEntity(){
        return Nft.builder()
                .nftSeq(nftSeq)
                .tokenId(tokenId)
                .nftType(nftType)
                .nftMintNumber(nftMintNumber)
                .nftPrice(nftPrice)
                .build();
    }

    public static ResNftDto convert(Nft nft) {
        if(nft == null) return null;

        return ResNftDto.builder()
                .nftSeq(nft.getNftSeq())
                .tokenId(nft.getTokenId())
                .nftType(nft.getNftType())
                .nftMintNumber(nft.getNftMintNumber())
                .nftPrice(nft.getNftPrice())
                .createdTime(nft.getCreatedTime())
                .walletAddress(nft.getUser().getWalletAddress())
                .build();
    }

}
