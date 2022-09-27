package com.project.samals.service;

import com.project.samals.domain.Ipfs;
import com.project.samals.domain.ProfileImg;
import com.project.samals.domain.User;
import com.project.samals.dto.UserDto;
import com.project.samals.dto.request.ReqProfileDto;
import com.project.samals.dto.request.ReqUserDto;
import com.project.samals.repository.IpfsRepository;
import com.project.samals.repository.ProfileImgRepository;
import com.project.samals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final IpfsRepository ipfsRepository;
    private final ProfileImgRepository profileImgRepository;

    public UserDto signup(ReqUserDto userDto) {
        User user =userDto.toEntity();
        user.setCreatedTime(new Date());
        user.setUpdatedTime(new Date());

        userRepository.save(user);

        if(user.getUserNickname()==null)
            user.setUserNickname("random@"+user.getUserSeq());

        User saved=userRepository.save(user);
        return UserDto.convert(saved);
    }

    public UserDto getUserInfo(String address){
        User user = userRepository.findByWalletAddress(address);
        UserDto userDto = UserDto.convert(user);
        return userDto;
    }

    public String withdrawal(String address){
        User user = userRepository.findByWalletAddress(address);
        if(user == null)
            return "no user";
        userRepository.delete(user);
        return "delete Success";
    }

    public UserDto updateUser(ReqUserDto userDto) {
        User user = userRepository.findByWalletAddress(userDto.getWalletAddress());
        user.setUserBio(userDto.getUserBio());
        user.setUserNickname(userDto.getUserNickname());
        user.setUpdatedTime(new Date());

        User saved=userRepository.save(user);
        return UserDto.convert(saved);
    }

    public String setProfile(ReqProfileDto profileDto) {
        User user = userRepository.findByWalletAddress(profileDto.getAddress());
        Ipfs ipfs = ipfsRepository.findByIpfsSeq(profileDto.getIpfsSeq());
        if(profileImgRepository.findByIpfs(ipfs)!=null)
            return "fail";

        ProfileImg profile = profileImgRepository.findByUser(user);
        if(profile ==null){
            profile=ProfileImg.builder().ipfs(ipfs).user(user).animalSpecies(ipfs.getAnimal().getAnimalSpecies()).build();
        }else {
            profile.setIpfs(ipfs);
            profile.setAnimalSpecies(ipfs.getAnimal().getAnimalSpecies());
        }
        profileImgRepository.save(profile);
        return ipfs.getIpfsUri();
    }

    public String deleteProfile(String address) {
        User user = userRepository.findByWalletAddress(address);
        profileImgRepository.deleteByUser(user);
        return "Success";
    }

}
