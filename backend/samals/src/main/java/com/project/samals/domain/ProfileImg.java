package com.project.samals.domain;

import lombok.*;

import javax.persistence.*;

@Builder @AllArgsConstructor @NoArgsConstructor
@Entity
@Getter @Setter
@ToString
@Table(name="tb_profile_img")
public class ProfileImg {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_img_seq")
    private Long profileImgSeq;

    @Column(name = "animal_species")
    private String animalSpecies;

    @OneToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @OneToOne
    @JoinColumn(name = "ipfs_seq")
    private Ipfs ipfs;

}