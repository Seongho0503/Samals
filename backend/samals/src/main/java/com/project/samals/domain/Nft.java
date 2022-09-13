package com.project.samals.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="nft_created_at")
    private Date createdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_seq")
    private User user;
}