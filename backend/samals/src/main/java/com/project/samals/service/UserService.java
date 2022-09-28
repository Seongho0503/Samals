package com.project.samals.service;

import com.project.samals.domain.Ipfs;
import com.project.samals.domain.ProfileImg;
import com.project.samals.domain.User;
import com.project.samals.dto.UserDto;
import com.project.samals.dto.request.ReqProfileDto;
import com.project.samals.dto.request.UserSignupDto;
import com.project.samals.dto.request.UserUpdateDto;
import com.project.samals.dto.response.ResProfileCountDto;
import com.project.samals.repository.IpfsRepository;
import com.project.samals.repository.ProfileImgRepository;
import com.project.samals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final IpfsRepository ipfsRepository;
    private final ProfileImgRepository profileImgRepository;

    public UserDto signup(UserSignupDto userDto) {
        if(userRepository.findByWalletAddress(userDto.getWalletAddress())!=null)
            return null;

        User user =userDto.toEntity();
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

    public UserDto updateUser(UserUpdateDto userDto) {
        setProfile(new ReqProfileDto(userDto.getWalletAddress(), userDto.getTokenId()));
        User user = userRepository.findByWalletAddress(userDto.getWalletAddress());
        user.setUserBio(userDto.getUserBio());
        user.setUserNickname(userDto.getUserNickname());
        user.setUpdatedTime(new Date());
        return UserDto.convert(userRepository.save(user));
    }

    public String setProfile(ReqProfileDto profileDto) {
        User user = userRepository.findByWalletAddress(profileDto.getAddress());
        Ipfs ipfs = ipfsRepository.findByIpfsTokenId(profileDto.getTokenId());
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

    public List<ResProfileCountDto> getProfileCount(){
        String[] animals = {"bird","elephant","shark","tiger","frog","iguana","leopard","penguin","rhino"};
        List<ResProfileCountDto> profileCounts=new ArrayList<>();
        for(String animal : animals){
            List<ProfileImg> profileUse = profileImgRepository.findAllByAnimalSpecies(animal);
            profileCounts.add(new ResProfileCountDto(animal,profileUse.size()));
        }
        return profileCounts;
    }

}
