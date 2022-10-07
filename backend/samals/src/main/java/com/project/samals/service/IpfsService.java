package com.project.samals.service;

import com.project.samals.domain.Animal;
import com.project.samals.domain.Ipfs;
import com.project.samals.dto.IpfsDto;
import com.project.samals.exception.AnimalNotFoundException;
import com.project.samals.exception.IpfsNotFoundException;
import com.project.samals.repository.AnimalRepository;
import com.project.samals.repository.IpfsRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class IpfsService {
    private final IpfsRepository ipfsRepository;
    private final AnimalRepository animalRepository;
    private static final Logger log = LoggerFactory.getLogger(IpfsService.class);

    public List<String> getNftImgList(){
        List<String> imgList=new ArrayList<>();
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/bird%20(55).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/frog%20(55).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/tiger%20(55).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/leopard%20(55).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/iguana%20(55).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/elephant%20(55).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/frog%20(55).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/rhino%20(55).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/penguin%20(55).png");

        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/bird%20(15).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/frog%20(15).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/tiger%20(15).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/leopard%20(15).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/iguana%20(15).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/elephant%20(15).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/frog%20(15).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/rhino%20(15).png");
        imgList.add("https://j7d103.p.ssafy.io/image/downloadFile/penguin%20(15).png");

        return imgList;
    }
    public IpfsDto getRandom(String ipfsType){
        if(!ipfsType.equals("donate")&&!ipfsType.equals("market"))
            return null;
        List<Ipfs> ipfsList = ipfsRepository.findAllByIpfsIsUsedAndIpfsType('N',ipfsType);
        int num = (int)(Math.random()*(ipfsList.size()));
        if(ipfsType.equals("market"))
           return new IpfsDto().convert(ipfsList.get(num));
        else
            return new IpfsDto().convert(ipfsList.get(num));
    }

    public IpfsDto getRandomAnimal(String animalSpecies){
        Animal animal = new Animal();
        animal.setAnimalSpecies(animalSpecies);
        List<Ipfs> ipfsList = ipfsRepository.findAllByIpfsIsUsedAndIpfsTypeAndAnimal('N',"market", animal);
        int num = (int)(Math.random()*(ipfsList.size()));
            return new IpfsDto().convert(ipfsList.get(num));
    }

    public String add(String animalSpecies){
        for(int i=1;i<101;i++){
            Ipfs ipfs = Ipfs.builder()
                    .ipfsUri("https://j7d103.p.ssafy.io/image/downloadFile/"+animalSpecies+"%20("+i+").png")
                    .ipfsType("donate")
                    .ipfsIsUsed('N')
                    .animal(animalRepository.findByAnimalSpecies(animalSpecies).orElseThrow())
                    .build();
            ipfsRepository.save(ipfs);
        }
        return "Success";
    }

    //ipfs 추가
    public Map<String,Object> addIpfs(Map<String, Object> request){
        Map<String,Object> result = new HashMap<>();

        //필수 두 값중 하나가 null일 때
        if(((String)request.get("ipfs_uri")).equals(null) || ((String)request.get("animal_species")).equals(null)){
            result.put("status",false);
            result.put("detail","null value is not possible");
            return result;
        }
        else if(((String)request.get("ipfs_uri")).length() != 46){
            result.put("status",false);
            result.put("detail","ipfs_uri's size is not right");
            return result;
        }
        //동물 검색
        Animal animal = animalRepository.findByAnimalSpecies((String)request.get("animal_species"))
                .orElseThrow(null);

        //해당 동물이 없으면 리턴
        if(animal == null){
            result.put("status",false);
            result.put("detail","no animal data in [tb_animal]");
            return result;
        }
//        animal.setAnimalSpecies((String)request.get("animal_species"));

        IpfsDto ipfsDto = new IpfsDto();
        ipfsDto.setIpfs_uri((String)request.get("ipfs_uri"));
        ipfsDto.setAnimal(animal);

        Ipfs ipfs = ipfsDto.toEntity();
        try{
            ipfsRepository.save(ipfs);
            result.put("status",true);
            result.put("detail",ipfs);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status",false);
            result.put("detail","duplicate ipfs_uri error");
        }
       finally {
            return result;
        }
    }
    public IpfsDto peekIpfs(){
        Ipfs ipfs = ipfsRepository.findTopByIpfsIsUsedIsOrderByIpfsSeq("N");
        log.info("ipfs -> {}", ipfs);
        IpfsDto ipfsDto = new IpfsDto().convert(ipfs);
        log.info("ipfsDto -> {}", ipfsDto);
        return ipfsDto;
    }

    public IpfsDto pollIpfs(){
        Ipfs ipfs = ipfsRepository.findTopByIpfsIsUsedIsOrderByIpfsSeq("N");
        ipfs.setIpfsIsUsed('Y');
        log.info("ipfs -> {}", ipfs);
        IpfsDto ipfsDto = new IpfsDto().convert(ipfs);
        log.info("ipfsDto -> {}", ipfsDto);
        return ipfsDto;
    }

    public IpfsDto pollOneIpfs(int ipfsSeq){
        Ipfs ipfs = ipfsRepository.findByIpfsSeq(ipfsSeq)
                .orElseThrow(() -> new IpfsNotFoundException("해당 IPFS 데이터를 찾을 수 없습니다."));
        ipfs.setIpfsIsUsed('Y');
        IpfsDto ipfsDto = new IpfsDto().convert(ipfs);
        log.info("ipfsDto -> {}", ipfsDto);
        return ipfsDto;
    }
}
