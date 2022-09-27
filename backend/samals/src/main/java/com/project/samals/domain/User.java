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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="user_created_at")
    private Date createdTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="user_updated_at")
    private Date updatedTime;

    @OneToOne(mappedBy = "user")
    private ProfileImg profileImg;

    // Minted NFT List
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Nft> mintList = new ArrayList<>();

    // Minted NFT Method
    public void addMintedNft(Nft nft) {
        this.mintList.add(nft);
        nft.setUser(this);
    }

    // Sale Like
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Builder.Default
    private List<SaleLike> saleLikes = new ArrayList<>();

    // Sale Like Method
    public void addSaleLike(SaleLike saleLike) {
        this.saleLikes.add(saleLike);
        saleLike.setUser(this);
    }
    public void removeSaleLike(int saleLikeSeq) {
        saleLikes.removeIf(saleLike ->
                saleLike.getSaleLikeSeq()==saleLikeSeq);
    }







//    // NFT 등록 해제
//    public void removeNft(int tokenId) {
//        this.nftList.removeIf(nft ->
//                nft.getTokenId()==tokenId);
//    }

//    // Sale 거래 내역
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @Builder.Default
//    private List<Sale> saleHistory = new ArrayList<>();
//
//    // 거래 내역 추가
//    public void addSaleHistory(Sale sale) {
//        this.saleHistory.add(sale);
//        sale.setUser(this);
//    }
//
//    public void deleteSaleHistory(long saleSeq) {
//        this.saleHistory.removeIf(sale ->
//                sale.getSaleSeq()==saleSeq);
//    }

}