package com.project.samals.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//빌드 패턴 사용 가능
@Builder
//모든 필드값을 파라미터로 받는 생성자 자동 생성
@AllArgsConstructor
//파라미터가 없는 기본 생성자 자동 생성
@NoArgsConstructor
//엔티티 선언
@Entity
//게터, 세터 자동 생성
@Getter @Setter
//투스트링 자동 생성
@ToString
@Table(name="tb_animal")
public class Animal {

    //기본키임을 표시
    @Id
    //자동 생성 전략
    //IDENTITY : 기본키 생성을 데이터베이스에 위임, id값이 null이면 DB가 알아서 AI 처리
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_species", nullable = false, length = 50)
    private String animalSpecies;

    @Column(name = "animal_class", nullable = false, length = 100)
    private String animalClass;

    @Column(name ="animal_description", length = 500)
    private String animalDescription;

    @Column(name = "animal_total", nullable = false)
    private int animalTotal;

    @Column(name = "animal_current",nullable = true)
    private int animalCurrent;

//    @OneToMany(mappedBy = "animal")
//    @JoinColumn
//    private List<Ipfs> ipfsList = new ArrayList<>();
}
