package com.project.samals.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

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

}