package com.project.samals.repository;

import com.project.samals.domain.Ipfs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IpfsRepository extends JpaRepository<Ipfs, Long> {
    //전체 IPFS 조회
    List<Ipfs> findAllBy();

    //사용하지 않은 다음 IPFS 조회
    Ipfs findTopByIpfsIsUsedIsOrderByIpfsSeq(String is);

    Ipfs findByIpfsSeq(int ipfsSeq);

    Ipfs findByIpfsTokenId(int tokenId);

    List<Ipfs> findAllByIpfsIsUsedAndIpfsType(char isUsed, String ipfsType);
    //다음 IPFS 조회 및 사용
}
