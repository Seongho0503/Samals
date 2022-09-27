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
@Table(name="tb_nft")
public class Nft {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nft_seq")
    private Long nftSeq;

    @Column(name = "nft_token_id")
    private int tokenId;

    @Column(name = "nft_owner")
    private String nftOwner;

    @Column(name = "nft_type")
    private String nftType;

    @Column(name = "nft_mint_no")
    private int nftMintNumber;

    @Column(name = "nft_price")
    private int nftPrice;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="nft_created_at")
    private Date createdTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="nft_updated_at")
    private Date updatedTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_seq")
    private User user;

    @OneToOne
    @JoinColumn(name="ipfs_seq")
    private Ipfs ipfs;

    @OneToMany(mappedBy = "nft", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Sale> nftSaleList = new ArrayList<>();

    public void addNftSaleList(Sale sale) {
        this.nftSaleList.add(sale);
        sale.setNft(this);
    }

}