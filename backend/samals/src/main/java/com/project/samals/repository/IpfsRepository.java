package com.project.samals.repository;

import com.project.samals.domain.Ipfs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IpfsRepository extends JpaRepository<Ipfs, Long> {
    //전체 IPFS 조회
    List<Ipfs> findAllBy();
    //다음 IPFS 조회
    Ipfs findTopByIpfsIsUsedIsOrderByIpfsSeq(String is);
    //다음 IPFS 조회 및 사용
}
