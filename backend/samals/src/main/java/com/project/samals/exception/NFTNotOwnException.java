package com.project.samals.exception;

public class NFTNotOwnException extends RuntimeException {
    public NFTNotOwnException(String msg){
        super(msg);
    }
}
