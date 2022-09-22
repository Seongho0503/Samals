package com.project.samals.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Table(name="tb_nft")
public class Animal {

    @Id
    private String animal_species;
    private String animal_class;
    private String animal_description;
    private int animal_total;
    private int animal_current;
}
