package com.project.samals.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder @AllArgsConstructor @NoArgsConstructor
@Entity
@Getter @Setter
@ToString
@Table(name="tb_user")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "wallet_address")
    private String walletAddress;

    @Column(name = "user_nickname")
    private String userNickname;


    @Column(name = "user_bio")
    private String userBio;

    @Column(name = "user_img_url")
    private String userImgUrl;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="user_created_at")
    private Date createdTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="user_updated_at")
    private Date updatedTime;

    // NFT List
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Nft> nftList = new ArrayList<>();

    // NFT 등록
    public void addNft(Nft nft) {
        this.nftList.add(nft);
        nft.setUser(this);
    }

    // NFT 등록 해제
    public void removeNft(int tokenId) {
        this.nftList.removeIf(nft ->
                nft.getTokenId()==tokenId);
    }

    // Sale 거래 내역
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Sale> saleHistory = new ArrayList<>();

    // 거래 내역 추가
    public void addSaleHistory(Sale sale) {
        this.saleHistory.add(sale);
        sale.setUser(this);
    }

}