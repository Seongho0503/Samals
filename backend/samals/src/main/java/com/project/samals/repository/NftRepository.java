package com.project.samals.repository;

import com.project.samals.domain.Nft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NftRepository extends JpaRepository<Nft, Long> {

    Nft findByTokenId(int tokenId);
    void deleteByNftSeq(Long nftSeq);

    List<Nft> findAllByNftOwner(String address);
}
