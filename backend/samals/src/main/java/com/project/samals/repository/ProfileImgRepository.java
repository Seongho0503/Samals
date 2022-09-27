package com.project.samals.repository;

import com.project.samals.domain.Ipfs;
import com.project.samals.domain.ProfileImg;
import com.project.samals.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileImgRepository extends JpaRepository<ProfileImg, Long> {

    ProfileImg findByUser(User user);

    ProfileImg findByIpfs(Ipfs ipfs);

    void deleteByUser(User user);

    List<ProfileImg> findAllByAnimalSpecies(String animalSpecies);
}
