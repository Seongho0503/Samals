package com.project.samals.service;

import com.project.samals.domain.Ipfs;
import com.project.samals.domain.Nft;
import com.project.samals.domain.ProfileImg;
import com.project.samals.domain.User;
import com.project.samals.dto.UserDto;
import com.project.samals.dto.request.ReqProfileDto;
import com.project.samals.dto.request.ReqUserSignupDto;
import com.project.samals.dto.request.ReqUserUpdateDto;
import com.project.samals.dto.response.ResProfileCountDto;
import com.project.samals.exception.*;
import com.project.samals.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final IpfsRepository ipfsRepository;
    private final SaleRepository saleRepository;
    private final NftRepository nftRepository;
    private final ProfileImgRepository profileImgRepository;

    @Transactional
    public UserDto signup(ReqUserSignupDto userDto){
        if(userRepository.findByWalletAddress(userDto.getWalletAddress())!=null){
            throw new UserDuplicateException(String.format("%s은 이미 등록된 지갑입니다.", userDto.getWalletAddress()));
        }
        User user =userDto.toEntity();
        userRepository.save(user);
        if(user.getUserNickname()==null)
            user.setUserNickname("random@"+user.getUserSeq());
        User saved=userRepository.save(user);
        return UserDto.convert(saved);
    }

    public UserDto getUserInfo(String address){
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        UserDto userDto = UserDto.convert(user);
        return userDto;
    }

    public String withdrawal(String address){
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("삭제할 사용자를 찾을 수 없습니다"));
        userRepository.delete(user);
        return "Success";
    }

    public UserDto updateUser(ReqUserUpdateDto userDto) {
        setProfile(new ReqProfileDto(userDto.getWalletAddress(), userDto.getTokenId()));

        User user = userRepository.findByWalletAddress(userDto.getWalletAddress())
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));

        user.setUserBio(userDto.getUserBio());
        user.setUserNickname(userDto.getUserNickname());
        user.setUpdatedTime(new Date());
        return UserDto.convert(userRepository.save(user));
    }

    public String setProfile(ReqProfileDto profileDto) {
        User user = userRepository.findByWalletAddress(profileDto.getAddress())
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
        Ipfs ipfs = ipfsRepository.findByIpfsTokenId(profileDto.getTokenId())
                .orElseThrow(() -> new IpfsNotFoundException("해당 토큰의 IPFS 데이터를 찾을 수 없습니다."));
        Nft nft = nftRepository.findByTokenId(profileDto.getTokenId())
                .orElseThrow(() -> new NFTNotFoundException("등록되지 않은 Token입니다."));

        if(saleRepository.findByNftAndSellerAddress(nft,user.getWalletAddress())!=null)
            throw new OnSaleException(String.format("토큰 %d은 판매중인 NFT입니다.", nft.getTokenId()));

        if(profileImgRepository.findByIpfs(ipfs)!=null)
            throw new ProfileImgAlreadyUseException("다른 사용자가 사용하고 있는 이미지입니다.");

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
        User user = userRepository.findByWalletAddress(address)
                .orElseThrow(() -> new UserNotFoundException("해당 지갑의 사용자를 찾을 수 없습니다"));
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
