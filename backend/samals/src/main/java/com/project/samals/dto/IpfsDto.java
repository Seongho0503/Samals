package com.project.samals.dto;

import com.project.samals.domain.Animal;
import com.project.samals.domain.Ipfs;
import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class IpfsDto {

    private static final Logger log = LoggerFactory.getLogger(IpfsDto.class);
    private int ipfs_seq;
    private Animal animal;
    private String ipfs_uri;
    private String ipfs_is_used;
    private int ipfs_token_id;

    public Ipfs toEntity(){
        return Ipfs.builder()
                .animal(animal)
                .ipfsUri(ipfs_uri)
                .build();
    }

    public IpfsDto convert(Ipfs ipfs){
        if(ipfs == null){
            log.info("this is null => {}", (Object) null);
            return null;
        }

        return IpfsDto.builder()
                .ipfs_seq(ipfs.getIpfsSeq())
                .animal(ipfs.getAnimal())
                .ipfs_uri(ipfs.getIpfsUri())
                .ipfs_is_used(ipfs.getIpfsIsUsed())
                .ipfs_token_id(ipfs.getIpfsTokenId())
                .build();
    }
}
