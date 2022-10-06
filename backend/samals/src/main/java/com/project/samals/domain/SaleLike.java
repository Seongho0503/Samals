package com.project.samals.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Builder @AllArgsConstructor @NoArgsConstructor
@Entity
@Getter @Setter
@ToString
@Table(name="tb_sale_like")
public class SaleLike {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_like_seq")
    private Long saleLikeSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sale_seq")
    private Sale sale;


}