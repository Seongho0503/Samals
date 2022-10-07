package com.project.samals.exception;

public class IpfsAlreadyUseException extends RuntimeException {
    public IpfsAlreadyUseException(String msg){
        super(msg);
    }
}
